import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';
import { styles } from '../../styles/driver-request/requestcardstyles';
import { RideRequest } from '../../types/driver-request/driver';
import { RequestCardProps } from '../../types/driver-request/driver';
import { requestCardString } from '../../constants/driver-request/strings';

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
            <Ionicons name="location-sharp" size={12} color={colors.muted} />
            <Text style={styles.distanceText}>
              {request.distanceAwayKm} {requestCardString.distanceUnitLabel}
            </Text>
          </View>
        </View>
        <View style={styles.fareBlock}>
          <Text style={styles.fareAmount}>
            {requestCardString.currencySymbol}{request.estimatedFare.toFixed(2)}
          </Text>
          <Text style={styles.fareLabel}>{requestCardString.fareLabel}</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => onReject(request)}
          accessibilityLabel={requestCardString.rejectAccessibilityLabel(request.passengerName)}
        >
          <Text style={styles.rejectText}>{requestCardString.rejectLabel}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => onAccept(request)}
          accessibilityLabel={requestCardString.acceptAccessibilityLabel(request.passengerName)}
        >
          <Text style={styles.acceptText}>{requestCardString.acceptLabel}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
