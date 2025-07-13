import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import SubCategoryCards from '@/components/SubCategoryCards';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/hooks/useLanguage';
import { fetchBrandBySlug } from '@/services/brandService';
import { fetchProductsByBrand } from '@/services/productService';
import { getCategoryBySlug } from '@/data/mockData';

const BrandPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const [brand, setBrand] = useState<any | undefined>(undefined);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const showSubCategories = brand && ["1", "2"].includes(brand.id);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetchBrandBySlug(slug).then((data) => {
        setBrand(data);
        if (data) {
          fetchProductsByBrand(data.id).then((prods) => {
            setProducts(prods.slice(0, 3));
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      });
    }
  }, [slug]);

  if (loading) {
    return <div className="container-custom py-16 text-center">Loading...</div>;
  }

  if (!brand) {
    return (
      <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-serif mb-4">
          {language === 'en' ? 'Brand not found' : 'العلامة التجارية غير موجودة'}
        </h2>
        <Link to="/" className="btn-primary">
          {language === 'en' ? 'Return to Home' : 'العودة للرئيسية'}
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div className="relative h-64">
        <Button
          variant="ghost"
          className="absolute top-4 left-4 z-10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2" />
          {language === 'en' ? 'Back' : 'رجوع'}
        </Button>
        <img 
          src={brand.imageUrl} 
          alt={brand.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-4xl font-serif text-white">{brand.name}</h1>
        </div>
      </div>
      
      <div className="container-custom py-16">
        <div className="mb-12 max-w-3xl mx-auto text-center">
          <p className="text-craftique-taupe">{brand.description}</p>
        </div>
        
        {showSubCategories ? (
          <>
            <h2 className="text-2xl font-serif mb-8">
              {language === 'en' ? 'Categories' : 'التصنيفات'}
            </h2>
            <SubCategoryCards brandId={brand.id} brandSlug={brand.slug} />
          </>
        ) : (
          <>
            <h2 className="text-2xl font-serif mb-8">
              {language === 'en' ? `Featured Products by ${brand.name}` : `منتجات مميزة من ${brand.name}`}
            </h2>
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => {
                  const category = getCategoryBySlug(product.categoryId);
                  return (
                    <ProductCard 
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      imageUrl={product.imageUrl}
                      brandName={brand.name}
                      categoryName={category?.name || ''}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-craftique-taupe">
                {language === 'en' ? 'No products found for this brand.' : 'لا توجد منتجات لهذه العلامة التجارية.'}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BrandPage;
