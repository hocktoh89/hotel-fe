import { Box, TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useBookingFormContext, PaymentInfo } from '../../../context/BookingFormContext';

const schema = yup.object({
  cardNumber: yup.string().matches(/^\d{16}$/, 'Card number must be 16 digits').required('Card number is required'),
  cardHolder: yup.string().required('Card holder name is required'),
  expiryDate: yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY').required('Expiry date is required'),
  cvv: yup.string().matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits').required('CVV is required')
});

export default function StepPayment() {
  const { formData, updatePaymentInfo, setCurrentStep } = useBookingFormContext();
  
  const { control, handleSubmit, formState: { errors } } = useForm<PaymentInfo>({
    resolver: yupResolver(schema),
    defaultValues: formData.paymentInfo
  });

  const onSubmit = (data: PaymentInfo) => {
    updatePaymentInfo(data);
    alert('Booking completed successfully!');
    setCurrentStep(0);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="cardNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Card Number"
            fullWidth
            margin="normal"
            error={!!errors.cardNumber}
            helperText={errors.cardNumber?.message}
            placeholder="1234567812345678"
          />
        )}
      />
      <Controller
        name="cardHolder"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Card Holder Name"
            fullWidth
            margin="normal"
            error={!!errors.cardHolder}
            helperText={errors.cardHolder?.message}
          />
        )}
      />
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Controller
          name="expiryDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Expiry Date"
              fullWidth
              margin="normal"
              error={!!errors.expiryDate}
              helperText={errors.expiryDate?.message}
              placeholder="MM/YY"
            />
          )}
        />
        <Controller
          name="cvv"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="CVV"
              fullWidth
              margin="normal"
              error={!!errors.cvv}
              helperText={errors.cvv?.message}
              placeholder="123"
            />
          )}
        />
      </Box>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={() => setCurrentStep(1)}>
          Back
        </Button>
        <Button type="submit" variant="contained">
          Complete Booking
        </Button>
      </Box>
    </Box>
  );
}
