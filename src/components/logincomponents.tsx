import React from 'react';
import { View, TextInput, ViewStyle, TextStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../constants/theme';

interface InputGroupProps {
  icon: string;
  value: string;
  placeholder: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  style?: ViewStyle;
  textInputStyle?: TextStyle;
}

export const InputGroup = ({ icon, value, placeholder, onChangeText, secureTextEntry, style, textInputStyle, ...props }: InputGroupProps) => (
  <View style={style}>
    <Ionicons name={icon as any} size={20} color={colors.muted} />
    <TextInput 
      {...props}
      value={value}
      placeholder={placeholder}
      placeholderTextColor={colors.muted}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={textInputStyle}
    />
  </View>
);