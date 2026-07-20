import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { colors, spacing, typography, radius } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/authcontext';

interface HomeScreenProps {
  navigation?: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { t } = useTranslation();
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Hello,</Text>
          <Text style={styles.nameText}>{user?.name || 'Guest User'}</Text>
        </View>
        <TouchableOpacity style={styles.profileBadge} onPress={() => navigation?.navigate('Profile')}>
          <Ionicons name="person-circle-outline" size={32} color={colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Banner Card */}
        <View style={styles.bannerCard}>
          <Text style={styles.bannerTitle}>{t('home.greeting')}</Text>
          <Text style={styles.bannerSubtitle}>Book rapid and safe minibus trips across town instantly.</Text>
          <TouchableOpacity style={styles.bannerBtn} onPress={() => navigation?.navigate('Booking')}>
            <Text style={styles.bannerBtnText}>{t('home.requestRide')}</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Navigation Grid */}
        <Text style={styles.sectionTitle}>Quick Access</Text>
        <View style={styles.grid}>
          {/* Profile Card */}
          <TouchableOpacity style={styles.gridCard} onPress={() => navigation?.navigate('Profile')}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(255, 107, 0, 0.1)' }]}>
              <Ionicons name="person" size={24} color={colors.secondary} />
            </View>
            <Text style={styles.gridCardTitle}>User Profile</Text>
            <Text style={styles.gridCardDesc}>View Driver & Passenger profiles</Text>
          </TouchableOpacity>

          {/* Driver Requests Card */}
          <TouchableOpacity style={styles.gridCard} onPress={() => navigation?.navigate('DriverRequests')}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(18, 18, 18, 0.05)' }]}>
              <Ionicons name="bus" size={24} color={colors.primary} />
            </View>
            <Text style={styles.gridCardTitle}>Driver Requests</Text>
            <Text style={styles.gridCardDesc}>View and accept rides</Text>
          </TouchableOpacity>

          {/* Booking History Card */}
          <TouchableOpacity style={styles.gridCard} onPress={() => navigation?.navigate('BookingHistory')}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(18, 18, 18, 0.05)' }]}>
              <Ionicons name="time" size={24} color={colors.primary} />
            </View>
            <Text style={styles.gridCardTitle}>Ride History</Text>
            <Text style={styles.gridCardDesc}>View previous bookings</Text>
          </TouchableOpacity>

          {/* Settings Card */}
          <TouchableOpacity style={styles.gridCard} onPress={() => navigation?.navigate('Settings')}>
            <View style={[styles.iconContainer, { backgroundColor: 'rgba(18, 18, 18, 0.05)' }]}>
              <Ionicons name="settings-sharp" size={24} color={colors.primary} />
            </View>
            <Text style={styles.gridCardTitle}>Settings</Text>
            <Text style={styles.gridCardDesc}>App language & preferences</Text>
          </TouchableOpacity>
        </View>

        {/* Logout at bottom */}
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color={colors.muted} style={{ marginRight: 6 }} />
          <Text style={styles.logoutBtnText}>Log Out of Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  welcomeText: {
    ...typography.caption,
    color: colors.muted,
  },
  nameText: {
    ...typography.h3,
    color: colors.primary,
    fontWeight: '700',
  },
  profileBadge: {
    padding: 4,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  bannerCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  bannerTitle: {
    ...typography.h2,
    color: colors.textInverse,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  bannerSubtitle: {
    ...typography.body,
    color: colors.muted,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  bannerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: spacing.md,
    borderRadius: radius.pill,
  },
  bannerBtnText: {
    ...typography.body,
    color: colors.textInverse,
    fontWeight: '700',
    marginRight: 6,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.primary,
    marginBottom: spacing.md,
    fontWeight: '600',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '48%',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  gridCardTitle: {
    ...typography.body,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 2,
  },
  gridCardDesc: {
    ...typography.caption,
    color: colors.muted,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.xl,
    paddingVertical: 12,
  },
  logoutBtnText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.muted,
  },
});
