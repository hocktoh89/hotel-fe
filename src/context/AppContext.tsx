import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SearchFilters } from '../types';

interface AppContextType {
  filters: SearchFilters;
  setFilters: (filters: SearchFilters) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<SearchFilters>({
    checkIn: '',
    checkOut: '',
    category: ''
  });

  return (
    <AppContext.Provider value={{ filters, setFilters }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
}
