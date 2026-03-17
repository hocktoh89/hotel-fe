import { Box, Stepper, Step, StepLabel, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useBookingFormContext } from '../../context/BookingFormContext';
import StepGuestInfo from './StepGuestInfo';
import StepConfirm from './StepConfirm';
import StepPayment from './StepPayment';

const steps = ['Guest Information', 'Confirm Details', 'Payment'];

export default function BookingForm() {
  const { currentStep, isFormOpen, closeForm } = useBookingFormContext();

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <StepGuestInfo />;
      case 1:
        return <StepConfirm />;
      case 2:
        return <StepPayment />;
      default:
        return <StepGuestInfo />;
    }
  };

  return (
    <Dialog open={isFormOpen} onClose={closeForm} maxWidth="md" fullWidth>
      <DialogTitle>
        Book Your Room
        <IconButton
          onClick={closeForm}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ py: 2 }}>
          <Stepper activeStep={currentStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {renderStep()}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
