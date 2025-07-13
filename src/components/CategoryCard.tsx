
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

interface CategoryCardProps {
  title: string;
  imageUrl: string;
  slug: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, imageUrl, slug }) => {
  const { language } = useLanguage();
  
  return (
    <Link to={`/category/${slug}`} className="category-card block">
      <div className="relative overflow-hidden group">
        <div className="h-64 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
          <h3 className="text-white font-serif text-xl p-4 w-full text-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            {title}
          </h3>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
