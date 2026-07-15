import React from 'react';
import { StatusBar, SafeAreaView, StyleSheet, FlatList, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constants/theme';
import { styles } from './styles'
import { useDriverRequests } from '../../hooks/driver-request/useDriverRequests';
import {
  DriverHeader,
  MapPreview,
  StatusSummary,
  RequestCard,
  EmptyRequestsState,
  TripStatusView,
} from '../../components/driver-request';
import type { RideRequest } from '../../types/driver-request/driver';

export default function DriverDashboardScreen() {
  const navigation = useNavigation();
  const { requests, status, currentStation, toggleStatus, acceptRequest, rejectRequest } =
    useDriverRequests();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.bg} />

      <DriverHeader onBack={() => navigation.goBack()} />
      <MapPreview />
      <StatusSummary
        currentStation={currentStation}
        status={status}
        onToggleStatus={toggleStatus}
      />

      <View style={styles.requestsHeader}>
        <Text style={styles.requestsTitle}>Incoming Requests</Text>
        {requests.length > 0 && (
          <View style={styles.countBadge}>
            <Text style={styles.countBadgeText}>{requests.length} new</Text>
          </View>
        )}
      </View>

      {requests.length === 0 ? (
        <EmptyRequestsState />
      ) : (
        <FlatList
          data={requests}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: RideRequest }) => {
            // If the request is pending, show the card
            if (item.status === 'pending') {
              return (
                <RequestCard
                  request={item} 
                  onAccept={acceptRequest} 
                  onReject={rejectRequest} 
                />
              );
            } 
    
             // If the request was accepted, show the status view instead
            if (item.status === 'accepted') {
              return (
                <TripStatusView 
                  status="en-route" 
                  message="Trip accepted! Proceeding to pickup." 
                />
              );
            }

            return null; // Don't render anything for 'declined'
          }}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
