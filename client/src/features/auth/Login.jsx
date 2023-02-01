import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";

const Login = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setErrMsg("");
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      navigate("/");
    } catch (err) {
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
    }
  };

  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePasswordInput = (e) => setPassword(e.target.value);

  return (
    <div className="w-full h-[calc(100vh-60px)] flex justify-center items-center bg-orange-300">
      <div className="w-full h-full sm:w-[650px] sm:h-[500px] md:w-[800px] md:h-[500px] flex flex-col sm:flex-row pt-10 sm:pt-0 gap-4 rounded-none sm:rounded-2xl drop-shadow-lg bg-white">
        <div className="flex flex-col flex-1 px-10 justify-center items-center gap-8">
          <h1 className="font-semibold text-4xl">Login</h1>
          <form
            className="w-full px-5 flex flex-col items-center gap-4"
            onSubmit={handleSubmit}
          >
            <input
              ref={emailRef}
              type="text"
              name="email"
              placeholder="User Email"
              required
              className="w-full px-4 py-2 bg-gray-200 rounded-md"
              onChange={handleEmailInput}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-2 bg-gray-200 rounded-md"
              onChange={handlePasswordInput}
            />
            {isLoading && <p>Loading</p>}
            {errMsg && !isLoading && <p className="text-rose-600">{errMsg}</p>}
            <button
              className="px-5 py-1 text-lg text-white font-medium bg-emerald-400 rounded-lg"
              disabled={isLoading}
            >
              Login
            </button>
          </form>
        </div>
        <div className="flex flex-col flex-1 px-10 justify-center items-center gap-6 bg-gradient-to-r from-emerald-200 to-emerald-500">
          <h2 className="font-medium text-3xl text-white">Signup</h2>
          <p className="text-center text-gray-600">
            Sign up here if you don't have account
          </p>
          <Link
            to="/register"
            className="px-5 py-1 text-lg text-white font-medium bg-transparent border-2 border-solid border-white rounded-lg"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
