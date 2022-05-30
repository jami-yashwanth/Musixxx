import {useEffect, useState} from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Navbar from '../pages/Navbar';


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // useEffect(() => {
  //   const token = localStorage.getItem("user-token");
  //   if (token !== null) {
  //     navigate("/home");
  //   }
  // });
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axios.post("https://musixxxx.herokuapp.com/login", {
          email,
          password,
        });
        if (res.data.status === "ok") {
          if (res.data.token) {
            localStorage.setItem("user-token", res.data.token);
            navigate("/spotifyAuth");
          }
        } else {
          alert(`${res.data.message}`);
        }
        setEmail("");
        setPassword("");
    }
    
    return (
      <div className="bg-searchPage min-h-screen">
        <Navbar />
        <div class="text-white min-h-screen md:grid md:place-items-center">
          <div class="rounded-lg md:w-96 bg-gray-700 p-8 bg-opacity-30 bg-clip-padding backdrop-blur-md m-10 mt-15 md:m-0">
            <h3 class="text-2xl font-bold text-center">
              Login to your account
            </h3>
            <form className='mt-5' onSubmit={handleSubmit}>
              <div >
                <div>
                  <label class="block" for="email">
                    Email
                  </label>
                  <input
                    value={email}
                    className="bg-gray-700 w-full px-4 py-2 rounded-md mt-2 outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div class="mt-4">
                  <label class="block">Password</label>
                  <input
                    type="password"
                    className="bg-gray-700 w-full px-4 py-2 rounded-md mt-2 outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div class="flex items-baseline justify-between mt-5 gap-2">
                  <button class="px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
                    Login
                  </button>
                  <a href="/register" class="text-sm italic text-blue-300 hover:cursor-pointer">
                    Don't have an account ?
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
}

export default Login;