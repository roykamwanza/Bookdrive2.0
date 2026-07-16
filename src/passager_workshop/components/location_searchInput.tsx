import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors, radii, spacing, typography } from '../constants/theme';
import { searchLocations } from '../services/booking_service';
import type { PlaceResult } from '../types/booking';

interface LocationSearchInputProps {
  label: string;
  placeholder?: string;
  value: PlaceResult | null;
  onSelect: (place: PlaceResult) => void;
  dotColor?: string;
}

export function LocationSearchInput({
  label,
  placeholder = 'Search for a location',
  value,
  onSelect,
  dotColor = colors.primary,
}: LocationSearchInputProps) {
  const [query, setQuery] = useState(value?.title ?? '');
  const [results, setResults] = useState<PlaceResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setQuery(value?.title ?? '');
  }, [value]);

  function handleChangeText(text: string) {
    setQuery(text);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!text.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      const matches = await searchLocations(text);
      setResults(matches);
      setLoading(false);
    }, 300);
  }

  function handleSelect(place: PlaceResult) {
    setQuery(place.title);
    setResults([]);
    setFocused(false);
    onSelect(place);
  }

  const showDropdown = focused && (results.length > 0 || loading) && query.trim().length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <View style={[styles.dot, { backgroundColor: dotColor }]} />
        <View style={styles.inputBody}>
          <Text style={styles.label}>{label}</Text>
          <TextInput
            value={query}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
          />
        </View>
        {loading && <ActivityIndicator size="small" color={colors.primary} />}
      </View>

      {showDropdown && (
        <View style={styles.dropdown}>
          <FlatList
            scrollEnabled={false}
            data={results}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.resultRow} onPress={() => handleSelect(item)}>
                <Text style={styles.resultTitle}>{item.title}</Text>
                {item.subtitle ? <Text style={styles.resultSubtitle}>{item.subtitle}</Text> : null}
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              !loading ? <Text style={styles.emptyText}>No matches found</Text> : null
            }
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.surface,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.sm,
  },
  inputBody: {
    flex: 1,
    paddingVertical: spacing.xs,
  },
  label: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
  },
  input: {
    fontSize: typography.size.md,
    color: colors.textPrimary,
    paddingVertical: 2,
  },
  dropdown: {
    marginTop: spacing.xxs,
    backgroundColor: colors.surface,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.border,
    maxHeight: 220,
  },
  resultRow: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  resultTitle: {
    fontSize: typography.size.sm,
    color: colors.textPrimary,
    fontWeight: typography.weight.medium,
  },
  resultSubtitle: {
    fontSize: typography.size.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  emptyText: {
    padding: spacing.md,
    color: colors.textMuted,
    fontSize: typography.size.sm,
  },
});
