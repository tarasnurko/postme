import { UserMinusIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { useSignupMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";

const Register = () => {
  const usernameRef = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [signup, { isLoading }] = useSignupMutation();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrMsg("");
      const { accessToken } = await signup({
        email,
        password,
        username,
      }).unwrap();
      dispatch(setCredentials({ accessToken }));
      navigate("/");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username, Email or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };

  const handleUsernameInput = (e) => setUsername(e.target.value);
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  return (
    <div className="w-full h-[calc(100vh-60px)] flex justify-center items-center bg-orange-300">
      <div className="w-full h-full sm:w-[650px] sm:h-[500px] md:w-[800px] md:h-[500px] flex flex-col sm:flex-row pt-10 sm:pt-0 gap-4 rounded-none sm:rounded-2xl drop-shadow-lg bg-white">
        <div className="flex flex-col flex-1 px-10 justify-center items-center gap-8">
          <h1 className="font-semibold text-4xl">Sign Up</h1>
          <form className="w-full px-5 flex flex-col items-center gap-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full px-4 py-2 bg-gray-200 rounded-md"
              onChange={(e) => handleUsernameInput(e)}
              ref={usernameRef}
            />
            <input
              type="text"
              name="email"
              placeholder="User Email"
              className="w-full px-4 py-2 bg-gray-200 rounded-md"
              onChange={(e) => handleEmailInput(e)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-200 rounded-md"
              onChange={(e) => handlePasswordInput(e)}
            />
            {isLoading && <p>Loading</p>}
            {errMsg && !isLoading && <p className="text-rose-600">{errMsg}</p>}
            <button
              className="mt-4 px-5 py-1 text-lg text-white font-medium bg-emerald-400 rounded-lg"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex flex-col flex-1 px-10 justify-center items-center gap-6 bg-gradient-to-r from-emerald-200 to-emerald-500">
          <h2 className="font-medium text-3xl text-white">Login</h2>
          <p className="text-center text-gray-600">
            Login if you already have an account
          </p>
          <Link
            to="/login"
            className="px-5 py-1 text-lg text-white font-medium bg-transparent border-2 border-solid border-white rounded-lg"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
