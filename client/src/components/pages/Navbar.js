import { useState } from "react";
import { Link } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";


const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("user-token")
    const spotifyToken = localStorage.getItem("spotify-token")
    const [toggle,setToggle] = useState(false)

    const Logout = () => {
        localStorage.clear();
        navigate("/home")
    }

    return (
        <div>
          {token && spotifyToken ? (
            <nav class="bg-transparent px-2 sm:px-4 py-2.5 text-white">
                <div class="container flex flex-wrap justify-between items-center mx-auto">
                <a href="/home" class="flex items-center">
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Musixxx</span>
                </a>
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto">
                  <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                    <Link to="/search" className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">Search</Link>
                    <Link to="/displayFavs"  className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">My Favourites</Link>
                    <Link to="/customPlaylists"  className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">My Playlists</Link>
                    <Link to="/featuredPlaylists"  className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">Featured Playlists</Link>
                    <Link to="/getPlaylists"  className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">My Spotify Playlists</Link>
                  </ul>
                </div>
                <div class="hidden lg:flex lg:items-center">
                  <button onClick={Logout} className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">Log out</button >
                </div>
                <div className="sm:flex sm:items-center lg:hidden">
                  {!toggle ? <button onClick={() => setToggle(!toggle)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button> :
                  <button onClick={() => setToggle(!toggle)}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg></button> 
                  }
                </div>
              </div>
                {toggle &&
                <div class="grid place-items-center">
                  <ul class="flex flex-col mt-4 lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium">
                    <Link to="/search" className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">Search</Link>
                    <Link to="/displayFavs"  className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">My Favourites</Link>
                    <Link to="/customPlaylists"  className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">My Playlists</Link>
                    <Link to="/featuredPlaylists"  className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">Featured Playlists</Link>
                    <Link to="/getPlaylists"  className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">My Spotify Playlists</Link>
                    <Link to="/home"  className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300"><button onClick={Logout} >Log out</button></Link>
                  </ul>
              </div>
                }
          </nav>
          ) : (
            <nav class="bg-transparent px-2 sm:px-4 py-2.5 text-white">
                <div class="container flex flex-wrap justify-between items-center mx-auto">
                <a href="/home" class="flex items-center">
                    <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white ml-4">Musixxx</span>
                </a>
                <div class="hidden justify-between items-center w-full lg:flex lg:w-auto">
                  <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                    <Link to="/home" className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">Home</Link>
                    <Link to="/displayFavs"  className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">About</Link>
                  </ul>
                </div>
                <div class="hidden lg:flex lg:items-center">
                  <Link to="/login"><button className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">Log in</button ></Link>
                  <Link to="/register"><button className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">Register</button ></Link>
                </div>
                <div className="sm:flex sm:items-center lg:hidden">
                  {!toggle ? <button onClick={() => setToggle(!toggle)}>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button> :
                  <button onClick={() => setToggle(!toggle)}><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg></button> 
                  }
                </div>
              </div>
                {toggle &&
                <div class="grid place-items-center">
                  <ul class="flex flex-col mt-4 lg:flex-row lg:space-x-8 lg:mt-0 lg:text-sm lg:font-medium">
                    <Link to="/search" className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">Home</Link>
                    <Link to="/displayFavs"  className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300">About</Link>
                    <Link to="/login"  className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300"><button onClick={Logout} >Log in</button></Link>
                    <Link to="/register"  className="hover:bg-white hover:transition p-2 rounded-full hover:text-red-300"><button onClick={Logout} >Register</button></Link>
                  </ul>
              </div>
                }
          </nav>
          )}   
        </div>
    )
}

export default Navbar;