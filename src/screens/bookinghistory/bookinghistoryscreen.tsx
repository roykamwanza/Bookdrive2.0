import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from '../styles/bookinghistoryscreen.styles';

export default function BookingHistoryScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BookingHistory</Text>
      <Text style={styles.subtitle}>{t('common.appName')} — BookingHistory screen placeholder</Text>
    </View>
  );
}
