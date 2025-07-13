
import React from 'react';
import Hero from '@/components/Hero';
import CategoryCard from '@/components/CategoryCard';
import { categories } from '@/data/mockData';

const Index = () => {
  return (
    <div className="animate-fade-in">
      <Hero />
      
      <section className="py-16 container-custom">
        <h2 className="text-3xl font-serif text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <CategoryCard 
              key={category.id}
              title={category.name}
              imageUrl={category.imageUrl}
              slug={category.slug}
            />
          ))}
        </div>
      </section>
      
      <section className="py-16 bg-craftique-beige">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-serif mb-6">Artisanal Craftsmanship</h2>
          <p className="max-w-2xl mx-auto text-craftique-taupe">
            At Craftique, we celebrate the beauty of handmade products. Each item in our collection 
            is carefully selected for its quality, uniqueness, and the story it tells. Discover 
            the charm of artisanal craftsmanship with our curated selection of products.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Index;
