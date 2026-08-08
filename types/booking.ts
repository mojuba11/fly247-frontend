export interface FlightDetails {
  id?: string;
  airline?: string;
  flightNumber?: string;
  origin?: string;
  destination?: string;
  date?: string;
  departureTime?: string;
  arrivalTime?: string;
  price?: number;
}

export interface UserReference {
  _id: string;
  email: string;
  name?: string;
  firstName?: string;
  lastName?: string;
}

export interface Booking {
  _id: string;
  paymentReference: string;
  status: 'pending' | 'confirmed' | 'cancelled' | string;
  user?: UserReference;
  flightDetails?: FlightDetails;
  passengerCount?: number;
  travelClass?: 'economy' | 'business' | 'first';
  totalAmount?: number;
  createdAt?: string;
  updatedAt?: string;
}
