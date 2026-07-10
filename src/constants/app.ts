export const APP_NAME = 'BookDrive';

export const BOOKING_STATUS = {
  PENDING: 'pending',
  ACCEPTED: 'accepted',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export type BookingStatus = (typeof BOOKING_STATUS)[keyof typeof BOOKING_STATUS];

export const USER_ROLE = {
  PASSENGER: 'passenger',
  DRIVER: 'driver',
} as const;

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];
