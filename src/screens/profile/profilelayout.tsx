import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../constants/theme';
import { ProfileLayoutProps } from '../../types/profile';
import { useProfileLayout } from '../../hooks/profile';
import { profileLayoutStyles as styles } from '../../styles/profile';
import {
  SECTION_TITLE_ACCOUNT_SETTINGS,
  BUTTON_TEXT_EDIT_PROFILE,
  STAT_LABEL_TOTAL_TRIPS,
  STAT_LABEL_RATING,
} from '../../constants/profile';

export default function ProfileLayout({
  role,
  badgeIcon,
  name,
  phone,
  email,
  rating,
  totalTrips,
  tripsLabel,
  avatarUri,
  onBack,
  onEdit,
  onLogout,
  quickActions,
}: ProfileLayoutProps) {
  const { avatarSize, isNarrow, actions } = useProfileLayout(onLogout, quickActions);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />

      {/* Top App Bar */}
      <View style={[styles.header, { paddingHorizontal: isNarrow ? 12 : 16 }]}>
        <TouchableOpacity onPress={onBack} hitSlop={10}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{role} Profile</Text>
        <TouchableOpacity onPress={onEdit} hitSlop={10}>
          <Ionicons name="create-outline" size={22} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 32, flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Hero */}
        <View style={[styles.hero, { paddingHorizontal: isNarrow ? 12 : 16 }]}>
          <View style={{ width: avatarSize, height: avatarSize }}>
            {avatarUri ? (
              <Image
                source={{ uri: avatarUri }}
                style={[
                  styles.avatar,
                  { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 },
                ]}
              />
            ) : (
              <View
                style={[
                  styles.avatarPlaceholder,
                  { width: avatarSize, height: avatarSize, borderRadius: avatarSize / 2 },
                ]}
              >
                <Ionicons name="person" size={avatarSize * 0.5} color={colors.muted} />
              </View>
            )}
            <TouchableOpacity style={styles.avatarEditBtn} activeOpacity={0.85} onPress={onEdit}>
              <Ionicons name="camera" size={16} color={colors.textInverse} />
            </TouchableOpacity>
          </View>

          <Text style={styles.name} numberOfLines={1} adjustsFontSizeToFit>
            {name}
          </Text>

          <View style={styles.roleBadge}>
            <Ionicons name={badgeIcon} size={13} color={colors.textInverse} />
            <Text style={styles.roleBadgeText}>{role}</Text>
          </View>

          <View style={[styles.contactBlock, { maxWidth: 420 }]}>
            {email ? (
              <View style={styles.contactRow}>
                <Ionicons name="mail-outline" size={18} color={colors.muted} />
                <Text style={styles.contactText} numberOfLines={1}>
                  {email}
                </Text>
              </View>
            ) : null}
            <View style={styles.contactRow}>
              <Ionicons name="call-outline" size={18} color={colors.muted} />
              <Text style={styles.contactText}>{phone}</Text>
            </View>
          </View>
        </View>

        {/* Stats Bento Grid */}
        <View style={[styles.statsGrid, { paddingHorizontal: isNarrow ? 12 : 16 }]}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>{tripsLabel || STAT_LABEL_TOTAL_TRIPS}</Text>
            <Text style={styles.statValueOrange}>{totalTrips}</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>{STAT_LABEL_RATING}</Text>
            <View style={styles.ratingRow}>
              <Text style={styles.statValueWhite}>{rating.toFixed(1)}</Text>
              <Ionicons name="star" size={20} color={colors.secondary} />
            </View>
          </View>
        </View>

        {/* Quick Actions List */}
        <View style={[styles.section, { paddingHorizontal: isNarrow ? 12 : 16 }]}>
          <Text style={styles.sectionTitle}>{SECTION_TITLE_ACCOUNT_SETTINGS}</Text>
          <View style={styles.actionsList}>
            {actions.map((action, index) => (
              <TouchableOpacity
                key={action.label}
                style={[
                  styles.actionRow,
                  index === actions.length - 1 && { borderBottomWidth: 0 },
                ]}
                activeOpacity={0.7}
                onPress={action.onPress}
              >
                <View style={styles.actionRowLeft}>
                  <Ionicons
                    name={action.icon}
                    size={20}
                    color={action.danger ? colors.error : colors.muted}
                  />
                  <Text
                    style={[
                      styles.actionRowLabel,
                      action.danger && { color: colors.error },
                    ]}
                  >
                    {action.label}
                  </Text>
                </View>
                {!action.danger && (
                  <Ionicons name="chevron-forward" size={20} color={colors.muted} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Edit Profile Button */}
        <View style={{ paddingHorizontal: isNarrow ? 12 : 16, marginTop: 8 }}>
          <TouchableOpacity style={styles.editButton} activeOpacity={0.85} onPress={onEdit}>
            <Text style={styles.editButtonText}>{BUTTON_TEXT_EDIT_PROFILE}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
