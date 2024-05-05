import React, { useState, useEffect } from "react";
import api from "./api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ShopSelection from "./ShopSelection"; // Import the ShopSelection component

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showShopSelection, setShowShopSelection] = useState(false);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null); // State variable for login error

  const navigate = useNavigate();

  // Check if a token exists in local storage and route to dashboard
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      navigate("/dashboard");
    }
  }, [navigate]);

  // Function to handle the login process
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Create login data object
    const loginData = {
      username,
      password,
    };

    try {
      // Make a POST request to the login endpoint
      const response = await api.post("/api/auth/sign-in", loginData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Log the response data for debugging
      console.log("Login response data:", response.data);

      // Save the token from response.data to local storage
      // Ensure to use the key 'token' to store the data
      localStorage.setItem("token", response.data);

      // Reset login error
      setLoginError(null);

      // After successful login, display the shop selection modal
      setShowShopSelection(true);
    } catch (error) {
      // Error handling
      if (axios.isAxiosError(error)) {
        // Set login error message
        setLoginError("Invalid username or password. Please try again.");
        console.error(
          "Failed to log in:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  // Function to handle shop selection
  const handleShopSelect = (shopId: string) => {
    // Store the selected shop ID in local storage
    localStorage.setItem("selectedShopId", shopId);
    setSelectedShopId(shopId);
    console.log(selectedShopId);
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-wrap">
      {/* Left side: Login form */}
      <div className="flex w-full flex-col md:w-1/2 p-6 lg:p-0 sm:p-2">
        <div className="flex pt-12 md:-mb-24 md:justify-start md:pl-12">
          <a className="border-b-gray-700 border-b-4 pb-2 text-2xl font-bold text-gray-900">
            Yash Home Decors
          </a>
        </div>
        <div className="lg:w-[28rem] mx-auto my-auto flex flex-col justify-center pt-8 md:justify-start md:px-6 md:pt-0">
          {/* Container for "Welcome back" text and image */}
          <div className="flex items-center justify-start">
            {/* "Welcome back" text */}
            <div className="text-left">
              <p className="text-3xl font-bold">Welcome back</p>
              <p className="mt-2 text-gray-500">Please enter your details.</p>
            </div>
            {/* Image */}
            <img
              src="https://ik.imagekit.io/yhd/DecorFlow/Icons/Logo.png"
              className="w-28 ml-4" // Add margin-left to separate the image from the text
              alt="Logo" // Add alt text for accessibility
            />
          </div>
          {/* Login form */}
          <form className="flex flex-col pt-3 md:pt-8" onSubmit={handleLogin}>
            <div className="flex flex-col pt-4">
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  type="text"
                  id="login-username"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-12 flex flex-col pt-4">
              <div className="focus-within:border-b-gray-500 relative flex overflow-hidden border-b-2 transition">
                <input
                  type="password"
                  id="login-password"
                  className="w-full flex-1 appearance-none border-gray-300 bg-white px-4 py-2 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {/* Login button */}
            <button
              type="submit"
              className="w-full rounded-lg bg-gray-900 px-4 py-2 text-center text-base font-semibold text-white shadow-md ring-gray-500 ring-offset-2 transition focus:ring-2"
            >
              Log in
            </button>
          </form>
          {/* Error message display */}
          {loginError && <div className="mt-4 text-red-600">{loginError}</div>}
          <div className="py-12 text-center">
            <p className="whitespace-nowrap text-gray-600">
              Don't have an account?
              <a
                href="#"
                className="underline-offset-4 font-semibold text-gray-900 underline"
              >
                Sign up for free.
              </a>
            </p>
          </div>
        </div>
      </div>
      {/* Right side: Image and text */}
      <div className="pointer-events-none relative hidden h-screen select-none bg-black md:block md:w-1/2">
        <div className="absolute bottom-0 z-10 px-8 text-slate-100 opacity-100">
          <p className="mb-8 text-3xl font-semibold leading-10">
            We work 10x faster than our competitors and stay consistent. While
            they're bogged down with technical debt, we're releasing new
            features.
          </p>
          <p className="mb-4 text-3xl font-semibold">Coding Devs</p>
          <p>Founder, Yash Jain</p>
          <p className="mb-7 text-sm opacity-70">Yash Home Decors</p>
        </div>
        <img
          className="-z-1 absolute top-0 h-full w-full object-cover opacity-90"
          src="https://ik.imagekit.io/yhd/DecorFlow/Login-bg.jpeg"
          alt="Background Image"
        />
      </div>
      {/* Shop Selection Modal */}
      <ShopSelection
        show={showShopSelection}
        onClose={() => setShowShopSelection(false)}
        onSelectShop={handleShopSelect}
      />
    </div>
  );
};

export default Login;
