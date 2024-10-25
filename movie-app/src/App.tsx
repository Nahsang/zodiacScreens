import { useState } from 'react';
import NavBar from './static/NavBar';
import MovieIndex from './component/movie/MovieIndex';
import Home from './Home';
import Subscribe from './Subscribe';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import './App.css';
import './Home.css';
import './Subscribe.css';
import CreateMovie from './component/CreateMovie';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <CssBaseline />
      <div className="moving-background">
        <div className="movie-content">
          <NavBar isLoggedIn={false} onLogout={function (): void {
            throw new Error('Function not implemented.');
          } } />
          <Routes>
            <Route path="/" element={<Home />} /> {/* Landing page */}
            <Route path="/home" element={<MovieIndex />} /> {/* Movies listing */}
            <Route path="/subscribe" element={<Subscribe />} /> {/* Subscription page */}
            <Route path= "/create" element={<CreateMovie />} />  
           
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
