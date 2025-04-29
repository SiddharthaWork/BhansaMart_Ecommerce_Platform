import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import { decryptData } from '@/utils/Secure';
import { getToken } from 'firebase/messaging';
import { messaging } from '@/server-action/firebase/FirebaseConfig';

export const ProtectedLayout = () => {
  const location = useLocation();
  const { data: authData, isLoading } = useAuth();
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

  const requestPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey:
          'BNHwiiLMuGK9UjBkuaNalAqHCh-k-dIiVY_6raUv7Y5pVwM4C4SEr8BThOi7UuIsEmMJRvVJmuXEUfKJhumXzC4',
      });
      console.log(token);
    } else if (permission === 'denied') {
    }
  };

  useEffect(() => {
    if (!isLoading && !authData) {
      const path = location.pathname + location.search;
      setRedirectPath(`/auth-login?redirect=${encodeURIComponent(path)}`);
    }

    if (authData) {
      const validationKey = authData?.validationKey;
      const decrypt = decryptData(validationKey);
      if (decrypt !== 'WELCOMESUPERADMIN') {
        const path = location.pathname + location.search;
        setRedirectPath(`/auth-login?redirect=${encodeURIComponent(path)}`);
      }
    }
  }, [isLoading, authData, location]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (redirectPath) {
    return <Navigate to={redirectPath} replace />;
  }

  return authData ? <Outlet /> : null;
};
