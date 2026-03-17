import { Container, Box, Typography } from '@mui/material';
import SearchForm from './SearchForm';
import RoomList from './RoomList';

export default function RoomSearch() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Room Search
        </Typography>
        <SearchForm />
        <RoomList />
      </Box>
    </Container>
  );
}
