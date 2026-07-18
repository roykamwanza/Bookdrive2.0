import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { uselogin } from '../../hooks/useloginhooks';
import { loginstrings } from '../../strings/loginstrings';
import { InputGroup } from '../../components/logincomponents';
import { loginstyles } from '../../styles/loginstyles';
import { colors } from '../../constants/theme';

export default function LoginScreen({ navigation }: any) {
  const { t } = useTranslation();
  const styles = loginstyles;
  const { form, setForm, isloading, ispasswordvisible, setispasswordvisible, handlelogin } = uselogin();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header Section */}
          <View style={styles.header}>
            {/* Cleaned up Icon Wrapper to prevent accidental layout breaks */}
            <View style={{ alignItems: 'center', marginBottom: 16 }}>
              <Ionicons name="car-sport" size={50} color={colors.secondary} />
            </View>
            <Text style={styles.title}>{t('common.appName')}</Text>
            <Text style={styles.subtitle}>{loginstrings.subtitle}</Text>
          </View>

          {/* Form Input Fields */}
          <View style={styles.form}>
            <InputGroup 
              label={t(loginstrings.emaillabel)} 
              icon="mail-outline" 
              value={form.email} 
              onChangeText={(text: string) => setForm({ ...form, email: text })} 
            />
            <InputGroup 
              label={t(loginstrings.passwordlabel)} 
              icon="lock-closed-outline" 
              value={form.password} 
              onChangeText={(text: string) => setForm({ ...form, password: text })} 
              secureTextEntry={!ispasswordvisible} 
            />
            
            {/* Login Action Button */}
            <TouchableOpacity style={styles.button} onPress={handlelogin} disabled={isloading}>
              {isloading ? (
                <ActivityIndicator color={colors.textInverse} />
              ) : (
                <Text style={styles.buttonText}>{t(loginstrings.loginbutton)}</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Registration Footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>{t(loginstrings.noaccount)} </Text>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.signUpLink}>{t(loginstrings.signuplink)}</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}