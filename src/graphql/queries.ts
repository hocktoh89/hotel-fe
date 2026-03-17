import { gql } from '@apollo/client';

export const GET_ROOMS = gql`
  query Rooms {
    rooms {
      number
      price
      category
      bookings {
        status
        checkOut
        checkIn
      }
    }
  }
`;
