import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Error, Success } from "./Toasts";

const Login = () => {
  const Navigate = useNavigate()
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });

    // Validation on the fly
    if (name === "password" && (value.length < 4 || value.length > 25)) {
      setErrors({
        ...errors,
        password: "Password must be between 4 and 25 characters.",
      });
    } else if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors({ ...errors, email: "Invalid email address." });
    } else {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleLogin = async () => {
    try {
      let response = await axios.post(
        "http://localhost:8000/auth/login",
        loginInfo
      );
      const { success, message, jwtToken, name } = response.data;
      if (success) {
        Success("Login Successful!");
        localStorage.setItem("token", jwtToken)
        localStorage.setItem("userName", name)
        Navigate("/home")
      }
      
    } catch (error) {
      if (error.response) {
        return Error(error.response.data.message);
      }
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !errors.email &&
      !errors.password &&
      loginInfo.email &&
      loginInfo.password
    ) {
      handleLogin();
    } else {
      alert("Please fix the errors before submitting.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white font-roboto">
      <ToastContainer />
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-[90%] max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4"></div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={loginInfo.email}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={loginInfo.password}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-500 font-bold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
