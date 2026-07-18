export interface signupformstate {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  role: 'passenger' | 'driver'; // Add this line
}