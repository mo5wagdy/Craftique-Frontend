
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const { language } = useLanguage();

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="transition-transform hover:scale-125 duration-300" />,
      url: 'https://facebook.com/craftique',
      color: 'hover:text-[#1877F2]'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="transition-transform hover:scale-125 duration-300" />,
      url: 'https://instagram.com/craftique',
      color: 'hover:text-[#E4405F]'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="transition-transform hover:scale-125 duration-300" />,
      url: 'https://twitter.com/craftique',
      color: 'hover:text-[#1DA1F2]'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="transition-transform hover:scale-125 duration-300" />,
      url: 'https://linkedin.com/company/craftique',
      color: 'hover:text-[#0A66C2]'
    }
  ];

  return (
    <footer className="bg-craftique-beige text-craftique-brown" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-serif mb-4">{language === 'en' ? 'Craftique' : 'كرافتيك'}</h3>
            <p className="text-sm text-craftique-taupe mb-4">
              {language === 'en' 
                ? 'Your destination for unique handcrafted products that celebrate artisanal quality and timeless elegance.'
                : 'وجهتك للمنتجات اليدوية الفريدة التي تحتفي بالجودة الحرفية والأناقة الخالدة.'}
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">{language === 'en' ? 'Shop' : 'تسوق'}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/category/skin-care" className="hover:text-craftique-taupe">
                {language === 'en' ? 'Skin Care' : 'العناية بالبشرة'}
              </Link></li>
              <li><Link to="/category/beauty" className="hover:text-craftique-taupe">
                {language === 'en' ? 'Beauty' : 'الجمال'}
              </Link></li>
              <li><Link to="/category/home-decor" className="hover:text-craftique-taupe">
                {language === 'en' ? 'Home Decor' : 'ديكور المنزل'}
              </Link></li>
              <li><Link to="/category/bags" className="hover:text-craftique-taupe">
                {language === 'en' ? 'Bags' : 'الحقائب'}
              </Link></li>
              <li><Link to="/category/accessories" className="hover:text-craftique-taupe">
                {language === 'en' ? 'Accessories' : 'الإكسسوارات'}
              </Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">{language === 'en' ? 'Our Team' : 'فريقنا'}</h4>
            <address className="not-italic text-sm space-y-2">
              <p>{language === 'en' ? 'Tanta University' : 'جامعة طنطا'}</p>
              <p>{language === 'en' ? 'Graduation Project Team' : 'فريق مشروع التخرج'}</p>
              <p>{language === 'en' ? 'Email: craftique@gmail.com' : 'البريد الإلكتروني: craftique@gmail.com'}</p>
              <p>{language === 'en' ? 'Phone: 01554503750' : 'الهاتف: 01554503750'}</p>
            </address>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">{language === 'en' ? 'Follow Us' : 'تابعنا'}</h4>
            <div className="flex gap-4 text-craftique-brown">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-2 rounded-full hover:bg-white/50 ${social.color} transition-all duration-300`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-craftique-sand mt-8 pt-8 text-sm text-center text-craftique-taupe">
          <p>
            &copy; {new Date().getFullYear()} {language === 'en' ? 'Craftique. All rights reserved.' : 'كرافتيك. جميع الحقوق محفوظة.'}<br/>
            Hadeer, Muhammed, Menna, Noura, Nouran
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
