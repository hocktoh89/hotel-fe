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
  id: number;
}

export interface SearchFilters {
  checkIn: string;
  checkOut: string;
  category: string;
}
