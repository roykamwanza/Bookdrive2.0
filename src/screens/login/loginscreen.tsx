import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
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
  const { form, setForm, isloading, ispasswordvisible, handlelogin } = uselogin();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.header}>
            <Ionicons name="car-sport" size={50} color={colors.secondary} />
            <Text style={styles.title}>{t('common.appName')}</Text>
            <Text style={styles.subtitle}>{loginstrings.subtitle}</Text>
          </View>

          <View style={styles.form}>
            <InputGroup 
              icon="mail-outline" 
              placeholder={t(loginstrings.emaillabel)}
              value={form.email}
              style={styles.inputContainer}
              textInputStyle={styles.inputText}
              onChangeText={(text: string) => setForm((prev: any) => ({ ...prev, email: text }))} 
            />
            <InputGroup 
              icon="lock-closed-outline" 
              placeholder={t(loginstrings.passwordlabel)}
              value={form.password} 
              style={styles.inputContainer}
              textInputStyle={styles.inputText}
              onChangeText={(text: string) => setForm((prev: any) => ({ ...prev, password: text }))} 
              secureTextEntry={!ispasswordvisible} 
            />
            
            <TouchableOpacity style={styles.button} onPress={handlelogin} disabled={isloading}>
              <Text style={styles.buttonText}>{t(loginstrings.loginbutton)}</Text>
            </TouchableOpacity>
          </View>

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