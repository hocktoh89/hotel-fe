import { Room, SearchFilters } from '../types';

export function isRoomAvailable(room: Room, filters: SearchFilters): boolean {
  if (!filters.checkIn || !filters.checkOut) return true;
  if (filters.category && room.category !== filters.category) return false;

  const searchStart = new Date(filters.checkIn);
  const searchEnd = new Date(filters.checkOut);

  return !room.bookings.some(booking => {
    const bookingStart = new Date(booking.checkIn);
    const bookingEnd = new Date(booking.checkOut);
    return searchStart < bookingEnd && searchEnd > bookingStart;
  });
}
