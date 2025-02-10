import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Error, Success } from "./Toasts";
import { ToastContainer } from "react-toastify";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      let response = await axios.get(
        "http://localhost:8000/products/get",
        headers
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    setUser(localStorage.getItem("userName"));
    getProducts();
  }, []);

  const handleLogout = (e) => {
    Success("Logged out Successfully");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  return (
    <main className="flex justify-center items-center gap-3 border h-screen flex-col text-2xl font-bold">
      <ToastContainer />
      <h1>Welcome {user}</h1>
      <button onClick={handleLogout} className="bg-red-500 p-4">
        LOGOUT
      </button>
      {products.map((item, index) => (
        <div key={index}>
          {index + 1}
          {item.name}
          <div>Price: {item.price}</div>
        </div>
      ))}
    </main>
  );
};

export default Home;
