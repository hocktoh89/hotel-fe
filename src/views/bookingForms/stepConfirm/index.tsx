import { Box, Typography, Button, Card, CardContent, Grid } from '@mui/material';
import { useBookingFormContext } from '../../../context/BookingFormContext';

export default function StepConfirm() {
  const { formData, setCurrentStep } = useBookingFormContext();
  const { guestInfo, roomNumber } = formData;

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Confirm Your Details
      </Typography>
      <Card sx={{ mt: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2" color="text.secondary">
                Guest Information
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Name:</Typography>
              <Typography variant="body1">
                {guestInfo.firstName} {guestInfo.lastName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Email:</Typography>
              <Typography variant="body1">{guestInfo.email}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2">Phone:</Typography>
              <Typography variant="body1">{guestInfo.phone}</Typography>
            </Grid>
            {roomNumber && (
              <Grid item xs={6}>
                <Typography variant="body2">Room:</Typography>
                <Typography variant="body1">{roomNumber}</Typography>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={() => setCurrentStep(0)}>
          Back
        </Button>
        <Button variant="contained" onClick={() => setCurrentStep(2)}>
          Proceed to Payment
        </Button>
      </Box>
    </Box>
  );
}
