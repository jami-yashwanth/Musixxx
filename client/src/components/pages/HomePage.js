import { useEffect, useState } from "react";
// import "./HomePage.css";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const HomePage = () => {
  const quotes = ["Without Music ,Life would be a mistake",
  "Where words leave off, music begins",
  "Music, once admitted to the soul, becomes a sort of spirit, and never dies",
  "Music is healing. Music holds things together",
  "Music is the strongest form of magic",
  'Music acts like a magic key, to which the most tightly closed heart opens.',
  'Music is the literature of the heart; it commences where speech ends.']
  const [token , setToken] = useState("");
  const [spotifyToken, setSpotifyToken] = useState("");
  const [randIdx,setRandIdx] = useState(0);
  

  const navigate = useNavigate();

  useEffect(() => {
      setInterval(() => {
        setRandIdx(Math.floor(Math.random() * quotes.length))
      },5000)
      if(window.location.hash){
        const hash = window.location.hash;
        const access_token = hash.split("&")[0].split("=")[1];
        localStorage.setItem("spotify-token", access_token);
        navigate("/home");
      }
      setSpotifyToken(localStorage.getItem("spotify-token"));
      setToken(localStorage.getItem("user-token"));
  },[])

  return (
    <div className="bg-searchPage bg-cover bg-center bg-fixed min-h-screen  text-white">
      <Navbar />
      <div className="md:grid md:place-items-center md:grid-cols-2 min-h-screen relative">
        <div className="mt-0 mx-6 md:mx-0 md:mt-0">
          <div className="text-5xl md:text-6xl font-bold pt-16">Listening is <p className="mt-3">everything</p></div>
          <div className="text-sm md:text-md italic mt-5">Search Millions of songs and enjoy the best collection</div>
        </div>
        <div className="ml-5 mt-20 md:mt-0">
          <h1 className="text-3xl font-bold">Features Available</h1>
          <div className="mt-6 md:mt-8">
            <p className="mt-2 md:mt-5 hover:animate-bounce">➡️ Search any Song</p>
            <p className="mt-2 md:mt-5 hover:animate-bounce">➡️ Create your Custom playlists</p>
            <p className="mt-2 md:mt-5 hover:animate-bounce">➡️ Save to your Favourites</p>
            <p className="mt-2 md:mt-5 hover:animate-bounce">➡️ Get your Spotify playlists</p>
            <p className="mt-2 md:mt-5 hover:animate-bounce">➡️ Spotify featured playlists</p>
          </div>
        </div>
        {!token && 
          <div className="lg:hidden absolute top-3 right-2 text-center px-3 py-1 rounded-full bg-white text-red-300">
            <a href="/login">Login</a>
          </div>
        }
      </div>
    </div>
  );
};

export default HomePage;
