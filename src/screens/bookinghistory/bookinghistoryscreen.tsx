import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { colors, spacing, typography, radius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { BookingStatus } from '../../constants/app';
import { Booking } from '../../types';
import { TabType } from '../../hooks/usebookinghistory';

interface BookingHistoryScreenProps {
  bookings: Booking[];
  filteredBookings: Booking[];
  isLoading: boolean;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  getStatusColor: (status: BookingStatus) => { text: string; bg: string };
  formatDate: (isoString: string) => string;
  clearHistory: () => void;
  navigation: any;
}

export default function BookingHistoryScreen({
  filteredBookings,
  isLoading,
  activeTab,
  setActiveTab,
  getStatusColor,
  formatDate,
  clearHistory,
  navigation
}: BookingHistoryScreenProps) {

  const renderHistoryItem = ({ item }: { item: Booking }) => {
    const statusColors = getStatusColor(item.status);
    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation?.navigate('BookingDetails', { bookingId: item.id })}
      >
        <View style={styles.cardHeader}>
          <Text style={styles.cardDate}>{formatDate(item.requestedAt)}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusColors.bg }]}>
            <Text style={[styles.statusText, { color: statusColors.text }]}>
              {item.status.toUpperCase()}
            </Text>
          </View>
        </View>

        <View style={styles.routeContainer}>
          <View style={styles.routeIndicators}>
            <View style={styles.dotGreen} />
            <View style={styles.verticalLine} />
            <View style={styles.dotOrange} />
          </View>

          <View style={styles.routeLabels}>
            <Text style={styles.routeText} numberOfLines={1}>
              {item.pickup.label}
            </Text>
            <Text style={styles.routeText} numberOfLines={1}>
              {item.destination.label}
            </Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <View style={styles.serviceInfo}>
            <Ionicons name="bus-outline" size={16} color={colors.muted} style={{ marginRight: 6 }} />
            <Text style={styles.serviceText}>{item.rideType || 'Minibus Shuttle'}</Text>
          </View>
          <Text style={styles.fareText}>K{item.fare || 0}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ride History</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        {(['all', 'completed', 'cancelled'] as TabType[]).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {filteredBookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="calendar-outline" size={50} color={colors.border} style={{ marginBottom: spacing.md }} />
          <Text style={styles.emptyTitle}>No Trips Found</Text>
          <Text style={styles.emptySubtitle}>
            Trips you request will appear here with transit history.
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredBookings}
          keyExtractor={(item) => item.id}
          renderItem={renderHistoryItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            activeTab === 'all' ? (
              <TouchableOpacity style={styles.clearHistoryBtn} onPress={clearHistory}>
                <Ionicons name="trash-outline" size={16} color={colors.muted} style={{ marginRight: 6 }} />
                <Text style={styles.clearHistoryText}>Clear Trip History</Text>
              </TouchableOpacity>
            ) : null
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    ...typography.h2,
    color: colors.text,
    fontWeight: '700',
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
    borderRadius: radius.md,
    padding: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: radius.sm,
  },
  tabButtonActive: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.muted,
  },
  tabTextActive: {
    color: colors.secondary,
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  cardDate: {
    ...typography.caption,
    color: colors.muted,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
  },
  routeContainer: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  routeIndicators: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 20,
    marginRight: spacing.sm,
    paddingVertical: 4,
  },
  dotGreen: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#30D158',
  },
  verticalLine: {
    flex: 1,
    width: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  dotOrange: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
  },
  routeLabels: {
    flex: 1,
    justifyContent: 'space-between',
  },
  routeText: {
    ...typography.body,
    fontWeight: '600',
    color: colors.text,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
  serviceInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceText: {
    ...typography.caption,
    color: colors.muted,
    fontWeight: '600',
  },
  fareText: {
    ...typography.h3,
    fontWeight: '700',
    color: colors.text,
  },
  emptyContainer: {
    flex: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  emptyTitle: {
    ...typography.h3,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  emptySubtitle: {
    ...typography.body,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 20,
  },
  clearHistoryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    paddingVertical: spacing.md,
  },
  clearHistoryText: {
    ...typography.caption,
    color: colors.muted,
    fontWeight: '600',
  },
});
