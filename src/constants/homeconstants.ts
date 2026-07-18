import { homestrings } from '../strings/homestrings';

export const homeconstants = {
  passengerGridItems: [
    { id: 'booking', icon: 'car-sport' },
    { id: 'history', icon: 'time' },
    { id: 'profile', icon: 'person' },
    { id: 'settings', icon: 'settings-sharp' },
  ],
  driverGridItems: [
    { id: 'requests', icon: 'bus' },
    { id: 'history', icon: 'time' },
    { id: 'profile', icon: 'person' },
    { id: 'settings', icon: 'settings-sharp' },
  ],

  getStats: (isDriver: boolean) => isDriver ? [
    { value: '$145.00', label: homestrings.stats.today },
    { value: '312', label: homestrings.stats.trips },
    { value: '4.8 ★', label: homestrings.stats.rating },
  ] : [
    { value: '4', label: homestrings.stats.active },
    { value: '12', label: homestrings.stats.past },
  ]
}