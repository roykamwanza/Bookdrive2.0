import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { homestyles } from '../../styles/homestyles';
import { homeconstants } from '../../constants/homeconstants';
import { homestrings } from '../../strings/homestrings';
import { usehome } from '../../hooks/usehome';
import { StatCard } from '../../components/homecomponents';
import { colors, spacing, radius, typography } from '../../constants/theme';
import { useBookings } from '../../context/bookingcontext';
import { BOOKING_STATUS } from '../../constants/app';

export default function HomeScreen({ navigation }: any) {
  const { user, navigate, logout } = usehome(navigation);
  const { activeBooking } = useBookings();
  const isDriver = user?.role === 'driver';

  const gridItems = isDriver ? homeconstants.driverGridItems : homeconstants.passengerGridItems;
  const stats = homeconstants.getStats(isDriver);

  // Animation for the pulsing dot in active ride tracker
  const pulseAnim = React.useRef(new Animated.Value(0.4)).current;

  React.useEffect(() => {
    if (activeBooking) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0.4,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(0.4);
    }
  }, [activeBooking]);

  const getStatusText = () => {
    if (!activeBooking) return '';
    switch (activeBooking.status) {
      case BOOKING_STATUS.PENDING:
        return 'Searching for nearby drivers...';
      case BOOKING_STATUS.ACCEPTED:
        return `${activeBooking.driverName || 'Driver'} is on the way to pick you up`;
      case BOOKING_STATUS.IN_PROGRESS:
        return 'Trip in progress — heading to destination';
      default:
        return 'Trip active';
    }
  };

  const getStatusIcon = () => {
    if (!activeBooking) return 'bus-outline';
    switch (activeBooking.status) {
      case BOOKING_STATUS.PENDING:
        return 'search-outline';
      case BOOKING_STATUS.ACCEPTED:
        return 'car-outline';
      case BOOKING_STATUS.IN_PROGRESS:
        return 'navigate-outline';
      default:
        return 'bus-outline';
    }
  };

  const getGridItemDetails = (id: string) => {
    switch (id) {
      case 'booking':
        return {
          title: 'Request Ride',
          subtitle: 'Book standard or express shuttle',
          screen: 'Booking',
          backgroundColor: 'rgba(255, 107, 0, 0.1)',
        };
      case 'history':
        return {
          title: 'Ride History',
          subtitle: 'View previous bookings',
          screen: 'History',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        };
      case 'profile':
        return {
          title: 'User Profile',
          subtitle: 'View and edit profile',
          screen: 'Profile',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        };
      case 'settings':
        return {
          title: 'Settings',
          subtitle: 'App preferences & language',
          screen: 'Settings',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        };
      case 'requests':
        return {
          title: 'Driver Requests',
          subtitle: 'View and accept incoming rides',
          screen: 'DriverRequests',
          backgroundColor: 'rgba(255, 107, 0, 0.1)',
        };
      default:
        return {
          title: 'Access',
          subtitle: 'App workspace module',
          screen: 'Profile',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        };
    }
  };

  return (
    <SafeAreaView style={homestyles.container}>
      <ScrollView contentContainerStyle={homestyles.scroll} showsVerticalScrollIndicator={false}>
        
        {/* Brand Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 15, borderBottomWidth: 1, borderBottomColor: colors.border }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: '900', color: '#FFFFFF', letterSpacing: 0.5 }}>
              BOOK<Text style={{ color: colors.secondary }}>DRIVE</Text>
            </Text>
            <View style={{ backgroundColor: '#2C2C2E', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, marginLeft: 8 }}>
              <Text style={{ fontSize: 8, fontWeight: '700', color: colors.muted }}>{user?.role?.toUpperCase() || 'PASSENGER'}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigate('Profile')}>
            <Ionicons name="person-circle-outline" size={32} color={colors.secondary} />
          </TouchableOpacity>
        </View>

        {/* Personalized Welcome Header */}
        <View style={[homestyles.header, { borderBottomWidth: 0, marginTop: 15 }]}>
          <View>
            <Text style={homestyles.welcomeText}>Hello,</Text>
            <Text style={homestyles.nameText}>{user?.name || 'User'}</Text>
          </View>
        </View>

        {/* Dynamic Active Booking Card */}
        {!isDriver && activeBooking && (
          <TouchableOpacity 
            style={styles.activeBookingCard} 
            onPress={() => {
              navigation?.navigate('History', {
                screen: 'BookingDetails',
                params: { bookingId: activeBooking.id }
              });
            }}
          >
            <View style={styles.activeCardHeader}>
              <View style={styles.statusBadgeRow}>
                <Animated.View style={[styles.pulseDot, { opacity: pulseAnim }]} />
                <Text style={styles.activeCardStatus}>
                  {activeBooking.status.toUpperCase()}
                </Text>
              </View>
              <Text style={styles.activeCardEst}>K{activeBooking.fare}</Text>
            </View>

            <Text style={styles.activeCardMsg}>{getStatusText()}</Text>

            <View style={styles.tripSummaryRow}>
              <View style={styles.tripIconCol}>
                <Ionicons name={getStatusIcon()} size={24} color={colors.secondary} />
              </View>
              <View style={styles.tripDetailsCol}>
                <Text style={styles.tripRouteText} numberOfLines={1}>
                  {activeBooking.pickup.label}
                </Text>
                <Ionicons name="arrow-down" size={12} color={colors.muted} style={{ marginVertical: 2 }} />
                <Text style={styles.tripRouteText} numberOfLines={1}>
                  {activeBooking.destination.label}
                </Text>
              </View>
            </View>

            {activeBooking.driverName && (
              <View style={styles.driverQuickInfo}>
                <View style={styles.driverInitial}>
                  <Text style={styles.driverInitialText}>
                    {activeBooking.driverName.charAt(0)}
                  </Text>
                </View>
                <View style={{ flex: 1, marginLeft: spacing.sm }}>
                  <Text style={styles.driverNameText}>{activeBooking.driverName}</Text>
                  <Text style={styles.vehicleText}>{activeBooking.vehicleModel} • {activeBooking.vehiclePlate}</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.secondary} />
              </View>
            )}

            <View style={styles.activeCardFooter}>
              <Text style={styles.activeTrackText}>TAP TO TRACK LIVE TRIP</Text>
              <Ionicons name="arrow-forward" size={14} color={colors.secondary} />
            </View>
          </TouchableOpacity>
        )}

        {/* Action Banner (Request a Ride) */}
        {!isDriver && !activeBooking && (
          <View style={homestyles.bannerCard}>
            <Text style={homestyles.bannerTitle}>Where are you headed?</Text>
            <Text style={homestyles.bannerSubtitle}>
              Book rapid and safe minibus trips across town instantly.
            </Text>
            <TouchableOpacity style={homestyles.bannerBtn} onPress={() => navigate('Booking')}>
              <Text style={homestyles.bannerBtnText}>Request a Ride</Text>
              <Ionicons name="arrow-forward" size={16} color={colors.textInverse} />
            </TouchableOpacity>
          </View>
        )}

        {/* Stats Section */}
        <View style={homestyles.statsContainer}>
          <Text style={homestyles.sectiontitle}>
            {isDriver ? homestrings.dashboard.driver : homestrings.dashboard.passenger}
          </Text>
          <View style={homestyles.statsGrid}>
            {stats.map((stat, i) => (
              <StatCard key={i} label={stat.label} value={stat.value} />
            ))}
          </View>
        </View>

        {/* Navigation Grid */}
        <Text style={homestyles.sectiontitle}>Quick Access</Text>
        <View style={homestyles.grid}>
          {gridItems.map((item, idx) => {
            const details = getGridItemDetails(item.id);
            return (
              <TouchableOpacity 
                key={idx} 
                style={homestyles.card} 
                onPress={() => navigate(details.screen)}
              >
                <View style={[homestyles.icon, { backgroundColor: details.backgroundColor }]}>
                  <Ionicons 
                    name={item.icon as any} 
                    size={24} 
                    color={item.id === 'booking' || item.id === 'requests' ? colors.secondary : colors.text} 
                  />
                </View>
                <Text style={homestyles.cardtitle}>{details.title}</Text>
                <Text style={{ ...typography.caption, color: colors.muted, marginTop: 4 }}>
                  {details.subtitle}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Logout */}
        <TouchableOpacity style={homestyles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color={colors.muted} style={{ marginRight: 6 }} />
          <Text style={homestyles.logoutBtnText}>Log Out of Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  activeBookingCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1.5,
    borderColor: colors.secondary,
  },
  activeCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statusBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 0, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radius.sm,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.secondary,
    marginRight: 6,
  },
  activeCardStatus: {
    ...typography.caption,
    fontWeight: '700',
    color: colors.secondary,
  },
  activeCardEst: {
    ...typography.caption,
    color: colors.muted,
    fontWeight: '600',
  },
  activeCardMsg: {
    ...typography.h3,
    color: colors.text,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  tripSummaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: radius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tripIconCol: {
    marginRight: spacing.md,
  },
  tripDetailsCol: {
    flex: 1,
  },
  tripRouteText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  driverQuickInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    marginBottom: spacing.sm,
  },
  driverInitial: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  driverInitialText: {
    ...typography.body,
    color: colors.secondary,
    fontWeight: '700',
  },
  driverNameText: {
    ...typography.body,
    color: colors.text,
    fontWeight: '600',
  },
  vehicleText: {
    color: colors.muted,
    ...typography.caption,
  },
  activeCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: spacing.xs,
  },
  activeTrackText: {
    ...typography.caption,
    color: colors.secondary,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});