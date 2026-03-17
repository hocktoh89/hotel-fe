import { Box, TextField, MenuItem } from '@mui/material';
import { useAppContext } from '../context/AppContext';

const categories = ['SINGLE', 'DOUBLE', 'LUXURY'];

export default function SearchForm() {
  const { filters, setFilters } = useAppContext();

  const handleChange = (field: keyof typeof filters) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFilters({ ...filters, [field]: e.target.value });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
      <TextField
        label="Check In"
        type="date"
        value={filters.checkIn}
        onChange={handleChange('checkIn')}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Check Out"
        type="date"
        value={filters.checkOut}
        onChange={handleChange('checkOut')}
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        select
        label="Category"
        value={filters.category}
        onChange={handleChange('category')}
        sx={{ minWidth: 150 }}
      >
        <MenuItem value="">All</MenuItem>
        {categories.map(cat => (
          <MenuItem key={cat} value={cat}>{cat}</MenuItem>
        ))}
      </TextField>
    </Box>
  );
}
