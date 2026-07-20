import React from 'react';
import { View } from 'react-native';
import { useAuth } from '../../context/authcontext';
import DriverProfileScreen from './driverprofilescreen';
import PassengerProfileScreen from './passengerprofilescreen';
import { profileScreenStyles as styles } from '../../styles/profile';

export default function ProfileScreen({ navigation, route }: any) {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      {user?.role === 'driver' ? (
        <DriverProfileScreen navigation={navigation} route={route} />
      ) : (
        <PassengerProfileScreen navigation={navigation} route={route} />
      )}
    </View>
  );
}