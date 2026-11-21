import { connectToDatabase } from "@/lib/mongodb";
import { CasinoDesignModel } from "@/models";
import { DEFAULT_CASINO_DESIGNS } from "@/config/default-designs";
import { CasinoDesign, DesignStatus, DesignPreviewImage } from "@/types";

/**
 * Fetches all active casino designs for the storefront.
 * Gracefully falls back to default designs if DB is empty or disconnected.
 */
export async function getAllActiveDesigns(): Promise<CasinoDesign[]> {
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

  return DEFAULT_CASINO_DESIGNS;
}

/**
 * Fetches all designs for admin (including hidden & unavailable).
 * Automatically seeds default designs into MongoDB if the collection is empty.
 */
export async function getAllDesignsAdmin(): Promise<CasinoDesign[]> {
  try {
    await connectToDatabase();
    let docs = await CasinoDesignModel.find().sort({ order: 1 }).lean();

    // Auto-seed default designs if DB is empty
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

  return DEFAULT_CASINO_DESIGNS;
}

/**
 * Fetches a single casino design by slug.
 */
export async function getDesignBySlug(slug: string): Promise<CasinoDesign | null> {
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

  const found = DEFAULT_CASINO_DESIGNS.find((d) => d.slug === slug);
  return found || null;
}

/**
 * Seeds the 12 default casino designs into MongoDB.
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
 * Updates an existing casino design.
 */
export async function updateCasinoDesign(
  slug: string,
  data: Partial<CasinoDesign>
): Promise<boolean> {
  await connectToDatabase();
  const res = await CasinoDesignModel.updateOne({ slug }, { $set: data });
  return res.modifiedCount > 0;
}

/**
 * Deletes a casino design.
 */
export async function deleteCasinoDesign(slug: string): Promise<boolean> {
  await connectToDatabase();
  const res = await CasinoDesignModel.deleteOne({ slug });
  return res.deletedCount > 0;
}
