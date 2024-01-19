import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { Navigate, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";



const CustomPlaylists = () => {
    const navigate = useNavigate();
    const [newPlaylist, setNewPlaylist] = useState("")
    const [customPlaylists, setCustomPlaylists] = useState([])
    const token = localStorage.getItem("user-token")
    const spotifyToken = localStorage.getItem("spotify-token")

    useEffect(() => {
        const token = localStorage.getItem("user-token")
        if (token !== null) {
            getCustomPlaylists();
        }
        else {
            navigate("/home");
        }
    }, [spotifyToken])

    const createList = async (e) => {
        e.preventDefault();
        if (newPlaylist !== "") {
            console.log("newPlaylist=", newPlaylist);
            const res = await axios.post("https://musixx.onrender.com/createPlaylist", { newPlaylist }, {
                headers: {
                    token: token
                }
            })
            if (res.data.status === "ok") {
                getCustomPlaylists();
            }

        }
        setNewPlaylist("")
    }

    const getCustomPlaylists = () => {
        axios.get("https://musixx.onrender.com/getCustomPlaylists", {
            headers: {
                token: token
            }
        }).then((res) => {
            setCustomPlaylists(res.data);
            console.log("cuss=", res.data)
        })
    }

    const deletePlaylist = async (playlist) => {
        const res = await axios.post("https://musixx.onrender.com/deletePlaylist", { playlist }, {
            headers: {
                token: token
            }
        })
        if (res.data.status === "ok") getCustomPlaylists();
    }


    return (
        <div className="bg-customPlaylists bg-fixed bg-cover bg-center min-h-screen text-white relative">
            <Navbar />
            <div className="grid place-items-center">
                <h1 className="text-3xl md:text-4xl xl:text-7xl font-bold text-white mt-6">Your Custom Playlists</h1>
                <div>
                    <form className="w-56 xl:w-96 mt-4" onSubmit={createList}>
                        <div class="relative">
                            <input onChange={(e) => setNewPlaylist(e.target.value)} type="search" id="default-search" class="bg-gray-700 w-full px-4 py-2 rounded-md mt-2 outline-none" placeholder="Create playlist..." required />
                            <button type="submit" class="absolute right-0 bottom-0 px-3 py-1 m-1 text-white bg-blue-600 rounded-lg hover:bg-blue-900">Create</button>
                        </div>
                    </form>
                </div>
                <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-6 mt-10">
                    {customPlaylists.map((playlist) => {
                        const redirectUrl = `/customPlaylists/${playlist.playlist}`
                        return (
                            <div className="rounded-lg text-sm grid place-items-center bg-gray-300 p-8 bg-opacity-20 bg-clip-padding backdrop-blur-sm">
                                <h1 className="text-4xl">{playlist.playlist}</h1>
                                <p className="italic mt-3">Number of songs : {playlist.tracks.length}</p>
                                <div><button className="bg-none border-2 border-green-400 rounded-md mt-5 xl:mt-7 px-6 py-2 text-white hover:bg-green-400 transition"><a className="linkBtn" href={redirectUrl}>Open Playlist</a></button></div>
                                <button className="bg-none border-2 border-red-400 rounded-md mt-5 xl:mt-4 px-6 py-2  text-white hover:bg-red-400 transition" onClick={() => deletePlaylist(playlist.playlist)}>Delete Playlist</button>
                            </div>
                        )
                    })}
                </div>
                {customPlaylists.length === 0 && <div className="bg-gray-700 px-3 py-2 w-44 text-center rounded-md animate-bounce mt-10"><a href="/search">No Playlists created yet , Click here to add</a></div>}
            </div>
        </div>
    )
}

export default CustomPlaylists;