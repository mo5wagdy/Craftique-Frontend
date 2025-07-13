
import React from 'react';
import SubCategoryCard from './SubCategoryCard';
import { getSubCategoriesByBrand } from '@/data/mockData';
import { SubCategory } from '@/data/types';

interface SubCategoryCardsProps {
  brandId: string;
  brandSlug: string;
}

const SubCategoryCards: React.FC<SubCategoryCardsProps> = ({ brandId, brandSlug }) => {
  const subCategories = getSubCategoriesByBrand(brandId);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {subCategories.map((subCategory: SubCategory) => (
        <SubCategoryCard
          key={subCategory.id}
          name={subCategory.name}
          slug={subCategory.slug}
          brandSlug={brandSlug}
          imageUrl={subCategory.imageUrl}
        />
      ))}
    </div>
  );
};

export default SubCategoryCards;
