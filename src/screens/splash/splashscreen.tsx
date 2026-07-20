import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { splashstyles } from '../../styles/splashstyles';
import { splashconstants } from '../../constants/splashconstants';
import { splashstrings } from '../../strings/splashstrings';
import { usesplash } from '../../hooks/usesplashhooks';

export default function SplashScreen({ navigation }: any) {
  usesplash(navigation);

  return (
    <SafeAreaView style={splashstyles.container}>
      <View style={splashstyles.logoContainer}>
        <Ionicons name={splashconstants.logoName as any} size={80} color="#FFFFFF" />
      </View>
      <Text style={splashstyles.brandName}>{splashstrings.brandName}</Text>
    </SafeAreaView>
  );
}