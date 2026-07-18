import React from 'react';
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { homestyles } from '../../styles/homestyles';
import { homeconstants } from '../../constants/homeconstants';
import { homestrings } from '../../strings/homestrings';
import { usehome } from '../../hooks/usehome';
import { StatCard } from '../../components/homecomponents';
import { colors } from '../../constants/theme';

export default function HomeScreen({ navigation }: any) {
  const { user, navigate, getDestination } = usehome(navigation);
  const isDriver = user?.role === 'driver';

  const gridItems = isDriver ? homeconstants.driverGridItems : homeconstants.passengerGridItems;
  const stats = homeconstants.getStats(isDriver);

  return (
    <SafeAreaView style={homestyles.container}>
      <ScrollView contentContainerStyle={homestyles.scroll}>
        
        {/* Stats Section */}
        <View style={homestyles.statsContainer}>
          <Text style={homestyles.sectiontitle}>
            {isDriver ? homestrings.dashboard.driver : homestrings.dashboard.passenger}
          </Text>
          <View style={homestyles.statsGrid}>
            {stats.map((stat, index) => (
              <StatCard 
                key={index}
                value={stat.value} 
                label={stat.label} 
                valueStyle={isDriver ? homestyles.statValueOrange : homestyles.statValueWhite} 
              />
            ))}
          </View>
        </View>

        {/* Grid Navigation Section */}
        <View style={homestyles.grid}>
          {gridItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={homestyles.card} 
              onPress={() => navigate(getDestination(item.id))}
            >
              {/* Removed item.color override to enforce branding */}
              <View style={homestyles.icon}>
                <Ionicons name={item.icon as any} size={24} color={colors.background} />
              </View>
              <Text style={homestyles.cardtitle}>
                {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}