
// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

// Helper to normalize image URLs
export const normalizeImageUrl = (imageUrl: string) => {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('http')) return imageUrl;
  if (imageUrl.startsWith('/')) {
    return API_BASE_URL ? `${API_BASE_URL}${imageUrl}` : imageUrl;
  }
  return imageUrl;
};
