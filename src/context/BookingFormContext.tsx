import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface GuestInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface PaymentInfo {
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
}

interface BookingFormData {
  guestInfo: GuestInfo;
  paymentInfo: PaymentInfo;
  roomNumber?: string;
  roomId?: number;
}

interface BookingFormContextType {
  formData: BookingFormData;
  updateGuestInfo: (data: GuestInfo) => void;
  updatePaymentInfo: (data: PaymentInfo) => void;
  setRoomNumber: (roomNumber: string) => void;
  setRoomId: (roomId: number) => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isFormOpen: boolean;
  openForm: (roomNumber: string, roomId: number) => void;
  closeForm: () => void;
}

const BookingFormContext = createContext<BookingFormContextType | undefined>(undefined);

export function BookingFormProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState<BookingFormData>({
    guestInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    },
    paymentInfo: {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    }
  });

  const updateGuestInfo = (data: GuestInfo) => {
    setFormData(prev => ({ ...prev, guestInfo: data }));
  };

  const updatePaymentInfo = (data: PaymentInfo) => {
    setFormData(prev => ({ ...prev, paymentInfo: data }));
  };

  const setRoomNumber = (roomNumber: string) => {
    setFormData(prev => ({ ...prev, roomNumber }));
  };

  const setRoomId = (roomId: number) => {
    setFormData(prev => ({ ...prev, roomId }));
  };

  const openForm = (roomNumber: string, roomId: number) => {
    setRoomNumber(roomNumber);
    setRoomId(roomId);
    setCurrentStep(0);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setCurrentStep(0);
  };

  return (
    <BookingFormContext.Provider
      value={{
        formData,
        updateGuestInfo,
        updatePaymentInfo,
        setRoomNumber,
        setRoomId,
        currentStep,
        setCurrentStep,
        isFormOpen,
        openForm,
        closeForm
      }}
    >
      {children}
    </BookingFormContext.Provider>
  );
}

export function useBookingFormContext() {
  const context = useContext(BookingFormContext);
  if (!context) {
    throw new Error('useBookingFormContext must be used within BookingFormProvider');
  }
  return context;
}
