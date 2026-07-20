import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from '../styles/profilescreen.styles';

export default function ProfileScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>{t('common.appName')} — Profile screen placeholder</Text>
    </View>
  );
}
