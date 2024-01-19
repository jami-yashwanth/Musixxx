import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

const SelectPlaylistsData = () => {
    const [playlistInfo, setPlaylistInfo] = useState("");
    const currPlaylist = window.location.pathname.split('/')[2];

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        const token = localStorage.getItem("user-token");
        axios.get("https://musixx.onrender.com/getCustomPlaylists", {
            headers: {
                token: token
            }
        }).then((res) => {
            res.data.map((playlist) => {
                if (playlist.playlist === currPlaylist) {
                    setPlaylistInfo(playlist)
                    console.log("pal=", playlist)
                }
            })
        })
    }

    const removeFromPlaylist = async (playlist, trackName) => {
        console.log("cuu=", playlist);
        const token = localStorage.getItem("user-token");
        const res = await axios.post("https://musixx.onrender.com/removeFromPlaylist", { playlist, trackName }, {
            headers: {
                token: token
            }
        })
        // console.log(res);
        if (res.data.status === "ok") getData();
    }

    return (
        <div className="bg-customPlaylists bg-fixed bg-cover bg-center min-h-screen text-white">
            <Navbar />
            <div className="grid place-items-center">
                <h1 className="text-4xl md:text-6xl font-bold mt-5">Playlist {currPlaylist}</h1>
                <div className="container1">
                    {playlistInfo !== "" &&
                        <>
                            <div className="grid place-items-center xl:grid-cols-3 sm:grid-cols-2 gap-6 mt-10 m-10">
                                {playlistInfo.tracks.length !== 0 && playlistInfo.tracks.map((track) => {
                                    return (
                                        <div className="rounded-lg text-sm grid place-items-center bg-gray-300 p-8 bg-opacity-20 bg-clip-padding backdrop-blur">
                                            <div><img className="xl:h-44 md:h-32 h-28 rounded-md" src={track.album.images[0].url} height="200px" alt="" /></div>
                                            <p className="text-3xl md:text-4xl mt-5">{track.name}</p>
                                            <p className="italic text-red-200">{track.album.name}</p>
                                            <button className="bg-none border-2 border-green-400 rounded-md mt-5 xl:mt-7 px-6 py-2 text-white hover:bg-green-400 transition"><a className="linkBtn" href={track.external_urls.spotify}>Open</a></button>
                                            <button className="bg-none border-2 border-red-400 rounded-md mt-5 xl:mt-4 px-6 py-2  text-white hover:bg-red-400 transition" onClick={() => removeFromPlaylist(currPlaylist, track.name)}>Remove from Playlist</button>
                                        </div>
                                    )
                                })}
                            </div>
                            <div>
                                {playlistInfo.tracks.length === 0 &&
                                    <div className="grid place-items-center">
                                        {/* <div className="text-4xl text-center p-2">No Songs Added Yet!!</div> */}
                                        <button class="text-white animate-bounce w-40 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 hover:animate-none"><a href="/search">No songs added , Click here to add Songs</a></button>
                                    </div>
                                }
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default SelectPlaylistsData;