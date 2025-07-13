
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '@/services/authService';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLocalization } from '@/contexts/LanguageContext';

const SignUp = () => {
  const navigate = useNavigate();
  const { refreshUser } = useAuth();
  const { t, language } = useLocalization();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the Terms and Conditions');
      return;
    }

    setIsLoading(true);

    try {
      const response = await signUp({
        firstName,
        lastName,
        email,
        password
      });
      
      if (response.success) {
        toast('Welcome to CraftiQue!', {
          description: `Account created successfully. Welcome, ${firstName}!`
        });
        refreshUser(); // Update auth context
        navigate('/profile');
      } else {
        setError(response.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-custom py-16 max-w-md mx-auto animate-fade-in" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <h1 className="text-3xl font-serif text-center mb-8">{t('createAccount')}</h1>
      
      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium mb-1">
              {t('firstName')}
            </label>
            <input
              id="firstName"
              type="text"
              className="w-full px-4 py-2 border border-craftique-sand rounded-md focus:outline-none focus:ring-2 focus:ring-craftique-brown"
              placeholder={t('firstName')}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium mb-1">
              {t('lastName')}
            </label>
            <input
              id="lastName"
              type="text"
              className="w-full px-4 py-2 border border-craftique-sand rounded-md focus:outline-none focus:ring-2 focus:ring-craftique-brown"
              placeholder={t('lastName')}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
        </div>
        
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
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            {t('confirmPassword')}
          </label>
          <input
            id="confirmPassword"
            type="password"
            className="w-full px-4 py-2 border border-craftique-sand rounded-md focus:outline-none focus:ring-2 focus:ring-craftique-brown"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            className="h-4 w-4 text-craftique-brown focus:ring-craftique-brown border-craftique-sand rounded"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm">
            {t('agreeToTerms')}{' '}
            <Link to="/terms" className="text-craftique-brown hover:underline">
              {t('termsAndConditions')}
            </Link>
          </label>
        </div>
        
        <Button
          type="submit"
          className="w-full btn-primary"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="mr-2 h-4 w-4 animate-spin" /> {t('creatingAccount')}
            </>
          ) : (
            t('signUp')
          )}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-craftique-taupe">
          {t('alreadyHaveAccount')}{' '}
          <Link to="/login" className="text-craftique-brown hover:underline">
            {t('signIn')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
