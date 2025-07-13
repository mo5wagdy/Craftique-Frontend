
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { addToBasket } from '@/services/basketService';
import { useAuth } from '@/contexts/AuthContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  brandName: string;
  categoryName: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  id, 
  name, 
  price, 
  imageUrl, 
  brandName,
  categoryName
}) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to product page
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    try {
      await addToBasket(id, 1, { name, price, imageUrl });
    } catch (error) {
      console.error('Failed to add product to basket:', error);
    }
  };

  return (
    <Link 
      to={`/product/${id}`} 
      className="group block transition-all duration-300 hover:scale-105 relative"
    >
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="h-64 overflow-hidden relative">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover"
          />
          <Button
            onClick={handleAddToCart}
            className="absolute top-4 right-4 rounded-full p-2 bg-white/80 hover:bg-white shadow-md"
            size="icon"
            variant="ghost"
          >
            <ShoppingCart className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4">
          <div className="text-sm text-craftique-taupe mb-1">
            {brandName}
          </div>
          <h3 className="font-medium mb-1">
            {name}
          </h3>
          <p className="font-serif font-medium">
            {price.toFixed(2)} EGP
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
