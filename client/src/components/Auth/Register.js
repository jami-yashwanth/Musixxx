import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../pages/Navbar";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [spotifyEmail, setSpotifyEmail] = useState("");
  const [spotifyPassword, setSpotifyPassword] = useState("");

  // useEffect(() => {
  //   const token = localStorage.getItem("user-token");
  //   if (token !== null) {
  //     navigate("/home");
  //   }
  // });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      email: email,
      password: password,
      username: userName,
      spotifyEmail: spotifyEmail,
      spotifyPassword: spotifyPassword,
    };
    const message = "Username or Email already taken !!!";
    const res = await axios.post("https://musixxxx.herokuapp.com/register", credentials);
    console.log("response = ", res);
    if (res.data.status !== "ok") {
      alert(message);
    } else {
      navigate("/login");
    }
    setEmail("");
    setPassword("");
    setUserName("");
    setSpotifyEmail("");
    setSpotifyPassword("");
  };

  return (
    <div className="bg-searchPage min-h-screen">
      <Navbar />
      <div class="text-white min-h-screen md:grid md:place-items-center">
        <div class="rounded-lg md:w-96 bg-gray-700 p-8 bg-opacity-30 bg-clip-padding backdrop-blur-md m-5 md:m-0">
          <h3 class="text-2xl font-bold text-center">Register</h3>
          <form onSubmit={handleSubmit}>
            <div class="mt-4">
              <label class="block">Username</label>
              <input
                type="text"
                placeholder="username"
                value={userName}
                className="bg-gray-700 w-full px-4 py-2 rounded-md mt-2 outline-none"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div class="mt-4">
              <div>
                <label class="block" for="email">
                  Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="bg-gray-700 w-full px-4 py-2 rounded-md mt-2 outline-none"
                />
              </div>
              <div class="mt-4">
                <label class="block">Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  className="bg-gray-700 w-full px-4 py-2 rounded-md mt-2 outline-none"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div class="flex items-baseline gap-4 justify-between mt-5">
                <button class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                  Register
                </button>
                <a
                  href="/login"
                  class="text-sm italic text-blue-300 hover:cursor-pointer"
                >
                  Already registered ?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
      {/* <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <label>User name</label>
        <input
          type="name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <label>Spotify email : </label>
        <input
          type="email"
          value={spotifyEmail}
          onChange={(e) => setSpotifyEmail(e.target.value)}
        />
        <br />
        <label>Spotify Password :</label>
        <input
          type="password"
          value={spotifyPassword}
          onChange={(e) => setSpotifyPassword(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">Register</button>
      </form> */}
    </div>
  );
};

export default Register;
