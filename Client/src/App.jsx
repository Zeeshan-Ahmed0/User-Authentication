import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Login from "./components/login";
import RefreshHandler from "./components/refreshHandler";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <div>
      <RefreshHandler setIsAuthenticated = {setIsAuthenticated}/> 
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute element={<Home />} />} />
      </Routes>
    </div>
  );
};

export default App;
