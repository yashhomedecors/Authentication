import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  // Use the navigate hook from react-router-dom for navigation
  const navigate = useNavigate();

  // Function to handle sign out
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("selectedShopId");
    navigate("/"); // Redirect to login page after signing out
  };

  // Retrieve the token and shop ID from local storage
  const token = localStorage.getItem("token");
  const shopId = localStorage.getItem("selectedShopId");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {/* Header */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
          <p className="mt-1 text-gray-600">Welcome back to the dashboard!</p>
        </div>

        {/* Token and Shop ID Information */}
        <div className="mb-6 w-1/2 relative">
          <p className="text-gray-800 w-1/3 max-w-52 text-wrap text">
            <span className="font-semibold">Your session token:</span> {token}
          </p>

          <p className="text-gray-800 mt-2">
            <span className="font-semibold">Your Shop ID:</span> {shopId}
          </p>
        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
