import i18next from 'i18next';

export const homestrings = {
  header: { hello: 'Hello,', guest: 'Guest User' },
  banner: { 
    get title() { return i18next.t('home.greeting'); }, 
    subtitle: 'Book rapid and safe minibus trips across town instantly.', 
    get button() { return i18next.t('home.requestRide'); } 
  },
  driverBanner: { 
    title: 'Ready to Earn?', 
    subtitle: 'View available minibus ride requests in your area and accept trips.', 
    button: 'View Ride Requests' 
  },
  dashboard: {
    driver: 'Driver Dashboard',
    passenger: 'Passenger Dashboard',
  },
  sections: { quickaccess: 'Quick Access' },
  stats: { today: 'Today', trips: 'Trips', rating: 'Rating', active: 'Active Rides', past: 'Past Rides' },
  footer: { logout: 'Log Out of Account' },
};