import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/signupstyles'; 

export const InputGroup = ({ label, children }: any) => {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {/* Pure UI: renders whatever component is passed as a child */}
        {children}
      </View>
    </View>
  );
};