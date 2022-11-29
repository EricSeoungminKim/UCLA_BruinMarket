import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import { auth } from "./service/firebase"
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import LoginSignup from "./pages/LoginSignup";
import Profile from "./pages/Profile";
import Timeline from "./pages/Timeline";
import CreatePost from "./pages/CreatePost";

import logo from "./images/logo.png";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";
import { signOut } from "firebase/auth";

function App({ userRepository }) { 
  const [isAuth, setIsAuth] = useState(false); // is the person logged in?

  const signUserOut = () => {
    signOut(auth).then (() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = "/"
    });
  };
  
  return (
    <BrowserRouter>
       <nav className="navbar">
        <div className="logoImageWrapper">
          <Link to="/">
            <img src={logo} alt="logo" className="logoImage" />
          </Link>
        </div>
        <div className="navbarMenu">
          <NavLink to="/" className="linkmenuItem">
            Home
          </NavLink>
          <NavLink to="/aboutus" className="linkmenuItem">
            About Us
          </NavLink>

          {isAuth ? (
            <div className="dropDownMenu">
              <Dropdown title="Buy/Sell">
                <Dropdown.Item as={Link} to="/myprofile"> My Profile </Dropdown.Item>
                <Dropdown.Item as={Link} to="/createpost">Create a Post</Dropdown.Item>
                <Dropdown.Item as={Link} to="/timeline"> Timeline </Dropdown.Item>
              </Dropdown>
            </div>
          ) : (
            ""
          )}

          {isAuth ? (
            <button onClick={signUserOut}> Log Out </button>
          ) : (
            <NavLink to="/login" className="linkmenuItem">
              Login / Sign Up
            </NavLink>
          )}

        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route
          path="/login"
          element={<LoginSignup setIsAuth={setIsAuth} />}
        />
        <Route path="/myprofile" element={<Profile />} />
        <Route path="/timeline" element={<Timeline isAuth={isAuth}/>} />
        <Route 
          path="/createpost" 
          element={<CreatePost isAuth={isAuth}/>} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;