import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchCurrentUser } from "../redux/slices/authSlice"; // Import the fetchCurrentUser thunk

const Profile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, status, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // Fetch the current user when the component mounts
    if (!user) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, user]);

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === "failed" || error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800">
            {error || "Failed to load profile"}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-xl font-semibold text-gray-800">
            No user profile found
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto p-6 max-w-2xl bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          User Profile
        </h2>
        <div className="flex items-center space-x-6 mb-6">
          <img
            src={user.image || "https://via.placeholder.com/128"}
            alt="Profile"
            className="w-32 h-32 rounded-full border border-gray-300 object-cover"
          />
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Name:</span> {user.firstName}{" "}
              {user.lastName}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-semibold">Gender:</span> {user.gender}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
