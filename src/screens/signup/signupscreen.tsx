import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { styles } from '../../styles/signupstyles';
import { usesignup } from '../../hooks/usesignuphooks';
import { colors } from '../../constants/theme';

export default function SignUpScreen() {
  const { form, updateField, isLoading, handleSignUp } = usesignup();

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.form}>
        <TextInput 
          placeholder="Name" 
          placeholderTextColor={colors.muted}
          value={form.name} 
          onChangeText={(t) => updateField('name', t)} 
          style={styles.inputBox} 
        />
        <TextInput 
          placeholder="Email" 
          placeholderTextColor={colors.muted}
          value={form.email} 
          onChangeText={(t) => updateField('email', t)} 
          style={styles.inputBox} 
        />
        <TextInput 
          placeholder="Phone Number" 
          placeholderTextColor={colors.muted}
          value={form.phone} 
          onChangeText={(t) => updateField('phone', t)} 
          keyboardType="phone-pad" 
          style={styles.inputBox} 
        />
        <TextInput 
          placeholder="Password" 
          placeholderTextColor={colors.muted}
          value={form.password} 
          onChangeText={(t) => updateField('password', t)} 
          secureTextEntry 
          style={styles.inputBox} 
        />
        <TextInput 
          placeholder="Confirm Password" 
          placeholderTextColor={colors.muted}
          value={form.confirmPassword} 
          onChangeText={(t) => updateField('confirmPassword', t)} 
          secureTextEntry 
          style={styles.inputBox} 
        />

        <View style={styles.roleContainer}>
          <TouchableOpacity 
            onPress={() => updateField('role', 'passenger')}
            style={[styles.roleButton, { backgroundColor: form.role === 'passenger' ? colors.secondary : '#333' }]}
          >
            <Text style={{ color: 'white' }}>Passenger</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={() => updateField('role', 'driver')}
            style={[styles.roleButton, { backgroundColor: form.role === 'driver' ? colors.secondary : '#333' }]}
          >
            <Text style={{ color: 'white' }}>Driver</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>{isLoading ? "Loading..." : "Sign Up"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}