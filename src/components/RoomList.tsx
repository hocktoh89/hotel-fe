import { useQuery } from '@apollo/client';
import { Box, Card, CardContent, Typography, CircularProgress, Alert, Grid } from '@mui/material';
import { GET_ROOMS } from '../graphql/queries';
import { useAppContext } from '../context/AppContext';
import { isRoomAvailable } from '../utils/roomFilter';
import { Room } from '../types';

export default function RoomList() {
  const { filters } = useAppContext();
  const { loading, error, data } = useQuery<{ rooms: Room[] }>(GET_ROOMS);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error: {error.message}</Alert>;

  const availableRooms = data?.rooms.filter(room => isRoomAvailable(room, filters)) || [];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Available Rooms ({availableRooms.length})
      </Typography>
      <Grid container spacing={2}>
        {availableRooms.map(room => (
          <Grid item xs={12} sm={6} md={4} key={room.number}>
            <Card>
              <CardContent>
                <Typography variant="h6">Room {room.number}</Typography>
                <Typography color="text.secondary">{room.category}</Typography>
                <Typography variant="h5" sx={{ mt: 1 }}>
                  ${room.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
