import React from 'react';
import { StatusBar, SafeAreaView, FlatList, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { colors } from '../../constants/theme';
import { DRIVER_REQUEST_STRINGS } from '../../constants/strings'
import { styles } from '../../styles/driverequestscreenstyles'
import { useDriverRequests } from '../../hooks/usedriverequests';
import {
  DriverHeader,
  MapPreview,
  StatusSummary,
  RequestListItem,
  EmptyRequestsState,
} from '../../components';
import type { RideRequest } from '../../types/driver';

export default function DriverDashboardScreen() {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const {
    requests,
    status,
    currentStation,
    toggleStatus,
    acceptRequest,
    rejectRequest,
    completeRequest,
    advanceTripStage,
  } = useDriverRequests();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      <DriverHeader onBack={() => navigation.goBack()} />
      <MapPreview />
      <StatusSummary
        currentStation={currentStation}
        status={status}
        onToggleStatus={toggleStatus}
      />

      <View style={styles.requestsHeader}>
        <Text style={styles.requestsTitle}>
          {t('driver.incomingRequests', DRIVER_REQUEST_STRINGS.incomingRequests)}
        </Text>
        {requests.length > 0 && (
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>
              {t('driver.newCount', DRIVER_REQUEST_STRINGS.newCount, {
                count: requests.length,
              })}
            </Text>
          </View>
        )}
      </View>

      {requests.length === 0 ? (
        <EmptyRequestsState />
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: RideRequest }) => (
            <RequestListItem
              request={item}
              onAccept={acceptRequest}
              onReject={rejectRequest}
              onDone={completeRequest}
              onAdvance={advanceTripStage}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
