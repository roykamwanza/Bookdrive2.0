import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useauth';
import styles from '../styles/profilescreen.styles';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { user, switchRole } = useAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>
        Mode: <Text style={{ fontWeight: 'bold', color: '#FF6B00' }}>{user?.role === 'driver' ? 'Driver' : 'Passenger'}</Text>
      </Text>

      <TouchableOpacity style={styles.button} onPress={switchRole}>
        <Text style={styles.buttonText}>
          Switch to {user?.role === 'passenger' ? 'Driver' : 'Passenger'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
