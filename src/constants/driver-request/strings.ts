// Centralized copy for all driver flow screens/components.
//
// TODO(Dev5): once i18next + expo-localization are wired in, replace usages
// of these constants with t('driver.<section>.<key>') calls and move these
// as key/value pairs into the locale resource files. Keeping strings out of
// components now means that swap only touches this file.

export const driverHeaderString = {
  brandName: 'QuickBus',
  modeLabel: 'DRIVER MODE',
} as const;

export const emptyRequestsString = {
  message: 'No requests right now',
} as const;

export const requestCardString = {
  fareLabel: 'EST. FARE',
  currencySymbol: 'K',
  distanceUnitLabel: 'km away',
  rejectLabel: 'Reject',
  acceptLabel: 'Accept',
  rejectAccessibilityLabel: (passengerName: string) => `Reject request from ${passengerName}`,
  acceptAccessibilityLabel: (passengerName: string) => `Accept request from ${passengerName}`,
} as const;

export const statusSummaryString = {
  currentlyAtLabel: 'CURRENTLY AT',
  statusLabel: 'STATUS',
  acceptingLabel: 'Accepting',
  offlineLabel: 'Offline',
} as const;

export const DRIVER_REQUEST_STRINGS = {
  incomingRequests: 'Incoming Requests',
  newCount: '{{count}} new',
  tripAcceptedMessage: 'Trip accepted! Proceeding to pickup.',
} as const;