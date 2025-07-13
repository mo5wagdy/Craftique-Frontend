
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/services/authService';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { UserRound } from 'lucide-react';
import { useLocalization } from '@/contexts/LanguageContext';

const Profile = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const { t, language } = useLocalization();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="container-custom py-16 max-w-2xl mx-auto" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="bg-craftique-sand rounded-full p-4">
            <UserRound size={32} className="text-craftique-brown" />
          </div>
          <div>
            <h1 className="text-2xl font-serif">{t('myProfile')}</h1>
            <p className="text-craftique-taupe">{t('manageAccount')}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-craftique-taupe">{t('name')}</label>
            <p className="text-lg">{user.firstName} {user.lastName}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-craftique-taupe">{t('email')}</label>
            <p className="text-lg">{user.email}</p>
          </div>
          <Button 
            variant="outline" 
            className="w-full mt-4"
            onClick={() => navigate('/')}
          >
            {t('backToHome')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
