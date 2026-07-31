import React from 'react';
import { View, Text } from 'react-native';
import { homestyles } from '../styles/homestyles';
import { StatCardProps } from '../types/hometypes';

export const StatCard = ({ value, label, valueStyle }: StatCardProps) => (
  // We apply a specific "modern" stat container style
  <View style={homestyles.statCardModern}>
    <Text style={[homestyles.statValueLarge, valueStyle]}>{value}</Text>
    <Text style={homestyles.statLabelModern}>{label.toUpperCase()}</Text>
  </View>
);