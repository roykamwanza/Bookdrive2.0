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
  const { user, navigate, getDestination, logout } = usehome(navigation);
  const isDriver = user?.role === 'driver';

  const gridItems = isDriver ? homeconstants.driverGridItems : homeconstants.passengerGridItems;
  const stats = homeconstants.getStats(isDriver);

  return (
    <SafeAreaView style={homestyles.container}>
      <ScrollView contentContainerStyle={homestyles.scroll}>
        
        {/* Personalized Welcome Header */}
        <View style={homestyles.header}>
          <View>
            <Text style={homestyles.welcomeText}>Hello,</Text>
            <Text style={homestyles.nameText}>{user?.name || 'User'}</Text>
          </View>
          <TouchableOpacity style={homestyles.profileBadge}>
            <Ionicons name="person-circle-outline" size={40} color={colors.secondary} />
          </TouchableOpacity>
        </View>

        {/* Action Banner (Request a Ride) */}
        {!isDriver && (
          <View style={homestyles.bannerCard}>
            <Text style={homestyles.bannerTitle}>Where are you headed?</Text>
            <Text style={homestyles.bannerSubtitle}>
              Book rapid and safe minibus trips across town instantly.
            </Text>
            <TouchableOpacity style={homestyles.bannerBtn} onPress={() => navigate('RideBooking')}>
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
              <View style={homestyles.icon}>
                <Ionicons name={item.icon as any} size={24} color={colors.background} />
              </View>
              <Text style={homestyles.cardtitle}>
                {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Logout at bottom */}
        <TouchableOpacity style={homestyles.logoutBtn} onPress={logout}>
          <Ionicons name="log-out-outline" size={18} color={colors.muted} style={{ marginRight: 6 }} />
          <Text style={homestyles.logoutBtnText}>Log Out of Account</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}