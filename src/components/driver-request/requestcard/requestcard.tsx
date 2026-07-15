import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../../constants/theme';
import { styles } from './requestcard.styles';
import { RideRequest } from '../../../types/driver-request/driver';
import { RequestCardProps } from '../../../types/driver-request/driver';



// TODO(Dev1): swap the two TouchableOpacity buttons below for <CustomButton
// variant="primary" /> and <CustomButton variant="secondary" /> once the
// atomic UI library merges into src/components/.
export function RequestCard({ request, onAccept, onReject }: RequestCardProps) {
  return (
    <View style={styles.requestCard}>
      <View style={styles.requestHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{request.initials}</Text>
        </View>
        <View style={styles.requestInfo}>
          <Text style={styles.passengerName}>{request.passengerName}</Text>
          <View style={styles.distanceRow}>
            <Ionicons name="location-sharp" size={12} color={colors.textSecondary} />
            <Text style={styles.distanceText}>{request.distanceAwayKm} km away</Text>
          </View>
        </View>
        <View style={styles.fareBlock}>
          <Text style={styles.fareAmount}>K{request.estimatedFare.toFixed(2)}</Text>
          <Text style={styles.fareLabel}>EST. FARE</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => onReject(request)}
          accessibilityLabel={`Reject request from ${request.passengerName}`}
        >
          <Text style={styles.rejectText}>Reject</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => onAccept(request)}
          accessibilityLabel={`Accept request from ${request.passengerName}`}
        >
          <Text style={styles.acceptText}>Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}