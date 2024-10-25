import React, { useState } from 'react';
import { Box, Button, Typography, Paper } from '@mui/material';
import BookingModal from './BookingModal'; // Import the BookingModal

// Define seat rows
const seatRows = [
  ['A1', 'A2', 'A3', 'A4', 'A5'],
  ['B1', 'B2', 'B3', 'B4', 'B5'],
  ['C1', 'C2', 'C3', 'C4', 'C5'],
  ['D1', 'D2', 'D3', 'D4', 'D5'],
];

const Booking: React.FC = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [confirmationMessage, setConfirmationMessage] = useState<string>('');
  const [openBookingModal, setOpenBookingModal] = useState<boolean>(false);

  const toggleSeat = (seat: string) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleBook = (name: string, phone: string) => {
    if (selectedSeats.length > 0 && name) {
      setConfirmationMessage(`Booking confirmed for ${name} with seats: ${selectedSeats.join(', ')}`);
      // Optionally, handle backend booking logic here

      // Clear selections
      setSelectedSeats([]);
      setUserName('');
      setOpenBookingModal(false); // Close modal after booking
    } else {
      setConfirmationMessage('Please enter your name and select at least one seat to book.');
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3, margin: 3, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Select Your Seats
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {seatRows.map((row, rowIndex) => (
          <Box key={rowIndex} sx={{ display: 'flex', marginBottom: 1 }}>
            {row.map((seat) => (
              <Button
                key={seat}
                variant={selectedSeats.includes(seat) ? 'contained' : 'outlined'}
                color={selectedSeats.includes(seat) ? 'primary' : 'default'}
                onClick={() => toggleSeat(seat)}
                sx={{ margin: 0.5, width: '40px', height: '40px', fontSize: '16px' }}
              >
                {seat}
              </Button>
            ))}
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        onClick={() => setOpenBookingModal(true)}
        sx={{ marginTop: 2, backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
      >
        Book Selected Seats
      </Button>

      {/* Display confirmation message */}
      {confirmationMessage && (
        <Typography variant="h6" sx={{ color: 'green', marginTop: 2 }}>
          {confirmationMessage}
        </Typography>
      )}

      {/* Booking Modal */}
      <BookingModal
        open={openBookingModal}
        onClose={() => setOpenBookingModal(false)}
        onBook={handleBook}
      />
    </Paper>
  );
};

export default Booking;
