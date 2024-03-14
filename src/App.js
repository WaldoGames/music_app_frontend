import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {Route, Routes} from 'react-router-dom';
import Home from './components/Home';
import Artists from './components/Artists';

function App() {
  return (
    <>
    <Navbar></Navbar>
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/artists" element={<Artists/>}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
