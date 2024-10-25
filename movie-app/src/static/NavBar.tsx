import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';

const logoUrl = 'https://images.playground.com/dc519ef3f018409eabb8383f88bbe1cd.jpeg';

const NavigationBar: React.FC<{ isLoggedIn: boolean; onLogout: () => void }> = ({ isLoggedIn, onLogout }) => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'black' }}>
      <Toolbar>
        {/* Logo */}
        <Avatar
          alt="Zodiac Screens Logo"
          src={logoUrl}
          sx={{ width: 40, height: 40, marginRight: 1 }}
        />
        
        {/* Title */}
        <Typography variant="h6" sx={{ color: 'white', flexGrow: 1 }}>
          Zodiac Screens
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          
          <Button color="inherit" sx={{ marginRight: '20px' }} href='/'>Home</Button>
          <Button color="inherit" sx={{ marginRight: '20px' }} href='/home'>Movies</Button>
          <Button color= "inherit" sx={{marginRight:'20px  '}} href='/create'>Create</Button>
          <Button color="inherit" sx={{ marginRight: '20px' }} href='/subscribe'>Subscribe</Button>
          <Button color="inherit" sx={{ marginRight: '20px' }} href='/booking'>Login</Button> {/* Updated path */}
        </Box>

        {/* Logout Button */}
        {isLoggedIn && (
          <Button 
            color="inherit" 
            onClick={onLogout}
            sx={{ marginLeft: 'auto' }} // Pushes the button to the far right
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
