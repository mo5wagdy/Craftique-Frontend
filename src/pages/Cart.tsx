
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBasketItems, clearBasket, getBasketTotalPrice } from '@/services/basketService';
import { Button } from '@/components/ui/button';
import { Loader } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';

interface BasketItem {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  imageUrl: string;
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<BasketItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClearing, setIsClearing] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const loadBasket = async () => {
    setIsLoading(true);
    try {
      const items = await getBasketItems();
      setCartItems(items);
      setTotalPrice(getBasketTotalPrice());
    } catch (error) {
      console.error('Error loading basket:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    loadBasket();
    
    // Set up a storage event listener to update cart when localStorage changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'basket') {
        loadBasket();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Also set up a custom event listener for same-window updates
    const handleBasketUpdate = () => {
      loadBasket();
    };
    
    window.addEventListener('basketUpdated', handleBasketUpdate);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('basketUpdated', handleBasketUpdate);
    };
  }, [isAuthenticated, navigate]);
  
  const handleClearBasket = async () => {
    setIsClearing(true);
    try {
      await clearBasket();
      setCartItems([]);
      setTotalPrice(0);
    } catch (error) {
      console.error('Error clearing basket:', error);
    } finally {
      setIsClearing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container-custom py-16 text-center animate-fade-in">
        <div className="flex justify-center items-center">
          <Loader className="h-8 w-8 animate-spin mr-2" />
          <span>Loading your basket...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-16 animate-fade-in">
      <h1 className="text-3xl font-serif mb-8">
        Your Shopping Bag
      </h1>
      
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-serif">
                  Items ({cartItems.length})
                </h2>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-500 border-red-300 hover:bg-red-50">
                      Clear Basket
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Clear your basket?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to remove all items from your basket? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>
                        Cancel
                      </AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleClearBasket}
                        className="bg-red-500 text-white hover:bg-red-600"
                        disabled={isClearing}
                      >
                        {isClearing ? (
                          <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            Clearing...
                          </>
                        ) : (
                          "Clear Basket"
                        )}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <div key={item.productId} className="flex border-b border-craftique-sand pb-6">
                    <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md bg-craftique-beige">
                      <img src={item.imageUrl} alt={item.name} className="h-full w-full object-contain object-center" />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium">
                          <h3>
                            <Link to={`/product/${item.productId}`} className="hover:text-craftique-brown">
                              {item.name}
                            </Link>
                          </h3>
                          <p className="ml-4">{item.price.toFixed(2)} EGP</p>
                        </div>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-gray-500">
                          Qty {item.quantity}
                        </p>
                        <div className="flex">
                          <button type="button" className="font-medium text-craftique-brown hover:text-craftique-taupe">
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <h2 className="text-xl font-serif mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{totalPrice.toFixed(2)} EGP</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{(totalPrice * 0.14).toFixed(2)} EGP</span>
                </div>
                <div className="border-t border-craftique-sand pt-4 flex justify-between font-medium">
                  <span>Total</span>
                  <span>{(totalPrice * 1.14).toFixed(2)} EGP</span>
                </div>
              </div>
              <Button className="w-full btn-primary mt-6">
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-serif mb-4">
            Your bag is empty
          </h2>
          <p className="text-craftique-taupe mb-8">
            Looks like you haven't added any products to your bag yet.
          </p>
          <Link to="/" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
