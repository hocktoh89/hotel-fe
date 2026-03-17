import { useQuery } from '@apollo/client';
import { Box, Card, CardContent, Typography, CircularProgress, Alert, Grid, CardActionArea } from '@mui/material';
import { GET_AVAIL_ROOMS } from '../graphql/queries';
import { useAppContext } from '../context/AppContext';
import { useBookingFormContext } from '../context/BookingFormContext';
import { Room } from '../types';

export default function RoomList() {
  const { filters } = useAppContext();
  const { openForm } = useBookingFormContext();
  const { loading, error, data } = useQuery<{ rooms: Room[] }>(GET_AVAIL_ROOMS, {
    variables: {
      input: {
      checkIn: filters.checkIn || undefined,
      checkOut: filters.checkOut || undefined,
      category: filters.category || undefined
      }
    }
  });

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  const rooms = data?.searchAvailableRooms || [];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Available Rooms ({rooms.length})
      </Typography>
      <Grid container spacing={2}>
        {rooms.map((room: Room) => (
          <Grid item xs={12} sm={6} md={4} key={room.number}>
            <Card>
              <CardActionArea onClick={() => openForm(room.number, room.id)}>
                <CardContent>
                  <Typography variant="h6">Room {room.number}</Typography>
                  <Typography color="text.secondary">{room.category}</Typography>
                  <Typography variant="h5" sx={{ mt: 1 }}>
                    ${room.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
