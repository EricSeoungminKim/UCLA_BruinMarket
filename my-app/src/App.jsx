import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import LoginSignup from "./pages/LoginSignup";
import Profile from "./pages/Profile";
import Timeline from "./pages/Timeline";
import CreatePost from "./pages/CreatePost";

function App({ userRepository }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route
          path="/loginsignup"
          element={<LoginSignup userRepository={userRepository} />}
        />
        <Route path="/myprofile" element={<Profile />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route 
          path="/createpost" 
          element={<CreatePost />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
