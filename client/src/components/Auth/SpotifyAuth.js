import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";

const SpotifyAuth = () => {
    const navigate = useNavigate();

    // Credentials from spotify API dashboard
    const client_id = "ea3c062af2ec43fa895909ddd02bbb9c";
    const Authorize = "https://accounts.spotify.com/authorize";
    const redirect_uri = "https://musixxx.netlify.app/";
    // const redirect_uri = "http://localhost:3000/home";

    const handleClick = () => {
        const url = `${Authorize}?client_id=${client_id}&redirect_uri=${encodeURI(redirect_uri)}&response_type=token&scope=playlist-read-private`;
        window.location.href = url;
    }

    useEffect(() => {
        const token = localStorage.getItem("user-token");
        const spotifyToken = localStorage.getItem("spotify-token")
        if (token !== null && spotifyToken !== null) {
            navigate("/home");
        }
    })

    return (
      <div className="bg-spotifyAuth bg-cover bg-center bg-fixed min-h-screen  text-white">
        <Navbar />
        <div className="bg-spotifyAuth bg-center bg-cover bg-fixed min-h-screen text-white md:grid md:place-items-center">
          <div className="rounded-lg text-sm md:grid md:place-items-center bg-gray-300 p-8 bg-opacity-20 bg-clip-padding m-10 backdrop-blur-0">
            <div className="text-4xl font-bold">
              Authorize your spotify
              <p className="text-sm italic font-normal mt-1">Enjoy the app 😎</p>
            </div>
            <button
              onClick={handleClick}
              className="bg-none mt-5 border-2 mb-8 border-green-400 rounded-md xl:mt-7 px-6 py-2 text-white hover:bg-green-400 transition"
            >
              Authorize Spotify
            </button>
            <div className="mt-5 ">
              ⭐ Sorry for inconvenience , for the time being use these spotify crediantials to log in <br />
              <div className="">➡️ Email : <span className="font-bold italic">testmusixxx@gmail.com</span> <br />
              ➡️ Password : <span className="italic font-bold">test12345</span></div>
            </div>
            <div className="mt-5">
              I have requested spotify for the multiple user access , it takes more than 6 weeks of time <br /> to get verified . Until then use the above credentials 😄
            </div>
            {/* <div>
              <p>
                Note :{" "}
                <span className="italic">
                  Don't Worry , Your spotify credentials will be safe !!! 😄
                </span>
              </p>
            </div> */}
            <div className="mt-5 cursor-pointer">
              {" "}
              <a href="https://developer.spotify.com/documentation/general/guides/authorization/" target="_blank">
                  Click here to know more about spotify authorization 🔗
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}

export default SpotifyAuth;