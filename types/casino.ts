export type DesignStatus = "active" | "hidden" | "unavailable";

export interface DesignPreviewImage {
  id: string;
  title: string;
  url: string;
  order: number;
  pagePath?: string; // Simulated URL path in demo browser (e.g. "/", "/services", "/pricing")
  publicId?: string; // Cloudinary public_id for cleanup
  category?: string; // Optional preset label
}

export interface CasinoDesign {
  id: string;
  slug: string;
  name: string;
  subtitle?: string;
  image: string; // Primary gallery thumbnail
  previewImages?: DesignPreviewImage[];
  tags?: string[];
  status: DesignStatus;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}
