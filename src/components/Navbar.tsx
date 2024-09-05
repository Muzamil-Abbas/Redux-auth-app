import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { signOut } from "../redux/slices/authSlice";
import { FaHome, FaUser, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

const Navbar: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleSignOut = () => {
    dispatch(signOut());
  };

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-semibold hover:text-gray-300 transition-colors"
        >
          <FaHome className="inline-block mr-2" />
          Home
        </Link>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="flex items-center hover:text-gray-300 transition-colors"
              >
                <FaUser className="mr-2" />
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                <FaSignOutAlt className="mr-2" />
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/signin"
              className="flex items-center bg-green-600 px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              <FaSignInAlt className="mr-2" />
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
