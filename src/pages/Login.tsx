import tiaLogo from "../assets/tia-logo.jpeg";
import lock from "../assets/lock.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { login } from "../redux/userSlice";
import Slider from "../components/Slider";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!email || !password)
      return toast.error("Please fill in all the fields");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/auth/login`,
        { email, password }
      );

      const {
        name,
        email: userEmail,
        password: userPassword,
        isAdmin,
        loginCount,
        isActive,
      } = response.data.user;

      dispatch(
        login({
          name,
          email: userEmail,
          password: userPassword,
          isAdmin,
          loginCount,
          isActive,
        })
      );
      toast.success(response.data.message);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
        setIsLoading(false);
      } else {
        toast.error("Unexpected Error");
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="rounded-xl h-4/5 max-w-[600px] w-full overflow-hidden flex justify-center ">
        <div className=" h-full flex justify-center items-center bg-neutral-200 max-sm:hidden flex-1">
          <Slider />
        </div>
        <form onSubmit={handleSubmit} className="p-5 h-full flex-1 bg-white max-sm:flex-none">
          <img src={tiaLogo} alt="logo" className="w-[220px] my-2 mx-auto" />
          <div className="min-w-[220px]">
            <hr />
            <h2 className="text-xl font-bold my-4">Login</h2>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-b-2 w-full text-neutral-500 outline-none p-1 text-xs mb-4 focus:border-neutral-400 hover:border-emerald-800"
            />
            <div className="relative">
              <input
                type={visible ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-b-2 text-neutral-500 pr-6 w-full outline-none p-1 mb-4 text-xs focus:border-neutral-400 hover:border-emerald-800"
              />
              <img
                onClick={() => setVisible(!visible)}
                src={lock}
                alt="Password toggle button"
                className="w-4 absolute cursor-pointer right-1 top-1 opacity-50"
              />
            </div>
            <button
              disabled={isLoading}
              className={`bg-emerald-900 text-white text-sm mb-2 font-semibold w-full py-2 rounded ${isLoading ? "opacity-50" : "opacity-100"
                }`}>
              {isLoading ? "Loading..." : "Login"}
            </button>
            <p className="text-xs text-neutral-500">
              Don't have an Account?{" "}
              <Link to="/register" className="text-blue-700 cursor-pointer">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
