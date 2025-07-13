
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductById, getBrandById, getCategoryBySlug } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader } from 'lucide-react';
import { addToBasket } from '@/services/basketService';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { useAuth } from '@/contexts/AuthContext';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = id ? getProductById(id) : undefined;
  const brand = product ? getBrandById(product.brandId) : undefined;
  const category = product ? getCategoryBySlug(product.categoryId) : undefined;
  const [quantity, setQuantity] = useState(1);
  const [isAddingToBasket, setIsAddingToBasket] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { isAuthenticated } = useAuth();

  // Make sure the Product Page never errors for any product, even for dummy data or edge cases
  if (!product) {
    return (
      <div className="container-custom py-16 text-center animate-fade-in">
        <Button variant="ghost" className="mb-8" onClick={() => navigate(-1)}>
          <ArrowLeft className="mr-2" /> Back
        </Button>
        <h2 className="text-2xl font-serif mb-4">Product not found</h2>
        <Link to="/" className="btn-primary">Return to Home</Link>
      </div>
    );
  }

  const handleAddToBasket = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsAddingToBasket(true);
    try {
      const productData = {
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl
      };
      
      const response = await addToBasket(product.id, quantity, productData);
      if (response.success) {
        setShowSuccessDialog(true);
      }
    } catch (error) {
      console.error("Error adding to basket:", error);
    } finally {
      setIsAddingToBasket(false);
    }
  };

  return (
    <div className="container-custom py-8 animate-fade-in">
      <Button variant="ghost" className="mb-8" onClick={() => navigate(-1)}>
        <ArrowLeft className="mr-2" /> Back
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="w-full bg-white rounded-lg overflow-hidden shadow mb-6 md:mb-0">
          <img 
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-80 sm:h-96 object-contain object-center bg-craftique-beige transition-all duration-300"
            style={{ backgroundColor: "#fdf6ef" }}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="mb-2">
            {brand && (
              <Link
                to={`/brand/${brand.slug}`}
                className="inline-block text-craftique-taupe hover:text-craftique-brown font-medium text-base underline underline-offset-2"
              >
                {brand.name}
              </Link>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-medium mb-2 break-words">{product.name}</h1>
          <div className="mb-4">
            <span className="text-xl sm:text-2xl font-serif font-bold text-craftique-brown">
              {product.price.toFixed(2)} EGP
            </span>
          </div>
          <div className="flex items-center gap-4 mb-6">
            <span className="font-medium">Quantity:</span>
            <div className="flex border rounded-md w-max items-center overflow-hidden bg-craftique-beige">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-lg font-semibold text-craftique-taupe hover:bg-craftique-sand disabled:opacity-40"
                disabled={quantity <= 1}
              >
                −
              </button>
              <input
                type="number"
                min={1}
                value={quantity}
                onChange={e => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-12 text-center bg-transparent text-craftique-brown font-bold border-x-0 focus:outline-none"
              />
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQuantity((q) => q + 1)}
                className="px-3 py-1 text-lg font-semibold text-craftique-taupe hover:bg-craftique-sand"
              >
                +
              </button>
            </div>
          </div>
          <Button 
            className="w-full font-semibold btn-primary text-lg py-3 rounded-md transition-all duration-200"
            onClick={handleAddToBasket}
            disabled={isAddingToBasket}
          >
            {isAddingToBasket ? (
              <>
                <Loader className="mr-2 h-4 w-4 animate-spin" /> Adding...
              </>
            ) : (
              !isAuthenticated ? "Sign in to Add to Basket" : "Add to Basket"
            )}
          </Button>
          {product.description && (
            <div className="mt-6">
              <p className="text-craftique-taupe text-base">{product.description}</p>
            </div>
          )}
          <div className="border-t border-craftique-sand pt-6 mt-6">
            <div className="flex items-center mb-2">
              <span className="font-medium w-24">Category:</span>
              {category ? (
                <Link to={`/category/${category.slug}`} className="text-craftique-taupe hover:text-craftique-brown">
                  {category.name}
                </Link>
              ) : (
                <span className="text-craftique-taupe">—</span>
              )}
            </div>
            <div className="flex items-center">
              <span className="font-medium w-24">Brand:</span>
              {brand ? (
                <Link to={`/brand/${brand.slug}`} className="text-craftique-taupe hover:text-craftique-brown">
                  {brand.name}
                </Link>
              ) : (
                <span className="text-craftique-taupe">—</span>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Success Dialog */}
      <AlertDialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Added to Basket</AlertDialogTitle>
            <AlertDialogDescription>
              {product.name} has been added to your basket successfully.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowSuccessDialog(false)}>
              Continue Shopping
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => navigate('/cart')}>
              View Basket
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductPage;
