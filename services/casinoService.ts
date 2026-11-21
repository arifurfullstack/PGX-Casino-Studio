import { connectToDatabase } from "@/lib/mongodb";
import { CasinoDesignModel } from "@/models";
import { DEFAULT_CASINO_DESIGNS } from "@/config/default-designs";
import { CasinoDesign } from "@/types";

/**
 * Fetches all active casino designs.
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

  // Graceful fallback to default designs
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
        previewImages: doc.previewImages,
        tags: doc.tags,
        status: doc.status,
        order: doc.order,
        createdAt: doc.createdAt?.toISOString(),
        updatedAt: doc.updatedAt?.toISOString(),
      };
    }
  } catch (error) {
    console.warn(`MongoDB get design error for ${slug}:`, error);
  }

  // Check fallback
  const found = DEFAULT_CASINO_DESIGNS.find((d) => d.slug === slug);
  return found || null;
}
