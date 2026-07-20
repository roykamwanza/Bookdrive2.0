import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/authcontext';
import { colors, spacing, typography, radius } from '../../constants/theme';
import { UserRole } from '../../constants/app';

export default function EditProfileScreen({ navigation }: any) {
  const { user, updateUser } = useAuth();
  
  const [name, setName] = useState(user?.name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [role, setRole] = useState<UserRole>(user?.role || 'passenger');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Error', 'Name is required');
      return;
    }
    
    setIsSaving(true);
    try {
      await updateUser(name.trim(), role, phone.trim());
      Alert.alert('Success', 'Profile updated successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (err) {
      Alert.alert('Error', err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={10}>
            <Ionicons name="close" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={handleSave} disabled={isSaving} hitSlop={10}>
            {isSaving ? (
              <ActivityIndicator size="small" color={colors.secondary} />
            ) : (
              <Text style={styles.saveBtnText}>Save</Text>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          {/* Avatar Icon */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={50} color={colors.muted} />
            </View>
            <Text style={styles.avatarLabel}>{user?.email}</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={colors.muted}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                value={phone}
                onChangeText={setPhone}
                placeholder="Enter phone number"
                placeholderTextColor={colors.muted}
                keyboardType="phone-pad"
              />
            </View>

            {/* Role Switcher */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Account Role</Text>
              <View style={styles.roleContainer}>
                <TouchableOpacity
                  style={[
                    styles.roleOption,
                    role === 'passenger' && styles.roleOptionActive,
                  ]}
                  onPress={() => setRole('passenger')}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="person-outline"
                    size={18}
                    color={role === 'passenger' ? colors.textInverse : colors.muted}
                  />
                  <Text
                    style={[
                      styles.roleText,
                      role === 'passenger' && styles.roleTextActive,
                    ]}
                  >
                    Passenger
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.roleOption,
                    role === 'driver' && styles.roleOptionActive,
                  ]}
                  onPress={() => setRole('driver')}
                  activeOpacity={0.8}
                >
                  <Ionicons
                    name="car-sport-outline"
                    size={18}
                    color={role === 'driver' ? colors.textInverse : colors.muted}
                  />
                  <Text
                    style={[
                      styles.roleText,
                      role === 'driver' && styles.roleTextActive,
                    ]}
                  >
                    Driver
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>

        {/* Footer Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.submitBtn}
            onPress={handleSave}
            disabled={isSaving}
            activeOpacity={0.85}
          >
            {isSaving ? (
              <ActivityIndicator color={colors.textInverse} />
            ) : (
              <Text style={styles.submitBtnText}>Save Profile</Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
  },
  saveBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  avatarContainer: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.border,
  },
  avatarLabel: {
    marginTop: spacing.sm,
    fontSize: 14,
    color: colors.muted,
  },
  form: {
    gap: spacing.md,
  },
  inputGroup: {
    gap: spacing.xs,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.muted,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    fontSize: 16,
    color: colors.text,
  },
  roleContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    padding: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border,
    gap: spacing.xs,
  },
  roleOption: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: radius.sm,
    gap: spacing.sm,
  },
  roleOptionActive: {
    backgroundColor: colors.secondary,
  },
  roleText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.muted,
  },
  roleTextActive: {
    color: colors.textInverse,
  },
  footer: {
    padding: spacing.lg,
  },
  submitBtn: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    borderRadius: radius.md,
    alignItems: 'center',
  },
  submitBtnText: {
    color: colors.textInverse,
    fontSize: 16,
    fontWeight: '700',
  },
});
