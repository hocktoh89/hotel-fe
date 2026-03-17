import { gql } from '@apollo/client';

export const GET_AVAIL_ROOMS = gql`
  query SearchAvailableRooms($input: SearchRoomInput!) {
    searchAvailableRooms(input: $input) {
      id
      number
      category
      price
      bookings {
        checkIn
        checkOut
        status
      }
    }
  }
`;

export const CREATE_BOOKING = gql`
  mutation CreateBooking($input: BookingInput!) {
    createBooking(input: $input) {
      code
      status
      success
    }
  }
`;
