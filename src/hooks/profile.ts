import { useWindowDimensions } from 'react-native';
import { QuickAction, DriverProfileScreenProps, PassengerProfileScreenProps } from '../types/profile';
import { useAuth } from '../context/authcontext';
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
} from '../constants/profile';


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
    const { user, logout } = useAuth();
    const driver = {
        name: user?.name || SAMPLE_DRIVER_NAME,
        phone: user?.phone || SAMPLE_DRIVER_PHONE,
        email: user?.email || SAMPLE_DRIVER_EMAIL,
        rating: 4.8,
        totalTrips: 312,
        avatarUri: user?.avatarUrl || null,
        ...route?.params,
    };

    const onBack = () => navigation?.goBack?.();
    const onEdit = () => navigation?.navigate?.('EditProfile');
    const onLogout = async () => {
        try {
            await logout();
        } catch (e) {
            console.error('Logout error', e);
        }
    };

    return {
        driver,
        onBack,
        onEdit,
        onLogout,
    };
}

export function usePassengerProfileScreen({ navigation, route }: PassengerProfileScreenProps) {
    const { user, logout } = useAuth();
    const passenger = {
        name: user?.name || SAMPLE_PASSENGER_NAME,
        phone: user?.phone || SAMPLE_PASSENGER_PHONE,
        email: user?.email || SAMPLE_PASSENGER_EMAIL,
        rating: 4.9,
        totalTrips: 58,
        avatarUri: user?.avatarUrl || null,
        ...route?.params,
    };

    const onBack = () => navigation?.goBack?.();
    const onEdit = () => navigation?.navigate?.('EditProfile');
    const onLogout = async () => {
        try {
            await logout();
        } catch (e) {
            console.error('Logout error', e);
        }
    };

    return {
        passenger,
        onBack,
        onEdit,
        onLogout,
    };
}
