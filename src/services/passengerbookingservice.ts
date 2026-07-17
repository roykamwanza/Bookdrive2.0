import type {
  Booking,
  CreateBookingPayload,
  FareEstimate,
  GeoPoint,
  PlaceResult,
  VehicleType,
} from '../types/booking';

const PER_KM_RATE: Record<VehicleType, number> = {
  standard: 3.5,
  shared: 2.2,
  xl: 5.0,
};

const BASE_FARE: Record<VehicleType, number> = {
  standard: 5,
  shared: 3,
  xl: 8,
};

const SERVICE_FEE_RATE = 0.08;
const CURRENCY = 'USD';

let bookingStore: Booking[] = [];
let idCounter = 1000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function haversineKm(a: GeoPoint, b: GeoPoint): number {
  const R = 6371;
  const dLat = ((b.latitude - a.latitude) * Math.PI) / 180;
  const dLon = ((b.longitude - a.longitude) * Math.PI) / 180;
  const lat1 = (a.latitude * Math.PI) / 180;
  const lat2 = (b.latitude * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
}

function round2(n: number) {
  return Math.round(n * 100) / 100;
}

export async function searchLocations(query: string): Promise<PlaceResult[]> {
  await delay(250);
  if (!query.trim()) return [];

  const seedPlaces: PlaceResult[] = [
    { id: 'p1', title: 'Central Station', subtitle: 'Downtown', location: { latitude: -15.4167, longitude: 28.2833 } },
    { id: 'p2', title: 'Riverside Mall', subtitle: 'Riverside Rd', location: { latitude: -15.4030, longitude: 28.3228 } },
    { id: 'p3', title: 'University Campus', subtitle: 'Great East Rd', location: { latitude: -15.3900, longitude: 28.3500 } },
    { id: 'p4', title: 'Airport Terminal', subtitle: 'Airport Rd', location: { latitude: -15.3308, longitude: 28.4526 } },
    { id: 'p5', title: 'City Market', subtitle: 'Freedom Way', location: { latitude: -15.4200, longitude: 28.2900 } },
  ];

  return seedPlaces.filter((p) =>
    `${p.title} ${p.subtitle ?? ''}`.toLowerCase().includes(query.toLowerCase())
  );
}

export async function reverseGeocode(point: GeoPoint): Promise<PlaceResult> {
  await delay(150);
  return {
    id: 'current-location',
    title: 'Current location',
    subtitle: `${point.latitude.toFixed(4)}, ${point.longitude.toFixed(4)}`,
    location: point,
  };
}

export async function getFareEstimate(
  pickup: PlaceResult,
  dropoff: PlaceResult,
  vehicleType: VehicleType
): Promise<FareEstimate> {
  await delay(300);

  const distanceKm = Math.max(0.5, haversineKm(pickup.location, dropoff.location));
  const base = BASE_FARE[vehicleType];
  const distanceFare = distanceKm * PER_KM_RATE[vehicleType];
  const serviceFee = (base + distanceFare) * SERVICE_FEE_RATE;
  const total = base + distanceFare + serviceFee;
  const etaMinutes = Math.max(3, Math.round((distanceKm / 28) * 60));

  return {
    currency: CURRENCY,
    baseFare: round2(base),
    distanceFare: round2(distanceFare),
    serviceFee: round2(serviceFee),
    total: round2(total),
    distanceKm: round2(distanceKm),
    etaMinutes,
  };
}

export async function createBooking(payload: CreateBookingPayload): Promise<Booking> {
  await delay(500);

  const fare = await getFareEstimate(payload.pickup, payload.dropoff, payload.vehicleType);

  const booking: Booking = {
    id: `bk_${idCounter++}`,
    passengerId: payload.passengerId,
    status: 'requested',
    vehicleType: payload.vehicleType,
    pickup: { place: payload.pickup },
    dropoff: { place: payload.dropoff },
    fare,
    requestedAt: new Date().toISOString(),
    notes: payload.notes,
  };

  bookingStore = [booking, ...bookingStore];
  return booking;
}

export async function getBookingHistory(passengerId: string): Promise<Booking[]> {
  await delay(350);

  if (bookingStore.length === 0) {
    bookingStore = seedHistory(passengerId);
  }

  return bookingStore
    .filter((b) => b.passengerId === passengerId)
    .sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
}

export async function getBookingById(bookingId: string): Promise<Booking | undefined> {
  await delay(200);
  return bookingStore.find((b) => b.id === bookingId);
}

export async function cancelBooking(bookingId: string, reason?: string): Promise<Booking> {
  await delay(300);

  const idx = bookingStore.findIndex((b) => b.id === bookingId);
  if (idx === -1) throw new Error('Booking not found');

  const updated: Booking = {
    ...bookingStore[idx],
    status: 'cancelled',
    cancelledAt: new Date().toISOString(),
    cancellationReason: reason,
  };
  bookingStore[idx] = updated;
  return updated;
}

function seedHistory(passengerId: string): Booking[] {
  const now = Date.now();

  const mk = (
    offsetHours: number,
    status: Booking['status'],
    title: string,
    dropoffTitle: string
  ): Booking => {
    const pickup: PlaceResult = {
      id: `seed-pickup-${offsetHours}`,
      title,
      location: { latitude: -15.4167, longitude: 28.2833 },
    };
    const dropoff: PlaceResult = {
      id: `seed-dropoff-${offsetHours}`,
      title: dropoffTitle,
      location: { latitude: -15.403, longitude: 28.3228 },
    };
    const distanceKm = round2(haversineKm(pickup.location, dropoff.location));
    const fare: FareEstimate = {
      currency: CURRENCY,
      baseFare: BASE_FARE.standard,
      distanceFare: round2(distanceKm * PER_KM_RATE.standard),
      serviceFee: round2((BASE_FARE.standard + distanceKm * PER_KM_RATE.standard) * SERVICE_FEE_RATE),
      total: 0,
      distanceKm,
      etaMinutes: Math.max(3, Math.round((distanceKm / 28) * 60)),
    };
    fare.total = round2(fare.baseFare + fare.distanceFare + fare.serviceFee);

    return {
      id: `bk_${idCounter++}`,
      passengerId,
      status,
      vehicleType: 'standard',
      pickup: { place: pickup },
      dropoff: { place: dropoff },
      fare,
      requestedAt: new Date(now - offsetHours * 3600 * 1000).toISOString(),
      acceptedAt:
        status !== 'requested'
          ? new Date(now - offsetHours * 3600 * 1000 + 60000).toISOString()
          : undefined,
      completedAt:
        status === 'completed'
          ? new Date(now - offsetHours * 3600 * 1000 + 20 * 60000).toISOString()
          : undefined,
      driver:
        status === 'completed' || status === 'in_progress' || status === 'accepted'
          ? { id: 'drv_1', name: 'Mwansa Banda', plateNumber: 'BAZ 3021', rating: 4.8 }
          : undefined,
    };
  };

  return [
    mk(2, 'completed', 'Central Station', 'Riverside Mall'),
    mk(30, 'requested', 'City Market', 'University Campus'),
    mk(75, 'cancelled', 'Central Station', 'Airport Terminal'),
  ];
}
