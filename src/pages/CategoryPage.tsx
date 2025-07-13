
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import BrandCard from '@/components/BrandCard';
import { getBrandsByCategory, getCategoryBySlug } from '@/data/mockData';

const CategoryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;
  const brands = slug ? getBrandsByCategory(slug) : [];

  if (!category) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-serif mb-4">Category not found</h2>
        <Link to="/" className="btn-primary">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="relative h-64">
        <img 
          src={category.imageUrl} 
          alt={category.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-4xl font-serif text-white">{category.name}</h1>
        </div>
      </div>
      
      <div className="container-custom py-16">
        <h2 className="text-2xl font-serif mb-8">Brands in {category.name}</h2>
        
        {brands.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {brands.map((brand) => (
              <BrandCard 
                key={brand.id}
                name={brand.name}
                slug={brand.slug}
                imageUrl={brand.imageUrl}
                description={brand.description}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-craftique-taupe">
            No brands found in this category.
          </p>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
