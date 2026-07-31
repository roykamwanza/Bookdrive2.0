import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, ActivityIndicator } from 'react-native';
import { styles } from '../../styles/signupstyles';
import { colors } from '../../constants/theme';
import { signupstrings } from '../../strings/signupstrings';
import { InputGroup } from '../../components/signupcomponents';

interface SignUpScreenProps {
  form: any;
  updateField: (field: string, value: string) => void;
  isLoading: boolean;
  handleSignUp: () => void;
  navigation?: any;
}

export const SignUpScreen = ({ form, updateField, isLoading, handleSignUp, navigation }: SignUpScreenProps) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
      <View style={styles.form}>
        {/* Header Title */}
        <View style={{ marginBottom: 10, marginTop: 20 }}>
          <Text style={{ fontSize: 32, fontWeight: '800', color: '#FFFFFF' }}>
            BOOK<Text style={{ color: colors.secondary }}>DRIVE</Text>
          </Text>
          <Text style={{ fontSize: 16, color: colors.muted, marginTop: 4 }}>
            {signupstrings.title}
          </Text>
        </View>

        {/* Input fields */}
        <InputGroup label={signupstrings.namelabel}>
          <TextInput 
            placeholder={signupstrings.placeholdername} 
            placeholderTextColor={colors.muted}
            value={form.name} 
            onChangeText={(t) => updateField('name', t)} 
            style={[styles.inputBox, { color: '#FFFFFF' }]} 
          />
        </InputGroup>

        <InputGroup label={signupstrings.emaillabel}>
          <TextInput 
            placeholder={signupstrings.placeholderemail} 
            placeholderTextColor={colors.muted}
            value={form.email} 
            onChangeText={(t) => updateField('email', t)} 
            keyboardType="email-address"
            autoCapitalize="none"
            style={[styles.inputBox, { color: '#FFFFFF' }]} 
          />
        </InputGroup>

        <InputGroup label={signupstrings.phonelabel}>
          <TextInput 
            placeholder={signupstrings.placeholderphone} 
            placeholderTextColor={colors.muted}
            value={form.phone} 
            onChangeText={(t) => updateField('phone', t)} 
            keyboardType="phone-pad" 
            style={[styles.inputBox, { color: '#FFFFFF' }]} 
          />
        </InputGroup>

        <InputGroup label={signupstrings.passwordlabel}>
          <TextInput 
            placeholder={signupstrings.placeholderpassword} 
            placeholderTextColor={colors.muted}
            value={form.password} 
            onChangeText={(t) => updateField('password', t)} 
            secureTextEntry 
            style={[styles.inputBox, { color: '#FFFFFF' }]} 
          />
        </InputGroup>

        <InputGroup label="Confirm Password">
          <TextInput 
            placeholder="Confirm your password" 
            placeholderTextColor={colors.muted}
            value={form.confirmPassword} 
            onChangeText={(t) => updateField('confirmPassword', t)} 
            secureTextEntry 
            style={[styles.inputBox, { color: '#FFFFFF' }]} 
          />
        </InputGroup>

        {/* Role Picker */}
        <InputGroup label={signupstrings.registeras}>
          <View style={styles.roleContainer}>
            <TouchableOpacity 
              onPress={() => updateField('role', 'passenger')}
              style={[
                styles.roleButton, 
                { 
                  backgroundColor: form.role === 'passenger' ? colors.secondary : colors.surface,
                  borderWidth: 1,
                  borderColor: form.role === 'passenger' ? colors.secondary : '#333333'
                }
              ]}
            >
              <Text style={{ color: form.role === 'passenger' ? '#FFFFFF' : colors.muted, fontWeight: '700' }}>
                Passenger
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              onPress={() => updateField('role', 'driver')}
              style={[
                styles.roleButton, 
                { 
                  backgroundColor: form.role === 'driver' ? colors.secondary : colors.surface,
                  borderWidth: 1,
                  borderColor: form.role === 'driver' ? colors.secondary : '#333333'
                }
              ]}
            >
              <Text style={{ color: form.role === 'driver' ? '#FFFFFF' : colors.muted, fontWeight: '700' }}>
                Driver
              </Text>
            </TouchableOpacity>
          </View>
        </InputGroup>

        {/* Submit */}
        <TouchableOpacity style={styles.button} onPress={handleSignUp} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator size="small" color={colors.textInverse} />
          ) : (
            <Text style={styles.buttonText}>{signupstrings.signupbutton}</Text>
          )}
        </TouchableOpacity>

        {/* Footer switch back */}
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15, marginBottom: 20 }}>
          <Text style={{ color: colors.muted }}>{signupstrings.haveaccount}</Text>
          <TouchableOpacity onPress={() => navigation?.navigate('Login')}>
            <Text style={{ color: colors.secondary, fontWeight: '700' }}>
              {signupstrings.login}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};