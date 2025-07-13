
import { Category } from '@/data/types';
import { categories, getCategoryBySlug } from '@/data/mockData';
import { fetchWithFallback } from './apiService';

const API_BASE = '/api/categories';

// Fetch all categories
export async function fetchCategories(): Promise<Category[]> {
  return fetchWithFallback(
    `${API_BASE}`,
    () => categories
  );
}

// Fetch category by slug
export async function fetchCategoryBySlug(slug: string): Promise<Category | undefined> {
  return fetchWithFallback(
    `${API_BASE}/slug/${slug}`,
    () => getCategoryBySlug(slug)
  );
}
