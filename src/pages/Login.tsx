import React, { useState } from "react";
import pb from "../pocketbase";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const authData = await pb
        .collection("users")
        .authWithPassword(email, password);
      const userId = authData.record.id;

      if (!userId) {
        throw new Error("User ID not found after login.");
      }

      console.log("Login successful, userId:", userId);
      navigate(`/${userId}`);
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-screen bg-gradient-to-b from-teal-500 to-teal-700 p-4">
      <div className="bg-white shadow-2xl rounded-xl p-8 max-w-md w-full mx-4">
        <div className="flex justify-center mb-8">
          <svg
            className="w-16 h-16 text-teal-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.332.773-4.5 2.05C10.832 3.773 9.26 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7 7-7z"
            ></path>
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-center mb-8 text-teal-800">
          Login Portal
        </h2>
        {error && (
          <p className="text-red-500 text-sm italic mb-6 text-center bg-red-50 p-3 rounded-lg">
            {error}
          </p>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-teal-800 text-sm font-semibold mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="shadow-sm border-2 border-teal-100 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-teal-800 text-sm font-semibold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="shadow-sm border-2 border-teal-100 rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-200 transition-all duration-200"
            />
          </div>
          <div className="flex flex-col space-y-4">
            <button
              type="submit"
              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 w-full"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="bg-white hover:bg-gray-50 text-teal-600 font-semibold py-3 px-6 rounded-lg border-2 border-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-all duration-200 w-full"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
