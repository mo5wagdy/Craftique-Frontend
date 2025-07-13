
import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

interface LanguageContextType {
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  t: (key: string) => string;
}

// Simple translation dictionary
const translations: Record<string, Record<string, string>> = {
  en: {
    'welcomeBack': 'Welcome Back!',
    'goodToSeeYou': 'Good to see you again',
    'createAccount': 'Create an Account',
    'email': 'Email',
    'password': 'Password',
    'confirmPassword': 'Confirm Password',
    'firstName': 'First Name',
    'lastName': 'Last Name',
    'rememberMe': 'Remember me',
    'forgotPassword': 'Forgot password?',
    'signIn': 'Sign in',
    'signUp': 'Sign Up',
    'dontHaveAccount': 'Don\'t have an account?',
    'alreadyHaveAccount': 'Already have an account?',
    'termsAndConditions': 'Terms and Conditions',
    'agreeToTerms': 'I agree to the',
    'signingIn': 'Signing in...',
    'creatingAccount': 'Creating Account...',
    'shopNow': 'Shop Now',
    'myProfile': 'My Profile',
    'manageAccount': 'Manage your account details',
    'name': 'Name',
    'backToHome': 'Back to Home',
    'logout': 'Logout',
    'profile': 'Profile',
    'login': 'Login',
    'yourDetails': 'Your Details',
    'brands': 'Brands'
  },
  ar: {
    'welcomeBack': 'مرحبا بعودتك!',
    'goodToSeeYou': 'سعيد برؤيتك مرة أخرى',
    'createAccount': 'إنشاء حساب',
    'email': 'البريد الإلكتروني',
    'password': 'كلمة المرور',
    'confirmPassword': 'تأكيد كلمة المرور',
    'firstName': 'الاسم الأول',
    'lastName': 'اسم العائلة',
    'rememberMe': 'تذكرني',
    'forgotPassword': 'نسيت كلمة المرور؟',
    'signIn': 'تسجيل الدخول',
    'signUp': 'التسجيل',
    'dontHaveAccount': 'ليس لديك حساب؟',
    'alreadyHaveAccount': 'هل لديك حساب بالفعل؟',
    'termsAndConditions': 'الشروط والأحكام',
    'agreeToTerms': 'أوافق على',
    'signingIn': 'جاري تسجيل الدخول...',
    'creatingAccount': 'جاري إنشاء الحساب...',
    'shopNow': 'تسوق الآن',
    'myProfile': 'ملفي الشخصي',
    'manageAccount': 'إدارة تفاصيل حسابك',
    'name': 'الاسم',
    'backToHome': 'العودة إلى الصفحة الرئيسية',
    'logout': 'تسجيل الخروج',
    'profile': 'الملف الشخصي',
    'login': 'تسجيل الدخول',
    'yourDetails': 'بياناتك',
    'brands': 'الماركات'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { language, setLanguage: setStoredLanguage } = useLanguage();
  
  useEffect(() => {
    // Set document direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);
  
  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  const setLanguage = (lang: 'en' | 'ar') => {
    setStoredLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLocalization = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLocalization must be used within a LanguageProvider');
  }
  return context;
};
