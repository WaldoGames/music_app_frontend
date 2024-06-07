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
import NewPlaylist from './Components/NewPlaylist'
import { useState,useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import ShowProvider from './Components/Context/ShowContext';
import NewShowForm from './Components/NewShow';
import RecordPlaylist from './Components/RecordPlaylist'
import LoginRedirectProvider from "./Components/Auth0/LoginRedirect"
import AuthOutlet from '@auth-kit/react-router/AuthOutlet'

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    <ShowProvider>
    <Navbar></Navbar>
    <Routes>
    
        <Route path="/" element={<HomePage/>} />


        <Route element={<LoginRedirectProvider/>}>
          <Route path="/playlists" element={<Playlists/>} />
          <Route path="/playlists/new" element={<NewPlaylist/>} />
          <Route path="/artists" element={<Artists/>} />
          <Route path="/songs" element={<Songs />} />
          <Route path="/songs/new" element={<NewSong />} />
          <Route path="/shows" element={<Shows />} />
          <Route path="/shows/new" element={<NewShowForm/>} />
          <Route path="/songs/edit/:id" element={<UpdateSong />} />
        </Route>
        <Route path="/playlist/room/:roomGuid/:playlistId" element={<RecordPlaylist/>}/>

      </Routes>
    </ShowProvider>

  );

}

export default App;
