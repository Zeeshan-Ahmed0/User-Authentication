import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Error, Success } from "./Toasts";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const Signup = () => {
  const [loginInfo, setLoginInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });

    // Validation on the fly
    if (name === "name" && (value.length < 4 || value.length > 25)) {
      setErrors({
        ...errors,
        name: "Name must be between 4 and 25 characters.",
      });
    } else if (name === "password" && (value.length < 4 || value.length > 25)) {
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

  const handleSignUp = async () => {
    try {
      let response = await axios.post(
        "https://user-authentication-api.vercel.app//auth/signup",
        loginInfo
      );
      console.log(response);
      Success("Singup Successful!");
    } catch (error) {
      if (error.response && error.response.status == 409) {
        return Error("This email already exists.")
      }
      Error("something went wrong please try again!")
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.email &&
      !errors.password &&
      loginInfo.name &&
      loginInfo.email &&
      loginInfo.password
    ) {
      handleSignUp();
    } else {
      return Error("Kindly fill the form properly!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white font-roboto">
      <ToastContainer />
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-[90%] max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">SignUp</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={loginInfo.name}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:border-red-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>
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
            SignUp
          </button>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500 font-bold hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
