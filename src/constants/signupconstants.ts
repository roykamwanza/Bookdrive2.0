import { signupformstate } from '../types/signuptypes';

export const initialformstate: signupformstate = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: 'passenger', // Initialized with the default value
};

export const defaultrole = 'passenger';