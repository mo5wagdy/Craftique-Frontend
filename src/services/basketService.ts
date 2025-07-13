
import { fetchWithFallback } from './apiService';
import { toast } from 'sonner';
import { isLoggedIn } from './authService';

interface BasketItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  imageUrl: string;
}

interface ProductData {
  name: string;
  price: number;
  imageUrl: string;
}

interface BasketResponse {
  success: boolean;
  message: string;
  items?: BasketItem[];
  totalPrice?: number;
}

// Helper function to notify basket updates
const notifyBasketUpdate = () => {
  window.dispatchEvent(new CustomEvent('basketUpdated'));
};

// Check if user is authenticated before basket operations
const checkAuthentication = (): boolean => {
  if (!isLoggedIn()) {
    toast.error('Authentication Required', {
      description: 'Please sign in to add items to your basket'
    });
    return false;
  }
  return true;
};

// Add item to basket
export async function addToBasket(
  productId: string, 
  quantity: number = 1, 
  productData?: ProductData
): Promise<BasketResponse> {
  // Check if user is authenticated
  if (!checkAuthentication()) {
    return {
      success: false,
      message: 'Authentication required to add items to your basket'
    };
  }

  try {
    const response = await fetchWithFallback<BasketResponse>(
      '/api/basket/add',
      () => {
        // Mock implementation using localStorage
        const currentBasketStr = localStorage.getItem('basket') || '[]';
        let currentBasket: BasketItem[] = [];
        
        try {
          currentBasket = JSON.parse(currentBasketStr);
        } catch (e) {
          console.error('Failed to parse basket data', e);
        }
        
        // Check if product already in basket
        const existingItem = currentBasket.find(item => item.productId === productId);
        if (existingItem) {
          existingItem.quantity += quantity;
        } else {
          // Use provided product data if available, otherwise create placeholder
          currentBasket.push({
            productId,
            quantity,
            name: productData?.name || `Product ${productId}`,
            price: productData?.price || 99.99,
            imageUrl: productData?.imageUrl || '/placeholder.svg'
          });
        }
        
        localStorage.setItem('basket', JSON.stringify(currentBasket));
        notifyBasketUpdate(); // Notify about the update
        
        return {
          success: true,
          message: 'Product added to basket',
          items: currentBasket,
          totalPrice: calculateTotalPrice(currentBasket)
        };
      }
    );
    
    if (response.success) {
      toast('Added to Basket', {
        description: response.message || 'Product added to your basket.'
      });
    } else {
      toast.error('Error', {
        description: response.message || 'Failed to add product to basket.'
      });
    }
    
    return response;
  } catch (error) {
    console.error('Add to basket error:', error);
    toast.error('Error', {
      description: 'Failed to add product to basket. Please try again.'
    });
    
    return {
      success: false,
      message: 'An error occurred. Please try again.'
    };
  }
}

// Get basket items
export async function getBasketItems(): Promise<BasketItem[]> {
  // Check if user is authenticated
  if (!isLoggedIn()) {
    return [];
  }

  try {
    const response = await fetchWithFallback<BasketResponse>(
      '/api/basket',
      () => {
        // Mock implementation using localStorage
        const currentBasketStr = localStorage.getItem('basket') || '[]';
        let currentBasket: BasketItem[] = [];
        
        try {
          currentBasket = JSON.parse(currentBasketStr);
        } catch (e) {
          console.error('Failed to parse basket data', e);
        }
        
        return {
          success: true,
          message: 'Basket retrieved',
          items: currentBasket,
          totalPrice: calculateTotalPrice(currentBasket)
        };
      }
    );
    
    return response.items || [];
  } catch (error) {
    console.error('Get basket items error:', error);
    return [];
  }
}

// Clear basket
export async function clearBasket(): Promise<BasketResponse> {
  // Check if user is authenticated
  if (!checkAuthentication()) {
    return {
      success: false,
      message: 'Authentication required to clear your basket'
    };
  }

  try {
    const response = await fetchWithFallback<BasketResponse>(
      '/api/basket/clear',
      () => {
        localStorage.removeItem('basket');
        notifyBasketUpdate(); // Notify about the update
        
        return {
          success: true,
          message: 'Basket cleared',
          items: [],
          totalPrice: 0
        };
      }
    );
    
    if (response.success) {
      toast('Basket Cleared', {
        description: 'Your basket has been cleared.'
      });
    }
    
    return response;
  } catch (error) {
    console.error('Clear basket error:', error);
    
    return {
      success: false,
      message: 'Failed to clear basket. Please try again.'
    };
  }
}

// Helper function to calculate total price
function calculateTotalPrice(items: BasketItem[]): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Get total items in basket
export function getBasketItemCount(): number {
  if (!isLoggedIn()) {
    return 0;
  }

  const currentBasketStr = localStorage.getItem('basket') || '[]';
  let currentBasket: BasketItem[] = [];
  
  try {
    currentBasket = JSON.parse(currentBasketStr);
    return currentBasket.reduce((total, item) => total + item.quantity, 0);
  } catch (e) {
    console.error('Failed to parse basket data', e);
    return 0;
  }
}

// Get basket total price
export function getBasketTotalPrice(): number {
  if (!isLoggedIn()) {
    return 0;
  }
  
  const currentBasketStr = localStorage.getItem('basket') || '[]';
  let currentBasket: BasketItem[] = [];
  
  try {
    currentBasket = JSON.parse(currentBasketStr);
    return calculateTotalPrice(currentBasket);
  } catch (e) {
    console.error('Failed to parse basket data', e);
    return 0;
  }
}
