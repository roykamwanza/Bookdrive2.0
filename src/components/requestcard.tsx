import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { colors } from '../constants/theme';
import { styles } from '../styles/requestcardstyles';
import { RequestCardProps } from '../types/driver';

// TODO(Dev1): swap the two TouchableOpacity buttons below for <CustomButton
// variant="primary" /> and <CustomButton variant="secondary" /> once the
// atomic UI library merges into src/components/.
export function RequestCard({ request, onAccept, onReject }: RequestCardProps) {
  const { t } = useTranslation();

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
              {request.distanceAwayKm} {t('driver.distanceUnitLabel', 'km away')}
            </Text>
          </View>
        </View>
        <View style={styles.fareBlock}>
          <Text style={styles.fareAmount}>
            {t('driver.currencySymbol', 'K')}{request.estimatedFare.toFixed(2)}
          </Text>
          <Text style={styles.fareLabel}>{t('driver.fareLabel', 'EST. FARE')}</Text>
        </View>
      </View>

      <View style={styles.actionRow}>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => onReject(request)}
          accessibilityLabel={t('driver.rejectAccessibility', 'Reject request from {{passengerName}}', { passengerName: request.passengerName })}
        >
          <Text style={styles.rejectText}>{t('driver.reject', 'Reject')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => onAccept(request)}
          accessibilityLabel={t('driver.acceptAccessibility', 'Accept request from {{passengerName}}', { passengerName: request.passengerName })}
        >
          <Text style={styles.acceptText}>{t('driver.accept', 'Accept')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
