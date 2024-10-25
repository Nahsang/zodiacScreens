import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

interface BookingModalProps {
    open: boolean;
    onClose: () => void;
    onBook: (name: string, phone: string) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ open, onClose, onBook }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = () => {
        onBook(name, phone);
        onClose(); // Close the modal after booking
        setName(''); // Clear fields
        setPhone('');
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 300,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: '10px'
            }}>
                <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
                    Book Your Ticket
                </Typography>
                <TextField
                    label="Name"
                    variant="outlined"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ backgroundColor: '#1976d2', '&:hover': { backgroundColor: '#1565c0' } }}
                >
                    Confirm Booking
                </Button>
            </Box>
        </Modal>
    );
};

export default BookingModal;
