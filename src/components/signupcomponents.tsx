import React, { ReactNode } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/signupstyles'; 

interface InputGroupProps {
  label: string;
  children: ReactNode;
}

export const InputGroup = ({ label, children }: InputGroupProps) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {children}
      </View>
    </View>
  );
};