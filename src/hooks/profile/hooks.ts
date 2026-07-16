import { useState } from 'react';
import { useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { QuickAction, DriverProfileScreenProps, PassengerProfileScreenProps } from '../../types/profile/types';
import {
    SAMPLE_DRIVER_NAME,
    SAMPLE_DRIVER_PHONE,
    SAMPLE_DRIVER_EMAIL,
    SAMPLE_PASSENGER_NAME,
    SAMPLE_PASSENGER_PHONE,
    SAMPLE_PASSENGER_EMAIL,
    DEFAULT_ACTION_PAYMENT,
    DEFAULT_ACTION_PLACES,
    DEFAULT_ACTION_PRIVACY,
    DEFAULT_ACTION_LOGOUT
} from '../../constants/profile/constants';

export function useProfileScreen() {
    const { t } = useTranslation();
    const [selectedRole, setSelectedRole] = useState<'Passenger' | 'Driver'>('Passenger');

    return {
        selectedRole,
        setSelectedRole,
        t,
    };
}

export function useProfileLayout(onLogout?: () => void, quickActions?: QuickAction[]) {
    const { width } = useWindowDimensions();

    const avatarSize = Math.min(Math.max(width * 0.3, 96), 140);
    const isNarrow = width < 360;

    const actions: QuickAction[] = quickActions ?? [
        { icon: 'card-outline', label: DEFAULT_ACTION_PAYMENT },
        { icon: 'location-outline', label: DEFAULT_ACTION_PLACES },
        { icon: 'shield-checkmark-outline', label: DEFAULT_ACTION_PRIVACY },
        { icon: 'log-out-outline', label: DEFAULT_ACTION_LOGOUT, danger: true, onPress: onLogout },
    ];

    return {
        width,
        avatarSize,
        isNarrow,
        actions,
    };
}

export function useDriverProfileScreen({ navigation, route }: DriverProfileScreenProps) {
    const driver = {
        name: SAMPLE_DRIVER_NAME,
        phone: SAMPLE_DRIVER_PHONE,
        email: SAMPLE_DRIVER_EMAIL,
        rating: 4.8,
        totalTrips: 312,
        avatarUri: null,
        ...route?.params,
    };

    const onBack = () => navigation?.goBack?.();
    const onEdit = () => navigation?.navigate?.('EditDriverProfile');
    const onLogout = () => {
        // Wire up to your real auth sign-out logic
    };

    return {
        driver,
        onBack,
        onEdit,
        onLogout,
    };
}

export function usePassengerProfileScreen({ navigation, route }: PassengerProfileScreenProps) {
    const passenger = {
        name: SAMPLE_PASSENGER_NAME,
        phone: SAMPLE_PASSENGER_PHONE,
        email: SAMPLE_PASSENGER_EMAIL,
        rating: 4.9,
        totalTrips: 58,
        avatarUri: null,
        ...route?.params,
    };

    const onBack = () => navigation?.goBack?.();
    const onEdit = () => navigation?.navigate?.('EditPassengerProfile');
    const onLogout = () => {
        // Wire up to your real auth sign-out logic
    };

    return {
        passenger,
        onBack,
        onEdit,
        onLogout,
    };
}
