import { useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


const GetPlaylists = () => {
  const navigate = useNavigate();
    const [playList, setPlayList] = useState([]);

    useEffect(() => {
      const token = localStorage.getItem("user-token")
        if(token !== null){
          getPlaylist();
        }
        else{
            navigate("/home");
        }
    },[])

    const getPlaylist = () => {
        const spotifyToken = localStorage.getItem("spotify-token");
        const url = `https://api.spotify.com/v1/me/playlists`;
        const headers = {
        headers: {
            Authorization: `Bearer ${spotifyToken}`,
        },
        };

        axios.get(url, headers).then((res) => {
        setPlayList(res.data.items);
        console.log("playlists = ", playList);
        });
    }

    return (
        <div className="bg-getPlaylists bg-center bg-cover bg-fixed min-h-screen text-white">
          <Navbar />
          <div className="grid place-items-center">
            <h1 className="text-4xl md:text-6xl font-bold text-center md:mb-10 mt-5">Your Spotify Playlists 🎧</h1>
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-10 m-5">
              {playList.map((playlist) =>  {
                return (
                  <div className="rounded-lg grid place-items-center gap-10 m-5 md:m-0 grid-cols-2 bg-gray-300 p-8 bg-opacity-20 bg-clip-padding backdrop-blur-sm" key={playlist.id}>
                    <div>
                      <img className="h-32 md:h-44 mb-5 rounded-md" src={playlist.images[0].url} alt="" />
                    </div>
                    <div>
                      <div className="text-2xl">{playlist.name}</div>
                      <p className="text-sm italic mt-3 line-clamp-2">{playlist.description}</p>
                      <button className="bg-none border-2 border-green-400 rounded-md xl:mt-7 px-10 py-2 text-white hover:bg-green-400 transition"><a className="linkBtn" href={playlist.external_urls.spotify}>Open Playlist</a></button>
                    </div>
                  </div>
                )
              })}
            </div>
            {playList.length === 0 && <div>You do not have any spotify playlists</div> }
          </div>
          </div>
        </div>
    )
}

export default GetPlaylists