
import { Brand } from '@/data/types';
import { brands, getBrandBySlug, getBrandsByCategory } from '@/data/mockData';
import { fetchWithFallback } from './apiService';
import { normalizeImageUrl } from '@/config/api';

const ENDPOINT_BASE = '/api/brands';

// Helper to normalize brand data from API
const normalizeBrand = (brand: Brand): Brand => ({
  ...brand,
  imageUrl: normalizeImageUrl(brand.imageUrl)
});

// Fetch all brands
export async function fetchBrands(): Promise<Brand[]> {
  const data = await fetchWithFallback<Brand[]>(
    ENDPOINT_BASE,
    () => brands
  );
  return data.map(normalizeBrand);
}

// Fetch brand by slug
export async function fetchBrandBySlug(slug: string): Promise<Brand | undefined> {
  const data = await fetchWithFallback<Brand | undefined>(
    `${ENDPOINT_BASE}/slug/${slug}`,
    () => getBrandBySlug(slug)
  );
  return data ? normalizeBrand(data) : undefined;
}

// Fetch brands by category
export async function fetchBrandsByCategory(categorySlug: string): Promise<Brand[]> {
  const data = await fetchWithFallback<Brand[]>(
    `${ENDPOINT_BASE}/category/${categorySlug}`,
    () => getBrandsByCategory(categorySlug)
  );
  return data.map(normalizeBrand);
}
