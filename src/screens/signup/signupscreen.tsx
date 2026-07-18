import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { InputGroup } from '../../components/signupcomponents';
import { styles } from '../../styles/signupstyles';
import { usesignup } from '../../hooks/usesignuphooks';

export default function SignUpScreen() {
  const { form, updateField, isLoading, handleSignUp } = usesignup();

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.form}>
        <InputGroup label="Name">
          <TextInput value={form.name} onChangeText={(t) => updateField('name', t)} />
        </InputGroup>

        <InputGroup label="Email">
          <TextInput value={form.email} onChangeText={(t) => updateField('email', t)} />
        </InputGroup>

        <InputGroup label="Phone Number">
          <TextInput value={form.phone} onChangeText={(t) => updateField('phone', t)} keyboardType="phone-pad" />
        </InputGroup>

        <InputGroup label="Password">
          <TextInput value={form.password} onChangeText={(t) => updateField('password', t)} secureTextEntry />
        </InputGroup>

        <InputGroup label="Confirm Password">
          <TextInput value={form.confirmPassword} onChangeText={(t) => updateField('confirmPassword', t)} secureTextEntry />
        </InputGroup>

        <InputGroup label="Select Role">
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <TouchableOpacity 
              onPress={() => updateField('role', 'passenger')}
              style={{ flex: 1, padding: 15, backgroundColor: form.role === 'passenger' ? '#ff8c00' : '#333', borderRadius: 5, alignItems: 'center', marginRight: 5 }}
            >
              <Text style={{ color: 'white' }}>Passenger</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => updateField('role', 'driver')}
              style={{ flex: 1, padding: 15, backgroundColor: form.role === 'driver' ? '#ff8c00' : '#333', borderRadius: 5, alignItems: 'center', marginLeft: 5 }}
            >
              <Text style={{ color: 'white' }}>Driver</Text>
            </TouchableOpacity>
          </View>
        </InputGroup>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text>{isLoading ? "Loading..." : "Sign Up"}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}