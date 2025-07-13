
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

interface SubCategoryCardProps {
  name: string;
  slug: string;
  brandSlug: string;
  imageUrl: string;
}

const SubCategoryCard: React.FC<SubCategoryCardProps> = ({ name, slug, brandSlug, imageUrl }) => {
  const { language } = useLanguage();

  return (
    <Link
      to={`/brand/${brandSlug}/subcategory/${slug}`}
      className="group block transition-all duration-300 hover:scale-105"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      <div className="bg-white rounded-lg shadow-sm group-hover:shadow-md transition-all duration-200 overflow-hidden">
        <div className="h-48 bg-craftique-beige rounded-t-lg flex items-center justify-center overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="p-4 text-center text-craftique-taupe">
          <h3 className="text-xl font-serif px-6 py-2 bg-white/80 backdrop-blur-sm rounded-md inline-block">
            {name}
          </h3>
          <div>
            {language === 'en' ? 'View Products' : 'عرض المنتجات'}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SubCategoryCard;
