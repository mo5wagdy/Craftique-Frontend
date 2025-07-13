
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

interface BrandCardProps {
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
}

const BrandCard: React.FC<BrandCardProps> = ({ name, slug, imageUrl, description }) => {
  const { language } = useLanguage();
  
  return (
    <Link to={`/brand/${slug}`} className="block bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-200">
      <div className="h-48 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        <h3 className="font-serif text-xl mb-2">{name}</h3>
        <p className="text-craftique-taupe text-sm line-clamp-2">{description}</p>
      </div>
    </Link>
  );
};

export default BrandCard;
