import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from '../context/authcontext';
import { loginformstate } from '../types/logintypes';

export const uselogin = () => {
  const { login } = useAuth();
  
  const [form, setForm] = useState<loginformstate>({
    email: '',
    password: '',
  });
  
  const [isloading, setisloading] = useState(false);
  const [ispasswordvisible, setispasswordvisible] = useState(false);

  const handlelogin = async () => {
    const email = form.email.trim();
    const password = form.password.trim();

    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setisloading(true);
    try {
      await login(email.toLowerCase(), password);
    } catch (err: any) {
      Alert.alert('Login Failed', err.message);
    } finally {
      setisloading(false);
    }
  };

  return { form, setForm, isloading, ispasswordvisible, setispasswordvisible, handlelogin };
};