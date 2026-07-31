import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export interface QuickAction {
    icon: React.ComponentProps<typeof Ionicons>['name'];
    label: string;
    danger?: boolean;
    onPress?: () => void;
}

export interface ProfileLayoutProps {
    role: 'Driver' | 'Passenger';
    badgeIcon: React.ComponentProps<typeof Ionicons>['name'];
    name: string;
    phone: string;
    email?: string;
    rating: number;
    totalTrips: number;
    tripsLabel?: string;
    avatarUri?: string | null;
    onBack?: () => void;
    onEdit?: () => void;
    onLogout?: () => void;
    quickActions?: QuickAction[];
}

export interface DriverProfileScreenProps {
    navigation?: any;
    route?: any;
}

export interface PassengerProfileScreenProps {
    navigation?: any;
    route?: any;
}
