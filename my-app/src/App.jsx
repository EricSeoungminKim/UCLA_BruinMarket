import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import LoginSignup from "./pages/LoginSignup";
import Profile from "./pages/Profile";

function App({ userRepository }) {
  console.log("@app.jsx, userRepository: ", userRepository);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="aboutus" element={<AboutUs />} />
        <Route
          path="/loginsignup"
          element={<LoginSignup userRepository={userRepository} />}
        />
        <Route path="myprofile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
