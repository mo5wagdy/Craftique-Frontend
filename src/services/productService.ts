
import { Product } from '@/data/types';
import { products, getProductsByBrand, getProductsByCategory, getProductsBySubCategory, getProductById } from '@/data/mockData';
import { fetchWithFallback } from './apiService';

const API_BASE = '/api/products';

export async function fetchProductsByBrand(brandId: string): Promise<Product[]> {
  return fetchWithFallback(
    `${API_BASE}/brand/${brandId}`,
    () => getProductsByBrand(brandId)
  );
}

export async function fetchProductsByCategory(categoryId: string): Promise<Product[]> {
  return fetchWithFallback(
    `${API_BASE}/category/${categoryId}`,
    () => getProductsByCategory(categoryId)
  );
}

export async function fetchProductsBySubCategory(subCategoryId: string): Promise<Product[]> {
  return fetchWithFallback(
    `${API_BASE}/subcategory/${subCategoryId}`,
    () => getProductsBySubCategory(subCategoryId)
  );
}

export async function fetchProductById(id: string): Promise<Product | undefined> {
  return fetchWithFallback(
    `${API_BASE}/${id}`,
    () => getProductById(id)
  );
}
