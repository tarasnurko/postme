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
      <div className="container mx-auto px-20 flex items-center h-full">
        <div className="font-jakarta text-2xl font-semibold">Postme</div>
        <ul className="w-full flex items-center justify-end gap-6 text-base font-medium">
          <li>
            <Link to="/" className="flex items-center gap-2 hover:underline">
              <p>Main</p>
              <NewspaperIcon className="w-6 h-6" />
            </Link>
          </li>

          <li>
            <Link to="/" className="flex items-center gap-2 hover:underline">
              <p>Search</p>
              <MagnifyingGlassIcon className="w-6 h-6" />
            </Link>
          </li>

          <li>
            <Link to="/" className="flex items-center gap-2 hover:underline">
              <p>About</p>
              <InformationCircleIcon className="w-6 h-6" />
            </Link>
          </li>

          <li>
            {!isAuthorized ? (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-1 bg-blue-600 text-white rounded-lg transition ease-in-out bg duration-700 hover:bg-blue-800"
              >
                <p>Login</p>
                <LockClosedIcon className="w-6 h-6" />
              </Link>
            ) : (
              <Link
                to={`users/${userId}`}
                className="flex items-center gap-2 hover:underline"
              >
                <p>{username}</p>
                <UserCircleIcon className="w-6 h-6" />
              </Link>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
