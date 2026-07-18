import React from 'react';
import { useTranslation } from 'react-i18next';
import SignUpScreen from '../screens/signup/signupscreen';
import { usesignup } from './../hooks/usesignuphooks';
import { signupstrings } from './..//strings/loginstrings';

export default function SignUpContainer() {
  const { t } = useTranslation();
  const { form, setForm, isLoading, handleSignUp } = usesignup();
  const SignUpScreenComponent = SignUpScreen as React.ComponentType<any>;

  return (
    <SignUpScreenComponent
      form={form}
      setForm={setForm}
      isLoading={isLoading}
      handleSignUp={handleSignUp}
      nameLabel={t(signupstrings.namelabel)}
      buttonText={t(signupstrings.signupbutton)}
    />
  );
}