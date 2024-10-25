import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import './Home.css';

const Home = () => {
  return (
    <Box className="home-container">
      <video autoPlay loop muted className="background-video">
        <source src="174072-850361340_medium.mp4" type="video/mp4" />
      </video>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.6))', // Light gradient for subtle overlay
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          textAlign: 'center',
          color: 'white',
          padding: '20px',
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          className="fade-in"
          sx={{
            fontFamily: 'Orbitron, sans-serif', // Futuristic font
            textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
          }}
        >
          THE WORLD'S FIRST OUT OF SPACE MOVIE THEATER
        </Typography>
        <Typography
          variant="h5"
          gutterBottom
          className="fade-in"
          style={{ animationDelay: '0.5s' }}
          sx={{
            fontFamily: 'Orbitron, sans-serif', // Futuristic font
            textShadow: '1px 1px 6px rgba(0, 0, 0, 0.5)',
          }}
        >
          Welcome to Zodiac Screens, your portal to the world of cinema.
        </Typography>
        <Button
          variant="contained"
          className="fade-in"
          style={{ animationDelay: '1s' }}
          sx={{
            marginTop: '20px',
            backgroundColor: '#00BFFF',
            color: '#000',
            fontFamily: 'Orbitron, sans-serif',
            padding: '10px 20px',
            fontSize: '18px',
            textTransform: 'uppercase',
            borderRadius: '20px',
            transition: 'background-color 0.3s ease',
            '&:hover': {
              backgroundColor: '#00a3cc',
            },
          }}
        >
          Subscribe Now
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
