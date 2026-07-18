import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from '../styles/signupscreen.styles';

export default function SignUpScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SignUp</Text>
      <Text style={styles.subtitle}>{t('common.appName')} — SignUp screen placeholder</Text>
    </View>
  );
}

