import React from "react";
import { Link } from "react-router-dom";
import {
  MagnifyingGlassIcon,
  NewspaperIcon,
  InformationCircleIcon,
  LockClosedIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const { isAuthorized, userId, username } = useAuth();

  return (
    <header className="w-screen max-w-full mx-auto h-[60px] sticky top-0 z-30  bg-purple-100">
      <div className="w-full md:w-[700px] lg:w-[900px] sm:mx-auto px-10 md:px-0 flex items-center h-full">
        <Link
          to="/"
          className="hidden sm:inline font-jakarta text-2xl font-semibold"
        >
          Postme
        </Link>
        <ul className="w-full flex items-center justify-end gap-6 text-base font-medium">
          <li>
            <Link
              to="/"
              className="text-sm sm:text-base flex items-center gap-2 hover:underline"
            >
              <p>Main</p>
              <NewspaperIcon className="w-4 h-4 sm:w-6 sm:h-6" />
            </Link>
          </li>

          <li>
            <Link
              to="/search"
              className="text-sm sm:text-base flex items-center gap-2 hover:underline"
            >
              <p>Search</p>
              <MagnifyingGlassIcon className="w-4 h-4 sm:w-6 sm:h-6" />
            </Link>
          </li>

          <li>
            {!isAuthorized ? (
              <Link
                to="/login"
                className="text-sm sm:text-base flex items-center gap-2 px-5 py-1 bg-blue-600 text-white rounded-lg transition ease-in-out bg duration-700 hover:bg-blue-800"
              >
                <p>Login</p>
                <LockClosedIcon className="w-4 h-4 sm:w-6 sm:h-6" />
              </Link>
            ) : (
              <Link
                to={`users/${userId}`}
                className="text-sm sm:text-base flex items-center gap-2 hover:underline"
              >
                <p>{username}</p>
                <UserCircleIcon className="w-4 h-4 sm:w-6 sm:h-6" />
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
