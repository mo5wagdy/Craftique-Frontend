
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '@/services/authService';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalization } from '@/contexts/LanguageContext';

const Login = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const { t, language } = useLocalization();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await login({ email, password });
      
      if (response.success) {
        const user = response.user;
        toast(t('welcomeBack'), {
          description: `${t('goodToSeeYou')}, ${user?.firstName || 'valued customer'}!`
        });
        refreshUser(); // Update auth context
        navigate('/profile');
      } else {
        setError(response.message || 'Invalid email or password');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-custom py-16 max-w-md mx-auto animate-fade-in" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-serif text-center mb-8">{t('login')}</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            {t('email')}
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-4 py-2 border border-craftique-sand rounded-md focus:outline-none focus:ring-2 focus:ring-craftique-brown"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            {t('password')}
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-4 py-2 border border-craftique-sand rounded-md focus:outline-none focus:ring-2 focus:ring-craftique-brown"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 text-craftique-brown focus:ring-craftique-brown border-craftique-sand rounded"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember" className="ml-2 block text-sm">
              {t('rememberMe')}
            </label>
          </div>
          
          <a href="#" className="text-sm text-craftique-brown hover:underline">
            {t('forgotPassword')}
          </a>
        </div>
        
        <Button
          type="submit"
          className="w-full btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" /> {t('signingIn')}
            </>
          ) : (
            t('signIn')
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-craftique-taupe">
          {t('dontHaveAccount')}{' '}
          <Link to="/signup" className="text-craftique-brown hover:underline">
            {t('signUp')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
