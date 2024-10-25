import React, { useState } from 'react';
import { Box, Paper, Typography, Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useQuery } from '@tanstack/react-query';
import MovieRow from "../MovieRow";
import DeleteMovie from "../DeleteMovie";
import BookingModal from "../BookingModal"; // Import the BookingModal
import { redirect } from "react-router-dom";

const fetchMovies = async () => {
    const response = await fetch('http://localhost:8080/api/v1/movie/', {
        method: 'GET'
    });
    return response.json();
};

const MoviesList: React.FC = () => {
    const { data, error, isLoading } = useQuery({
        queryKey: ['movie'],
        queryFn: fetchMovies
    });
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
    const [openBookingModal, setOpenBookingModal] = useState(false); // State for booking modal
    const [bookingMessage, setBookingMessage] = useState<string | null>(null); // Booking confirmation message

    if (isLoading) return <div>Loading...</div>;
    if (error instanceof Error) return <div>Error: {error.message}</div>;

    const handleCardClick = (movieId: number) => {
        setSelectedMovieId(selectedMovieId === movieId ? null : movieId);
    };

    const refresh = () => {
        redirect("/home");
    };

    const handleBooking = (name: string, phone: string) => {
        // Handle the booking logic here (e.g., send to the backend)
        // For now, we just show a confirmation message
        setBookingMessage(`Booking confirmed for ${name} with phone ${phone}.`);
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            padding: 4,
            position: 'relative',
            zIndex: 0,
            backgroundColor: '#ffffff', // White background
            background: 'linear-gradient(180deg, #e0f7fa, #b2ebf2)', // Light blue gradient
        }}>
            <Typography variant="h4" sx={{
                textAlign: 'center',
                marginBottom: 4,
                color: '#1976d2', // Blue color for the title
                textShadow: '2px 2px 6px rgba(25, 118, 210, 0.5)',
                fontFamily: 'Orbitron, sans-serif',
            }}>
                NOW SHOWING
            </Typography>

            {/* Movie Posters Section */}
            <Box sx={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: 3,
            }}>
                {data?.map(movie => (
                    <Paper
                        key={movie.movieId}
                        onClick={() => handleCardClick(movie.movieId)}
                        sx={{
                            textAlign: 'center',
                            padding: 2,
                            backgroundColor: 'rgba(25, 118, 210, 0.2)', // Darker blue tint for the card
                            boxShadow: '0 0 20px rgba(0, 0, 0, 0.4)', // Enhanced shadow for depth
                            borderRadius: '15px',
                            width: selectedMovieId === movie.movieId ? '340px' : '300px',
                            height: selectedMovieId === movie.movieId ? 'auto' : '400px',
                            transition: 'all 0.3s ease',
                            cursor: 'pointer',
                            '&:hover': {
                                boxShadow: '0 0 30px #1976d2, 0 0 40px #1976d2',
                                transform: 'scale(1.02)',
                            },
                            position: 'relative',
                            overflow: 'hidden',
                        }}
                    >
                        <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            style={{
                                width: '100%',
                                height: 'auto',
                                borderRadius: '15px',
                                marginBottom: '15px',
                                filter: selectedMovieId === movie.movieId ? 'brightness(0.7)' : 'none',
                                transition: 'filter 0.3s ease',
                            }}
                        />
                        <Typography variant="h6" sx={{ color: '#1976d2', fontFamily: 'Roboto, sans-serif' }}>
                            {movie.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#64b5f6', fontFamily: 'Roboto, sans-serif' }}>
                            {movie.genre} | {movie.releaseDate}
                        </Typography>

                        {/* Show details and buttons if the movie is selected */}
                        {selectedMovieId === movie.movieId && (
                            <Box
                                sx={{
                                    position: 'absolute',
                                    bottom: 0,
                                    left: 0,
                                    right: 0,
                                    padding: 2,
                                    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Slightly transparent white background
                                    borderRadius: '0 0 15px 15px',
                                    textAlign: 'left',
                                }}
                            >
                                <Typography variant="body2" sx={{ color: '#000', marginBottom: 1 }}>
                                    {movie.description}
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <DeleteMovie id={movie.movieId} closeModal={refresh} />
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setOpenBookingModal(true); // Open booking modal
                                        }}
                                        sx={{
                                            backgroundColor: '#1976d2',
                                            '&:hover': {
                                                backgroundColor: '#1565c0'
                                            }
                                        }}
                                    >
                                        Book Now
                                    </Button>
                                    <Button
                                        variant="contained"
                                        sx={{
                                            backgroundColor: '#1976d2',
                                            '&:hover': {
                                                backgroundColor: '#1565c0'
                                            }
                                        }}
                                    >
                                        Update
                                    </Button>
                                </Box>
                            </Box>
                        )}
                    </Paper>
                ))}
            </Box>

            {/* Booking Modal */}
            <BookingModal
                open={openBookingModal}
                onClose={() => setOpenBookingModal(false)}
                onBook={handleBooking}
            />

            {/* Booking Confirmation Message */}
            {bookingMessage && (
                <Typography variant="h6" sx={{ color: 'green', textAlign: 'center', marginTop: 4 }}>
                    {bookingMessage}
                </Typography>
            )}

            {/* Movies Table Section */}
            <Table sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', marginTop: 4 }}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#1976d2' }}>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Movie</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Title</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Release Date</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Rating</TableCell>
                        <TableCell sx={{ color: '#fff', fontWeight: 'bold' }}>Description</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((movie) => (
                        <MovieRow data={movie} key={movie.id} />
                    ))}
                </TableBody>
            </Table>

            {/* Footer Section */}
            <Box sx={{
                backgroundColor: '#f1f1f1', // Light gray background for the footer
                padding: '8px 16px',
                textAlign: 'center',
                marginTop: 'auto',
                borderRadius: '10px',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                <Typography variant="body2" sx={{ color: '#1976d2', marginBottom: '4px', fontFamily: 'Orbitron, sans-serif' }}>
                    Follow us on social media!
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '8px' }}>
                    <Button variant="text" sx={{ color: '#1976d2' }}>Facebook</Button>
                    <Button variant="text" sx={{ color: '#1976d2' }}>Twitter</Button>
                    <Button variant="text" sx={{ color: '#1976d2' }}>Instagram</Button>
                </Box>
                <Typography variant="body2" sx={{ color: '#000', fontFamily: 'Roboto, sans-serif', marginBottom: '4px' }}>
                    Contact Us: (571) 456-7890 | info@ZodiacScreen.com
                </Typography>
                <Typography variant="body2" sx={{ color: '#000', fontFamily: 'Roboto, sans-serif', marginBottom: '4px' }}>
                    Visit us: 123 Cinema Lane, Movietown, CA 98765
                </Typography>
                <Typography variant="body2" sx={{ color: 'gray', fontFamily: 'Roboto, sans-serif' }}>
                    &copy; 2024 Zodiac Screens. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
};

export default MoviesList;
