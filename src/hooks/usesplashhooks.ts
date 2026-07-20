import { useEffect } from 'react';
import { splashconstants } from '../constants/splashconstants';
import { useAuth } from '../context/authcontext'; // Update this path to where your authcontext is located

export const usesplash = (navigation: any) => {
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      // Use replace so the user cannot go back to the splash screen
      if (user) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    }, splashconstants.duration);

    return () => clearTimeout(timer);
  }, [navigation, user]);

  return {};
};