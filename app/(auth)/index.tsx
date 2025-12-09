import { useAuth } from '@/features/auth';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';

export default function AuthIndex() {
  const { firstLaunch } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (firstLaunch !== null) {
      setIsReady(true);
    }
  }, [firstLaunch]);

  if (!isReady) {
    return null;
  }
  return <Redirect href={firstLaunch ? '/greeting' : '/login'} />;
}
