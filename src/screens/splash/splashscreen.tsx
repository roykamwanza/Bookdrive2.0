import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useauth';
import { colors } from '../../constants/theme';
import styles from '../styles/splashscreen.styles';

export default function SplashScreen() {
  const { t } = useTranslation();
  const { login, signUp } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = async (role: 'passenger' | 'driver') => {
    setLoading(true);
    const demoEmail = `${role}@demo.com`;
    const demoPassword = 'password123';
    try {
      await login(demoEmail, demoPassword);
    } catch {
      try {
        const name = role === 'driver' ? 'Demo Driver' : 'Demo Passenger';
        await signUp(demoEmail, demoPassword, name, role);
      } catch (err) {
        console.error('Failed to login/signup demo user', err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Text style={styles.title}>{t('common.appName')}</Text>
        <Text style={styles.subtitle}>Minibus Booking System</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color={colors.secondary} style={styles.loader} />
      ) : (
        <View style={styles.selectionContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleDemoLogin('passenger')}>
            <Text style={styles.buttonText}>Passenger</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.driverButton]} onPress={() => handleDemoLogin('driver')}>
            <Text style={styles.buttonText}>Driver</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
