import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from '../styles/tripstatusscreen.styles';

export default function TripStatusScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trip Status</Text>
      <Text style={styles.subtitle}>{t('common.appName')} — Trip Status screen placeholder</Text>
    </View>
  );
}
