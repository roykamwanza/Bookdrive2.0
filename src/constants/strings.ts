export const driverHeaderString = {
  brandName: 'BOOKDRIVE',
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

export const tripStatusString = {
  steps: {
    accepted: 'Accepted',
    arrived: 'Arrived',
    inTransit: 'In Transit',
    completed: 'Completed',
  },
  cta: {
    confirmArrival: 'Confirm Arrival',
    startTrip: 'Start Trip',
    completeTrip: 'Complete Trip',
    done: 'Done',
  }
} as const;