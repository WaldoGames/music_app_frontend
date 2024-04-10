import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import {Route, Routes} from 'react-router-dom';
import Home from './Components/Home';
import Artists from './Components/Artists';
import Songs from './Components/Songs';
import "bootstrap/dist/css/bootstrap.min.css"
import NewArtist from './Components/NewArtist';
import NewSong from './Components/NewSong';
import { useState } from 'react';

function App() {

  const [selectedShow, setSelectedShow] = useState('');

  const handleItemSelected = (selectedValue) => {
    setSelectedShow(selectedValue);
  };

  return (
    <>
    <Navbar selectedItem={selectedShow} onItemSelected={setSelectedShow} ></Navbar>
    <div>

      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/artists" element={<Artists/>}/>
        <Route path="/songs" element={<Songs/>}/>
        <Route path="/songs/new" element={<NewSong/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
