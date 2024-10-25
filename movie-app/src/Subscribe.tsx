import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import './Subscribe.css';

const Subscribe = () => {
  return (
    <Box className="subscribe-container">
      <video autoPlay loop muted className="background-video">
        <source src="174072-850361340_medium.mp4" type="video/mp4" />
      </video>
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
        <Card
          sx={{
            maxWidth: 400,
            background: 'rgba(0, 21, 41, 0.8)', // Deep navy with transparency
            borderRadius: '20px',
            boxShadow: '0 0 20px rgba(0, 191, 179, 0.7)', // Teal glow
            padding: '20px',
            backdropFilter: 'blur(15px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          <CardContent>
            <Typography
              variant="h4"
              gutterBottom
              className="fade-in"
              sx={{
                color: '#00BFB3', // Teal
                fontFamily: 'Orbitron, sans-serif',
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
              }}
            >
              Become a Member for Life
            </Typography>
            <Typography
              variant="body1"
              className="fade-in"
              style={{ animationDelay: '0.5s' }}
              sx={{
                color: 'rgba(255, 255, 255, 0.85)', // Soft white for better contrast
                fontFamily: 'Orbitron, sans-serif',
                textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              For just <span className="highlight">$1,000 USD</span>, gain unlimited access to the most immersive out-of-space cinema experience. This is a lifetime offer, available for a limited time.
            </Typography>
            <Typography
              variant="body2"
              className="fade-in"
              style={{ animationDelay: '1s', marginTop: '20px' }}
              sx={{
                color: 'rgba(255, 255, 255, 0.75)',
                fontFamily: 'Orbitron, sans-serif',
                textShadow: '1px 1px 4px rgba(0, 0, 0, 0.5)',
              }}
            >
              Experience exclusive movie releases, live events, and cosmic cinema content—forever.
            </Typography>
            
            <Box className="payment-methods" sx={{ marginTop: '20px' }}>
              <Typography
                variant="body2"
                sx={{
                  color: 'rgba(255, 255, 255, 0.85)',
                  marginBottom: '10px',
                  fontFamily: 'Orbitron, sans-serif',
                }}
              >
                Choose your payment method:
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                <PaymentIcon sx={{ fontSize: '40px', color: '#00BFB3' }} />
                <AttachMoneyIcon sx={{ fontSize: '40px', color: '#00BFB3' }} />
                <AccountBalanceIcon sx={{ fontSize: '40px', color: '#00BFB3' }} />
              </Box>
            </Box>

            <Button
              variant="contained"
              className="fade-in"
              style={{ animationDelay: '1.5s', marginTop: '20px' }}
              sx={{
                backgroundColor: '#00BFB3', // Teal
                color: '#001529', // Deep navy for text
                fontFamily: 'Orbitron, sans-serif',
                padding: '10px 20px',
                fontSize: '18px',
                textTransform: 'uppercase',
                borderRadius: '20px',
                boxShadow: '0px 4px 15px rgba(0, 191, 179, 0.5)',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  backgroundColor: '#009B8E', // Darker teal for hover
                  boxShadow: '0px 6px 20px rgba(0, 191, 179, 0.8)',
                },
              }}
            >
              Subscribe Now
            </Button>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Subscribe;

