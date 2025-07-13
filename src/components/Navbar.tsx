
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, ChevronDown, Menu, Globe } from 'lucide-react';
import { getBasketItemCount } from '@/services/basketService';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalization } from '@/contexts/LanguageContext';

const navCategories = [
  {
    title: "Skin Care",
    slug: "skin-care",
    brands: [
      { name: "Geory", slug: "geory" }
    ]
  },
  {
    title: "Beauty",
    slug: "beauty",
    brands: [
      { name: "GlowUp", slug: "glowup" },
      { name: "Mira", slug: "mira" }
    ]
  },
  {
    title: "Bags",
    slug: "bags",
    brands: [
      { name: "Butterfly", slug: "butterfly-bags" },
      { name: "Piece of Art", slug: "piece-of-art-bags" }
    ]
  },
  {
    title: "Accessories",
    slug: "accessories",
    brands: [
      { name: "Lilac", slug: "lilac" },
      { name: "Butterfly", slug: "butterfly-accessories" }
    ]
  },
  {
    title: "Home Decor",
    slug: "home-decor",
    brands: [
      { name: "Piece of Art", slug: "piece-of-art-decor" },
      { name: "Moonlight", slug: "moonlight" }
    ]
  }
];

const Navbar = () => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const { user, isAuthenticated, logout } = useAuth();
  const { language, setLanguage, t } = useLocalization();

  useEffect(() => {
    setCartCount(getBasketItemCount());

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'basket') {
        setCartCount(getBasketItemCount());
      }
    };

    const handleBasketUpdate = () => {
      setCartCount(getBasketItemCount());
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('basketUpdated', handleBasketUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('basketUpdated', handleBasketUpdate);
    };
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const MobileMenu = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="flex flex-col gap-4">
          <Link to="/" className="text-lg font-medium">
            Home
          </Link>
          <div className="border-t border-gray-200 py-4">
            <p className="font-medium mb-2">
              {t('brands')}
            </p>
            {navCategories.map((cat) => (
              <div key={cat.slug} className="mb-3">
                <p className="text-craftique-taupe text-sm mb-1 font-semibold">{cat.title}</p>
                {cat.brands.map((brand) => (
                  <Link
                    key={brand.slug}
                    to={`/brand/${brand.slug}`}
                    className="block py-2 pl-3 text-craftique-taupe hover:text-craftique-brown"
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );

  return (
    <nav className="bg-white shadow-sm py-4 sticky top-0 z-50" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <MobileMenu />
            <Link to="/" className="text-2xl font-serif font-medium text-craftique-brown">
              Craftique
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger className="nav-link flex items-center gap-2">
                  <span>{t('brands')}</span>
                  <ChevronDown size={16} />
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end"
                  className="w-56 bg-white"
                >
                  {navCategories.map((cat) => (
                    <div key={cat.slug} className="px-2 py-1">
                      <div className="text-craftique-taupe text-xs font-semibold mb-1">{cat.title}</div>
                      {cat.brands.map((brand) => (
                        <DropdownMenuItem key={brand.slug}>
                          <Link to={`/brand/${brand.slug}`} className="w-full">
                            {brand.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="nav-link"
              title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            >
              <Globe size={20} />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger className="nav-link">
                <User size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isAuthenticated ? (
                  <>
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full">
                        {t('profile')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      logout();
                      navigate('/');
                    }}>
                      {t('logout')}
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem>
                      <Link to="/login" className="w-full">
                        {t('login')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link to="/signup" className="w-full">
                        {t('signUp')}
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/cart" className="nav-link relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-craftique-brown text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
