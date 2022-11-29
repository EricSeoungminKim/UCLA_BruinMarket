import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import LoginSignup from "./pages/LoginSignup";
import Profile from "./pages/Profile";
import Timeline from "./pages/Timeline";
import CreatePost from "./pages/CreatePost";

import logo from "./images/logo.png";
import Pool from "./service/userPool";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";

function App({ userRepository }) {
  const [status, setStatus] = useState(false); //status : loggedin : true, if not: false
  const [user, setUser] = useState(null);

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      setStatus(false);
      setUser(null);
      window.location.pathname = "/"
    }
  };

    // const { getSession, logout } = useContext(AccountContext);

    useEffect(() => {
      const user = Pool.getCurrentUser();
      if (user) {
        setUser(user);
        setStatus(true);
      } else {
        // console.log("No one logged-in yet");
      }
    }, []);  
  
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

          {status ? (
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

          {status ? (
            <span className="linkmenuItem" onClick={logout}>
              Log out
            </span>
          ) : (
            <NavLink to="/loginsignup" className="linkmenuItem">
              Login / Sign Up
            </NavLink>
          )}

        </div>
      </nav>
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
