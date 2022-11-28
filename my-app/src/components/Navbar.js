import React, { useState, useContext, useEffect } from "react";
import { NavLink, BrowserRouter as Router, Link } from "react-router-dom";
import logoImage from "../images/logoImage.png";
import logo from "../images/logo.png";
import DropDown from "./DropDown";
import AboutUsDropDown from "./AboutUsDropDown";
import { AccountContext } from "./Account";
import Pool from "../service/userPool";
import Dropdown from "rsuite/Dropdown";
import "rsuite/dist/rsuite.min.css";

const Navbar = () => {
  const [status, setStatus] = useState(false); //status : loggedin : true, if not: false
  const [user, setUser] = useState(null);

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) {
      user.signOut();
      setStatus(false);
      setUser(null);
      window.location.reload();
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
  });

  return (
    <nav className="navbar">
      <div className="logoImageWrapper">
        <Link to="/">
          <img src={logo} alt="logo" className="logoImage" />
        </Link>
      </div>
      <div className="navbarMenu">
        {/* <div>
          <NavLink to="/aboutus" className="linkmenuItem">
            About Us
          </NavLink>
        </div> */}
        <div className="dropDownMenu">
          <Dropdown title="ABOUT THIS PROJECT">
            <Dropdown.Menu title="How did we made?">
              <Dropdown.Item>Overall Structure</Dropdown.Item>
            </Dropdown.Menu>
            <Dropdown.Menu title="About US">
              <Dropdown.Item>Kelly Yu</Dropdown.Item>
              <Dropdown.Item>Seoungmin Kim</Dropdown.Item>
              <Dropdown.Item>emily Nham</Dropdown.Item>
              <Dropdown.Item>Lana Lim</Dropdown.Item>
              <Dropdown.Item>John Hsu</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <div className="dropDownMenu">
          <Dropdown title="BRUIN MARKET">
            <Dropdown.Item>Rent</Dropdown.Item>
            <Dropdown.Item>Buy / Sell</Dropdown.Item>
            <Dropdown.Item>Trade</Dropdown.Item>
          </Dropdown>
        </div>

        <div>
          {status ? (
            <NavLink to="/myprofile" className="linkmenuItem">
              My Profile
            </NavLink>
          ) : (
            <NavLink to="/loginsignup" className="linkmenuItem">
              Login / Sign Up
            </NavLink>
          )}
        </div>

        <div>
          {status ? (
            <span className="linkmenuItem" onClick={logout}>
              Log out
            </span>
          ) : (
            ""
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
