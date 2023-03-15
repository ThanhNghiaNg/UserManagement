import React from "react";
import CustomeLayout from "./Layout/Layout";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from './pages/Home'
const App = () => {
  const isLoggedIn = !!useSelector((state) => state.auth.token);
  // const isLoggedIn = true;
  return (
    <>
      {!isLoggedIn && (
        <>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </>
      )}
      {isLoggedIn && (
        <CustomeLayout>
          <Routes>
          <Route path="/" element={<Home />} />
            <Route path="/users" element={<Home />} />
          </Routes>
        </CustomeLayout>
      )}
    </>
  );
};
export default App;
