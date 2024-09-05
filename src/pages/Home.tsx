import React from "react";

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to MyApp</h1>{" "}
      {/* Main heading */}
      <p className="text-lg mb-4">
        Your one-stop solution for managing your tasks efficiently.
      </p>{" "}
      {/* Introductory text */}
      <div className="bg-gray-100 p-6 rounded shadow-md">
        <h2 className="text-2xl font-semibold mb-2">What We Offer</h2>
        <ul className="list-disc pl-5">
          <li className="mb-2">
            Sign In to access your account and manage your data.
          </li>
          <li className="mb-2">
            Sign Up to create a new account and start using our services.
          </li>
          <li className="mb-2">
            Profile page to view and update your personal information.
          </li>
          <li>Sign Out when you're done to keep your account secure.</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
