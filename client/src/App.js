import { BrowserRouter, Routes , Route,Navigate } from 'react-router-dom';
import './App.css';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import HomePage from './components/pages/HomePage';
import SpotifyAuth from './components/Auth/SpotifyAuth';
import GetPlaylists from './components/pages/GetPlaylists';
import Search from './components/pages/Search';
import DisplayFavouraites from './components/pages/DisplayFavourites';
import FeaturedPlaylists from './components/pages/FeaturedPlaylists';
import CustomPlaylists from './components/pages/CustomPlaylists';
import SelectPlaylistsData from './components/pages/SelectPlaylistsData';
import AboutPage from './components/pages/AboutPage';

function App() {



  return (
    <BrowserRouter >
      <div className="App font-Nunito">
        <Routes> 
          <Route path='/' element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={< Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/spotifyAuth" element={<SpotifyAuth />} />
          <Route path="/getPlaylists" element={<GetPlaylists/>}/>
          <Route path="/search" element={<Search />} />
          <Route path="/displayFavs" element={<DisplayFavouraites />} />
          <Route path="/featuredPlaylists" element={<FeaturedPlaylists />} />
          <Route path="/customPlaylists" element={<CustomPlaylists />} />
          <Route path="/customPlaylists/:id" element={<SelectPlaylistsData />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
