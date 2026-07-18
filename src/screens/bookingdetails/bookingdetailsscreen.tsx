import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import styles from '../styles/bookingdetailsscreen.styles';

export default function BookingDetailsScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BookingDetails</Text>
      <Text style={styles.subtitle}>{t('common.appName')} — BookingDetails screen placeholder</Text>
    </View>
  );
}
