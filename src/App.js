import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import {Route, Routes} from 'react-router-dom';
import Home from './Components/Home';
import Artists from './Components/Artists';
import Songs from './Components/Songs';
import "bootstrap/dist/css/bootstrap.min.css"
import NewArtist from './Components/NewArtist';

function App() {
  return (
    <>
    <Navbar></Navbar>
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/artists" element={<NewArtist/>}/>
        <Route path="/songs" element={<Songs/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
