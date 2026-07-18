import { useState } from 'react';
import { Alert } from 'react-native';
import { useAuth } from './../context/authcontext';
import { initialformstate } from './../constants/signupconstants';

export const usesignup = () => {
  const { signUp } = useAuth();
  const [form, setForm] = useState(initialformstate);
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Helper to update specific fields
  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSignUp = async () => {
    // 1. Validation check
    // We check that all fields are filled, including the role
    if (!form.name.trim() || !form.email.trim() || !form.password.trim() || !form.role) {
      Alert.alert('Error', 'Please fill in all fields, including your role.');
      return;
    }

    // 2. Password Match Validation
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      // Calling signUp with the form data
      await signUp(
        form.email.trim().toLowerCase(), 
        form.password, 
        form.name.trim(), 
        form.role, // User choice (passenger or driver)
        form.phone.trim() || undefined
      );
    } catch (err: any) {
      Alert.alert('Sign Up Failed', err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    form, 
    setForm,
    updateField, 
    isLoading, 
    isPasswordVisible, 
    setIsPasswordVisible, 
    handleSignUp 
  
  };
};