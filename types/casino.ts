export type DesignStatus = "active" | "hidden" | "unavailable";

export interface DesignPreviewImage {
  id: string;
  title: string;
  url: string;
  order: number;
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
