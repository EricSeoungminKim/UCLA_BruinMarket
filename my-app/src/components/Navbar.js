import React, { useState, useEffect } from "react";
import { NavLink, BrowserRouter as Router, Link } from "react-router-dom";
import logo from "../images/logo.png";
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
  );
};

export default Navbar;
