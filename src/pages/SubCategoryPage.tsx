
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft } from 'lucide-react';
import { getSubCategoryBySlug, getBrandBySlug, getProductsBySubCategory } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';

const SubCategoryPage = () => {
  const { brandSlug, subCategorySlug } = useParams<{ brandSlug: string; subCategorySlug: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  
  const subCategory = subCategorySlug ? getSubCategoryBySlug(subCategorySlug) : undefined;
  const brand = brandSlug ? getBrandBySlug(brandSlug) : undefined;
  const products = subCategory ? getProductsBySubCategory(subCategory.id).slice(0, 3) : []; // Show only 3 products

  if (!subCategory || !brand) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-serif mb-4">
          {language === 'en' ? 'Category not found' : 'التصنيف غير موجود'}
        </h2>
        <Link to="/" className="btn-primary">
          {language === 'en' ? 'Return to Home' : 'العودة للرئيسية'}
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="container-custom py-8">
        <Button
          variant="ghost"
          className="mb-8"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2" />
          {language === 'en' ? `Back to ${brand.name}` : `رجوع إلى ${brand.name}`}
        </Button>

        <h1 className="text-3xl font-serif mb-8">{subCategory.name}</h1>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                imageUrl={product.imageUrl}
                brandName={brand.name}
                categoryName={subCategory.name}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-craftique-taupe">
            {language === 'en' ? 'No products found in this category.' : 'لا توجد منتجات في هذا التصنيف.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default SubCategoryPage;
