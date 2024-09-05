import React from "react";
import { useDispatch } from "react-redux";
import { signOut } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../redux/store";

const SignOut: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Sign Out</h2>
      <button
        onClick={handleSignOut}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Sign Out
      </button>
    </div>
  );
};

export default SignOut;
