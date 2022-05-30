import axios from "axios";
import { useEffect ,useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


const FeaturedPlaylists = () => {
    const navigate = useNavigate();
    const [playlists , setPlaylists] = useState([])


    useEffect(() => {
        const token = localStorage.getItem("user-token")
        if(token !== null){
            getFeaturedPlaylistsData();
        }
        else{
            navigate("/home");
        }
    },[])
    
    const getFeaturedPlaylistsData = () => {
        const spotifyToken = localStorage.getItem("spotify-token");
        const url = "https://api.spotify.com/v1/browse/featured-playlists";
        const headers = {
            headers: {
                Authorization: `Bearer ${spotifyToken}`,
            },
        };
        axios.get(url , headers).then((res) => {
            setPlaylists(res.data.playlists.items);
        })
    }

    return (
        <div className=" font-Nunito min-h-screen bg-featuredPlaylists bg-fixed bg-cover">
            <Navbar/>
            <div className="grid place-items-center">
                <h1 className="text-4xl md:text-6xl font-bold text-white mt-6">Featured Playlists</h1>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 lg:gap-16 gap-10 md:mt-16 shadow-lg m-4">
                    {playlists.map((playlist) => {
                        return (
                            <div className="rounded-lg grid place-items-center bg-gray-700 p-8 bg-opacity-30 bg-clip-padding backdrop-blur-md m-5 md:m-0" key={playlist.id} >
                                
                                    <div><img className="h-44 mb-5 rounded-xl" src={playlist.images[0].url} alt="" height="200px"/></div>
                                    <div>
                                        <div className="text-3xl mb-3 text-white ">{playlist.name}</div>
                                        <div className="text-sm text-red-200 italic">{playlist.description}</div>
                                    </div>
                                <div><button className="bg-none border-2 border-red-400 rounded-md mt-7 px-10 py-2 text-white hover:bg-red-400 transition"><a className="linkBtn" href={playlist.external_urls.spotify} >Open</a></button></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default FeaturedPlaylists;