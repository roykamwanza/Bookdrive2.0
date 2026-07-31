import React from 'react';
import { SignUpScreen } from '../screens/signup/signupscreen';
import { usesignup } from './../hooks/usesignuphooks';

export const SignUpContainer = ({ navigation }: { navigation: any }) => {
  const { form, updateField, isLoading, handleSignUp } = usesignup();
  
  return (
    <SignUpScreen 
      form={form} 
      updateField={updateField} 
      isLoading={isLoading} 
      handleSignUp={handleSignUp} 
      navigation={navigation}
    />
  );
};