// src/types/driver.ts

// 1. Enums/States
export type DriverStatus = 'accepting' | 'offline';
export type TripStage = 'requested' | 'arrived' | 'in-transit' | 'completed';
export type RequestStatus = 'pending' | 'accepted' | 'declined';
export type RequestAction = 'accept' | 'reject';

// 2. Main Data Model (Combined)
export interface RideRequest {
  id: string;
  passengerName: string;
  initials: string;
  pickupLocation: string;
  destination: string;
  distanceAwayKm: number;
  estimatedFare: number;
  pickupEtaMinutes: number;
  status: RequestStatus;
  timestamp: Date;
}

export const TRIP_DISPLAY_STATUS = {
  EN_ROUTE: 'en-route',
} as const;
 
export type TripDisplayStatus = (typeof TRIP_DISPLAY_STATUS)[keyof typeof TRIP_DISPLAY_STATUS];
 

// 3. State Management Types
export interface DriverLocationState {
  currentStationName: string;
  status: DriverStatus;
}

export interface UseDriverRequestsResult {
  requests: RideRequest[];
  status: DriverStatus;
  currentStation: string;
  toggleStatus: () => void;
  acceptRequest: (request: RideRequest) => void;
  rejectRequest: (request: RideRequest) => void;
}

// 4. Components Types
// DriverHeader
export interface DriverHeaderProps {
  onBack: () => void;
}

//Requestcard
export interface RequestCardProps {
  request: RideRequest;
  onAccept: (request: RideRequest) => void;
  onReject: (request: RideRequest) => void;
}

//StatusSummary
export interface StatusSummaryProps {
  currentStation: string;
  status: DriverStatus;
  onToggleStatus: () => void;
}

//TripStatusView
export interface TripStatusProps {
  request: RideRequest;
  onDone: (request: RideRequest) => void;
}

export interface UseDriverRequestsResult {
  requests: RideRequest[];
  status: DriverStatus;
  currentStation: string;
  toggleStatus: () => void;
  acceptRequest: (request: RideRequest) => void;
  rejectRequest: (request: RideRequest) => void;
  completeRequest: (request: RideRequest) => void; // <-- new
}