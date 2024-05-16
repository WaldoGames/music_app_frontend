import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import {Route, Routes} from 'react-router-dom';
import HomePage from './Components/Home';
import Artists from './Components/Artists';
import Songs from './Components/Songs';
import "bootstrap/dist/css/bootstrap.min.css"
import NewArtist from './Components/NewArtist';
import NewSong from './Components/NewSong';
import UpdateSong from './Components/UpdateSong';
import Shows from './Components/Shows';
import Playlists from './Components/Playlists'
import MyForm from './Components/NewPlaylist'
import { useState,useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ShowProvider from './Components/Context/ShowContext';
import NewShowForm from './Components/NewShow';


function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <ShowProvider>
    <div>
    <Navbar></Navbar>
    <Routes>
    
        <Route path="/" element={<HomePage/>} />
        <Route path="/playlists" element={<MyForm/>} />
        <Route path="/artists" element={<Artists/>} />
        <Route path="/songs" element={<Songs />} />
        <Route path="/songs/new" element={<NewSong />} />
        <Route path="/shows" element={<Shows />} />
        <Route path="/shows/new" element={<NewShowForm/>} />
        <Route path="/songs/edit/:id" element={<UpdateSong />} />
      </Routes>
    </div>
    </ShowProvider>

  );

}

export default App;
