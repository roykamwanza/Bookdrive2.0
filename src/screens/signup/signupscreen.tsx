import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { styles } from '../../styles/signupstyles';
import { colors } from '../../constants/theme';
import { signupstrings } from '../../strings/signupstrings';
import { InputGroup } from '../../components/signupcomponents';

interface SignUpScreenProps {
  form: any; // Ideally replace 'any' with your form interface
  updateField: (field: string, value: string) => void;
  isLoading: boolean;
  handleSignUp: () => void;
}

export const SignUpScreen = ({ form, updateField, isLoading, handleSignUp }: SignUpScreenProps) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.form}>
        
        <InputGroup label={signupstrings.namelabel}>
          <TextInput 
            placeholder={signupstrings.placeholdername} 
            placeholderTextColor={colors.muted}
            value={form.name} 
            onChangeText={(t) => updateField('name', t)} 
            style={styles.inputBox} 
          />
        </InputGroup>

        <InputGroup label={signupstrings.emaillabel}>
          <TextInput 
            placeholder={signupstrings.placeholderemail} 
            placeholderTextColor={colors.muted}
            value={form.email} 
            onChangeText={(t) => updateField('email', t)} 
            style={styles.inputBox} 
          />
        </InputGroup>

        <InputGroup label={signupstrings.phonelabel}>
          <TextInput 
            placeholder={signupstrings.placeholderphone} 
            placeholderTextColor={colors.muted}
            value={form.phone} 
            onChangeText={(t) => updateField('phone', t)} 
            keyboardType="phone-pad" 
            style={styles.inputBox} 
          />
        </InputGroup>

        <InputGroup label={signupstrings.passwordlabel}>
          <TextInput 
            placeholder={signupstrings.placeholderpassword} 
            placeholderTextColor={colors.muted}
            value={form.password} 
            onChangeText={(t) => updateField('password', t)} 
            secureTextEntry 
            style={styles.inputBox} 
          />
        </InputGroup>

        {/* ... Repeat InputGroup for Confirm Password ... */}

        {/* Role Container Logic ... */}

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>{isLoading ? "Loading..." : signupstrings.signupbutton}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};