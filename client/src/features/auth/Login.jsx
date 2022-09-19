import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-orange-300">
      <div className="w-[800px] h-[500px] flex rounded-2xl drop-shadow-lg bg-white">
        <div className="flex flex-col flex-1 px-10 justify-center items-center gap-8">
          <h1 className="font-semibold text-4xl">Login</h1>
          <div className="w-10 h-10 flex justify-center items-center border-2 border-neutral-800 rounded-full">
            G
          </div>
          <form className="w-full px-5 flex flex-col items-center gap-4">
            <input
              type="text"
              name="email"
              placeholder="User Email"
              className="w-full px-4 py-2 bg-gray-200 rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 bg-gray-200 rounded-md"
            />
            <button className="mt-4 px-5 py-1 text-lg text-white font-medium bg-emerald-400 rounded-lg">
              Login
            </button>
          </form>
        </div>
        <div className="flex flex-col flex-1 px-10 justify-center items-center gap-6 bg-gradient-to-r from-emerald-200 to-emerald-500">
          <h2 className="font-medium text-3xl text-white">Signup</h2>
          <p className="text-gray-600">
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
