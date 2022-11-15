import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login'
import SpotifyRefresh from './services/spotify/Spotify_refreshToken';
import Admin from './pages/Admin';

function App() {

  if (localStorage.getItem("spotify_token") !== null) {
    setInterval(SpotifyRefresh, 3000 * 1000)
  }

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/register" element={<Register />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/admin" element={<Admin />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
