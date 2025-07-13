
import { API_BASE_URL } from '@/config/api';

/**
 * Generic API service to wrap API requests with fallback for unavailable API.
 */
export async function fetchWithFallback<T>(endpoint: string, fallbackFn: () => T | Promise<T>): Promise<T> {
  // If no API URL is configured, use fallback immediately
  if (!API_BASE_URL) {
    console.log('No API URL configured, using fallback data');
    return fallbackFn();
  }

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('API request failed');
    return await res.json();
  } catch (e) {
    console.log('API unavailable, using fallback data');
    return fallbackFn();
  }
}
