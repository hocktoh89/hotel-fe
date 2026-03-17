export interface Booking {
  status: string;
  checkOut: string;
  checkIn: string;
}

export interface Room {
  number: string;
  price: number;
  category: string;
  bookings: Booking[];
}

export interface SearchFilters {
  checkIn: string;
  checkOut: string;
  category: string;
}
