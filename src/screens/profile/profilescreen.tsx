import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';
import DriverProfileScreen from './driverprofilescreen';
import PassengerProfileScreen from './passengerprofilescreen';
import { useProfileScreen } from '../../hooks/profile/hooks';
import { profileScreenStyles as styles } from '../../styles/profile/styles';
import { LABEL_PASSENGER, LABEL_DRIVER } from '../../constants/profile/constants';

export default function ProfileScreen() {
  const { selectedRole, setSelectedRole, t } = useProfileScreen();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.selectorHeader}>
        <Text style={styles.selectorHeaderTitle}>{t('profile.title')}</Text>
        
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleTab, selectedRole === 'Passenger' && styles.activeToggleTab]}
            onPress={() => setSelectedRole('Passenger')}
          >
            <Ionicons 
              name="person" 
              size={15} 
              color={selectedRole === 'Passenger' ? colors.textInverse : colors.text} 
              style={{ marginRight: 6 }} 
            />
            <Text style={[styles.toggleText, selectedRole === 'Passenger' && styles.activeToggleText]}>
              {LABEL_PASSENGER}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleTab, selectedRole === 'Driver' && styles.activeToggleTab]}
            onPress={() => setSelectedRole('Driver')}
          >
            <Ionicons 
              name="car-sport" 
              size={15} 
              color={selectedRole === 'Driver' ? colors.textInverse : colors.text} 
              style={{ marginRight: 6 }} 
            />
            <Text style={[styles.toggleText, selectedRole === 'Driver' && styles.activeToggleText]}>
              {LABEL_DRIVER}
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.profileContent}>
        {selectedRole === 'Passenger' ? (
          <PassengerProfileScreen />
        ) : (
          <DriverProfileScreen />
        )}
      </View>
    </SafeAreaView>
  );
}
