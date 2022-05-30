import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Search = () => {
    const navigate = useNavigate();


    const [track, setTrack] = useState();
    const [similarTracks, setSimilarTracks] = useState([]);
    const [customPlaylists, setCustomPlaylists] = useState([])

    useEffect( () => {
        const token = localStorage.getItem("user-token")
        if(token !== null){
            getPlaylistInfo();
        }
        else{
            navigate("/home");
        }
    },[])
    
    const getPlaylistInfo = () => {
        console.log("calleeddd!!");
        const token = localStorage.getItem("user-token")
        axios.get("https://musixxxx.herokuapp.com/getCustomPlaylists",{
            headers : {
                token : token
            }
        }).then((res) => {
            setCustomPlaylists(res.data);
        })
    } 

    const getTrack = (e) => {
        e.preventDefault();
        const spotifyToken = localStorage.getItem("spotify-token");
        console.log("spotifyToken= ",spotifyToken)
        const url = "https://api.spotify.com/v1/search?q="+track+"&type=track";
        // console.log("url = ", url);
        const headers = {
        headers: {
            Authorization: `Bearer ${spotifyToken}`,
        },
        };

        axios.get(url, headers).then((res) => {
            setSimilarTracks(res.data.tracks.items)
        });
        setTrack("");
    }

    const addFav = async (track) => {
        const trackData = {
            "id" : track.id,
            "songName" : track.name,
            "img" : track.album.images[0].url,
            "songLink" : track.external_urls.spotify,
            "movieName" : track.album.name,
            "preview" : track.preview_url
        }
        const token = localStorage.getItem("user-token")
        const res = await axios.post('https://musixxxx.herokuapp.com/addFavs' , trackData , {
            headers : {
                token : token
            }
        })
        if(res.data.status === "ok"){
            alert("Added successfully")
        }
        console.log("Track=",trackData)
    }

    const removeFav = async (id) => {
        const token = localStorage.getItem("user-token")
        const res = await axios.post('https://musixxxx.herokuapp.com/removeFavs' , {id} , {
            headers : {
                token : token
            }
        })
        console.log("Res=",res)
    }

    const addToCustomPlaylist = async (track,playlist) => {
        console.log("track=",track);
        console.log("e=",playlist.target.value);
        const token = localStorage.getItem("user-token")
        const data = {
            track : track,
            playlist : playlist.target.value
        }
        const res = await axios.post("https://musixxxx.herokuapp.com/addTrackToPlaylist",data,{
            headers : {
                token : token
            }
        })
        if(res.data.status === "ok"){
            console.log(res);
            alert(res.data.message)
        }
    }

    return (
        <div className="bg-searchPage bg-cover bg-fixed bg-center min-h-screen text-white">
        <Navbar/>
        <div className="grid place-items-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mt-6">Search song</h1>
          <div>
                <form className="w-56 xl:w-96 m-8" onSubmit={getTrack}>   
                    <div class="relative ">
                        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        </div>
                        <input onChange={(e) => setTrack(e.target.value)}  type="search" id="default-search" class="outline-none text-black block p-4 pl-10 w-full text-sm bg-gray-200 rounded-lg border-none" placeholder="Search song..." required />
                        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2">Search</button>
                        
                    </div>
                </form>
          </div>
           <div className="grid grid-cols-1 xl:gap-12 gap-5 md:grid-cols-2 m-10 lg:grid-cols-3">
               {similarTracks.map((track) => {
                    return (
                        <div className="rounded-lg text-sm grid place-items-center bg-gray-300 p-8 bg-opacity-20 bg-clip-padding backdrop-blur" key={track.id}>
                            <div className="grid grid-cols-2 gap-5">
                                <div>
                                    <img src={track.album.images[0].url} className="xl:h-44 md:h-32 h-28 rounded-md" height="200px" alt=""/>
                                </div>
                                <div>
                                    <div className="md:text-3xl text-xl mb-3 text-white line-clamp-3">{track.name}</div>
                                    <div className="text-sm italic"><a href={track.preview_url} target="_blank" className="linkBtn">Listen Preview 🎧</a></div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                                    <button className="bg-none border-2 border-green-400 rounded-md xl:mt-7 md:px-6 px-3 py-2 text-white hover:bg-green-400 transition" onClick={() => addFav(track)}>Add to fav</button>
                                    <button className="bg-none border-2 border-green-400 rounded-md xl:mt-7 md:px-6 px-3 py-2 text-white hover:bg-green-400 transition"><a className="linkBtn" href={track.external_urls.spotify}>Open song</a></button>
                            </div>
                            <div>
                                <select className= "mt-4 bg-green-400 outline-0 border-2 border-green-400 rounded-md xl:mt-7 md:px-6 px-3 py-2 text-white hover:bg-green-400 transition" onChange={(playlist) => addToCustomPlaylist(track,playlist)}>
                                    <option value="" className="bg-white text-black">Add to Custom Playlists</option>
                                    {customPlaylists.map((playlist) => {
                                        return (
                                            <option key={playlist._id} className="bg-white text-black" value={playlist.playlist} >{playlist.playlist}</option>
                                            )
                                        })}
                                </select>
                            </div>
                            <button className="bg-none mt-4 border-2 border-red-400 rounded-md xl:mt-7 px-6 py-2 text-white hover:bg-red-400 transition" onClick={() => removeFav(track.id)}>Remove from fav</button><br />
                        </div>
                    // </div>
                    )
                })}
           </div>
        </div>
        </div>
    )
}

export default Search;