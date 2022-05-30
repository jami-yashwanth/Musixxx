import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const DisplayFavouraites = () => {
    const navigate = useNavigate();

    const [favs,setFavs] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("user-token")
        if(token !== null){
            getData();
        }
        else{
            navigate("/home");
        }
    },[])

    const getData = () => {
        const token = localStorage.getItem("user-token")
        axios.get("https://musixxxx.herokuapp.com/getFavs",{
            headers : {
                token : token
            }
        }).then((res) => {
            setFavs(res.data.favs);
        });
    }

    const removeFav = async (id) => {
        const token = localStorage.getItem("user-token")
        const res = await axios.post('https://musixxxx.herokuapp.com/removeFavs' , {id} , {
            headers : {
                token : token
            }
        })
        if(res.data.status === "ok") getData();
    }

    return ( 
        <div className="bg-displayFavs min-h-screen font-Nunito bg-center bg-fixed bg-cover text-white">
            <Navbar/>
            <div className=" grid place-items-center">

            <h1 className="text-3xl md:text-4xl xl:text-7xl font-bold text-white mt-6">Your Favourites ❤️</h1>
            <div className="grid grid-cols-1 xl:gap-10 gap-5 md:grid-cols-2 m-10 xl:grid-cols-3">
                {favs.map((item) => {
                    return (
                        <div className="rounded-lg grid place-items-center bg-gray-300 p-5 bg-opacity-20 bg-clip-padding backdrop-blur-sm" key={item.id}>
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-2 place-items-center">
                                <div className="imageTrack">
                                    <img className="xl:h-32 md:h-32 h-28 rounded-md" src={item.img} alt=""/>
                                </div>
                                <div className="place-items-center">
                                    <div className="xl:text-2xl text-2xl mb-3 text-white">{item.songName}</div>
                                    <div className="text-white text-sm italic">Movie : {item.movieName}</div>
                                    <div className="mt-4 text-sm"><a href={item.preview} className="linkBtn" >Listen to Preview 🎧</a></div>
                                </div>
                                <button className="bg-none border-2 border-green-400 rounded-md xl:mt-7 px-10 py-2 text-white hover:bg-green-400 transition"><a href={item.songLink} className="linkBtn">Open</a></button>
                                <button className="bg-none border-2 border-red-400 rounded-md xl:mt-7 px-5 py-2 text-white hover:bg-red-400 transition" onClick={() => removeFav(item.id)}>Remove from fav</button>
                            </div>
                        </div>
                    )
                })}
            </div>
            {favs.length === 0 && <div className="bg-gray-700 px-3 py-2 w-44 text-center rounded-md animate-bounce"><a href="/search">No songs added yet , Click here to add</a></div>}
            </div>
        </div>
    )
}

export default DisplayFavouraites;