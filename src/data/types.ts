
export interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  brandId: string;
  categoryId: string;
  imageUrl: string; // Added imageUrl property
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
  categories: string[]; // category slugs
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  description: string;
  imageUrl: string;
  brandId: string;
  categoryId: string;
  subCategoryId?: string;
}
