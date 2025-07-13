
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';

const Hero = () => {
  const { language } = useLanguage();

  return (
    <div className="relative">
      <div className="h-[70vh] w-full relative overflow-hidden">
        <img 
          src="/Hero/77d13ef9-b7d7-4c00-a3e7-b181e1fcd420.png" 
          alt="Craftique hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 drop-shadow-[0_0_8px_rgba(93,75,60,0.8)]">
            <span className="border-2 border-white/80 px-6 py-2">
              {language === 'en' ? 'CRAFTIQUE' : 'كرافتيك'}
            </span>
          </h1>
          <p className="text-white text-lg md:text-xl max-w-2xl drop-shadow-[0_0_8px_rgba(93,75,60,0.8)] mb-8">
            {language === 'en' 
              ? 'Discover artisanal craftsmanship for the modern woman'
              : 'اكتشفي الحرف اليدوية للمرأة العصرية'}
          </p>
          <Link 
            to="/category/skin-care" 
            className="bg-craftique-brown text-white px-8 py-3 rounded-md transition-all duration-300 hover:px-12 hover:shadow-lg border border-transparent hover:border-white/20"
          >
            {language === 'en' ? 'Shop Now' : 'تسوق الآن'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
