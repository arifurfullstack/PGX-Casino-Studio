import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { connectToDatabase } from "@/lib/mongodb";
import { CasinoDesignModel } from "@/models";
import { DEFAULT_CASINO_DESIGNS } from "@/config/default-designs";
import { CasinoDesign, DesignStatus, DesignPreviewImage } from "@/types";

const LOCAL_STORE_DIR = path.resolve(process.cwd(), ".local-data");
const LOCAL_DESIGNS_FILE = path.join(LOCAL_STORE_DIR, "designs.json");

function hasMongoUri(): boolean {
  return Boolean(process.env.MONGODB_URI && process.env.MONGODB_URI.trim());
}

async function readLocalDesigns(): Promise<CasinoDesign[]> {
  try {
    const raw = await readFile(LOCAL_DESIGNS_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch {
    // Initialize from defaults on first local read
  }
  return [...DEFAULT_CASINO_DESIGNS];
}

async function writeLocalDesigns(designs: CasinoDesign[]): Promise<void> {
  await mkdir(LOCAL_STORE_DIR, { recursive: true });
  await writeFile(LOCAL_DESIGNS_FILE, JSON.stringify(designs, null, 2), "utf-8");
}

/**
 * Fetches all active casino designs for the storefront.
 * Uses MongoDB when MONGODB_URI is configured; falls back to local JSON store in local dev.
 */
export async function getAllActiveDesigns(): Promise<CasinoDesign[]> {
  if (hasMongoUri()) {
    try {
      await connectToDatabase();
      const docs = await CasinoDesignModel.find({ status: "active" })
        .sort({ order: 1 })
        .lean();

      if (docs && docs.length > 0) {
        return docs.map((doc) => ({
          id: (doc._id as unknown as string)?.toString() || doc.slug,
          slug: doc.slug,
          name: doc.name,
          subtitle: doc.subtitle,
          image: doc.image,
          previewImages: doc.previewImages,
          tags: doc.tags,
          status: doc.status,
          order: doc.order,
          createdAt: doc.createdAt?.toISOString(),
          updatedAt: doc.updatedAt?.toISOString(),
        }));
      }
    } catch (error) {
      console.warn("MongoDB fetch designs error (using fallback defaults):", error);
    }
  }

  const local = await readLocalDesigns();
  return local
    .filter((d) => d.status === "active")
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/**
 * Fetches all designs for admin (including hidden & unavailable).
 * Automatically seeds default designs into MongoDB if the collection is empty.
 */
export async function getAllDesignsAdmin(): Promise<CasinoDesign[]> {
  if (hasMongoUri()) {
    try {
      await connectToDatabase();
      let docs = await CasinoDesignModel.find().sort({ order: 1 }).lean();

      if (!docs || docs.length === 0) {
        await seedDefaultDesigns();
        docs = await CasinoDesignModel.find().sort({ order: 1 }).lean();
      }

      if (docs && docs.length > 0) {
        return docs.map((doc) => ({
          id: (doc._id as unknown as string)?.toString() || doc.slug,
          slug: doc.slug,
          name: doc.name,
          subtitle: doc.subtitle,
          image: doc.image,
          previewImages: doc.previewImages || [],
          tags: doc.tags || [],
          status: doc.status,
          order: doc.order,
          createdAt: doc.createdAt?.toISOString(),
          updatedAt: doc.updatedAt?.toISOString(),
        }));
      }
    } catch (error) {
      console.warn("Admin fetch designs error:", error);
    }
  }

  const local = await readLocalDesigns();
  return [...local].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/**
 * Fetches a single casino design by slug.
 */
export async function getDesignBySlug(slug: string): Promise<CasinoDesign | null> {
  if (hasMongoUri()) {
    try {
      await connectToDatabase();
      const doc = await CasinoDesignModel.findOne({ slug }).lean();

      if (doc) {
        return {
          id: (doc._id as unknown as string)?.toString() || doc.slug,
          slug: doc.slug,
          name: doc.name,
          subtitle: doc.subtitle,
          image: doc.image,
          previewImages: doc.previewImages || [],
          tags: doc.tags || [],
          status: doc.status,
          order: doc.order,
          createdAt: doc.createdAt?.toISOString(),
          updatedAt: doc.updatedAt?.toISOString(),
        };
      }
    } catch (error) {
      console.warn(`MongoDB get design error for ${slug}:`, error);
    }
  }

  const local = await readLocalDesigns();
  return local.find((d) => d.slug === slug) || null;
}

/**
 * Seeds the default casino designs into MongoDB.
 */
export async function seedDefaultDesigns(): Promise<void> {
  await connectToDatabase();
  const count = await CasinoDesignModel.countDocuments();
  if (count === 0) {
    for (const design of DEFAULT_CASINO_DESIGNS) {
      await CasinoDesignModel.create({
        slug: design.slug,
        name: design.name,
        subtitle: design.subtitle,
        image: design.image,
        previewImages: design.previewImages || [],
        tags: design.tags || [],
        status: design.status,
        order: design.order,
      });
    }
  }
}

/**
 * Creates a new casino design.
 */
export async function createCasinoDesign(data: {
  slug: string;
  name: string;
  subtitle?: string;
  image: string;
  previewImages?: DesignPreviewImage[];
  tags?: string[];
  status?: DesignStatus;
  order?: number;
}): Promise<CasinoDesign> {
  if (!hasMongoUri()) {
    const local = await readLocalDesigns();
    if (local.some((d) => d.slug === data.slug)) {
      throw new Error(`A design with slug "${data.slug}" already exists.`);
    }
    const created: CasinoDesign = {
      id: data.slug,
      slug: data.slug,
      name: data.name,
      subtitle: data.subtitle,
      image: data.image,
      previewImages: data.previewImages || [],
      tags: data.tags || [],
      status: data.status || "active",
      order: data.order ?? 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    local.push(created);
    await writeLocalDesigns(local);
    return created;
  }

  await connectToDatabase();
  const doc = await CasinoDesignModel.create({
    slug: data.slug,
    name: data.name,
    subtitle: data.subtitle,
    image: data.image,
    previewImages: data.previewImages || [],
    tags: data.tags || [],
    status: data.status || "active",
    order: data.order ?? 0,
  });

  return {
    id: doc._id.toString(),
    slug: doc.slug,
    name: doc.name,
    subtitle: doc.subtitle,
    image: doc.image,
    previewImages: doc.previewImages || [],
    tags: doc.tags || [],
    status: doc.status,
    order: doc.order,
  };
}

/**
 * Updates an existing casino design (with upsert support for newly added defaults).
 */
export async function updateCasinoDesign(
  slug: string,
  data: Partial<CasinoDesign>
): Promise<boolean> {
  if (!hasMongoUri()) {
    const local = await readLocalDesigns();
    const idx = local.findIndex((d) => d.slug === slug);
    if (idx === -1) {
      local.push({
        id: slug,
        slug,
        name: data.name || slug,
        subtitle: data.subtitle,
        image: data.image || "/images/card-royal-prestige-art.png",
        previewImages: data.previewImages || [],
        tags: data.tags || [],
        status: data.status || "active",
        order: data.order ?? 0,
        updatedAt: new Date().toISOString(),
      });
    } else {
      local[idx] = {
        ...local[idx],
        ...data,
        slug,
        updatedAt: new Date().toISOString(),
      };
    }
    await writeLocalDesigns(local);
    return true;
  }

  await connectToDatabase();
  const res = await CasinoDesignModel.updateOne(
    { slug },
    { $set: { ...data, slug } },
    { upsert: true }
  );
  return res.modifiedCount > 0 || res.upsertedCount > 0 || res.matchedCount > 0;
}

/**
 * Deletes a casino design.
 */
export async function deleteCasinoDesign(slug: string): Promise<boolean> {
  if (!hasMongoUri()) {
    const local = await readLocalDesigns();
    const next = local.filter((d) => d.slug !== slug);
    await writeLocalDesigns(next);
    return next.length < local.length;
  }

  await connectToDatabase();
  const res = await CasinoDesignModel.deleteOne({ slug });
  return res.deletedCount > 0;
}
