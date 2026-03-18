import { Container, Box, Typography, Button } from '@mui/material';
import { useAuthContext } from '../context/AuthContext';
import SearchForm from './SearchForm';
import RoomList from './RoomList';
import BookingForm from '../views/bookingForms';
import LoginForm from './LoginForm';

export default function RoomSearch() {
  const { isAuthenticated, logout } = useAuthContext();

  if (!isAuthenticated) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom textAlign="center">
            Login to Book Rooms
          </Typography>
          <LoginForm />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h4" component="h1">
            Room Search
          </Typography>
          <Button variant="outlined" onClick={logout}>
            Logout
          </Button>
        </Box>
        <SearchForm />
        <RoomList />
        <BookingForm />
      </Box>
    </Container>
  );
}
