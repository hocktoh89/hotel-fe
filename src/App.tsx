import { ApolloProvider } from '@apollo/client';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { AppProvider } from './context/AppContext';
import client from './graphql/client';
import RoomSearch from './components/RoomSearch';

const theme = createTheme();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppProvider>
          <RoomSearch />
        </AppProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
