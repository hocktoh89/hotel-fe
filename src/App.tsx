import { ApolloProvider } from '@apollo/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import { BookingFormProvider } from './context/BookingFormContext';
import client from './graphql/client';
import RoomSearch from './components/RoomSearch';

const theme = createTheme();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <AppProvider>
            <BookingFormProvider>
              <RoomSearch />
            </BookingFormProvider>
          </AppProvider>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
