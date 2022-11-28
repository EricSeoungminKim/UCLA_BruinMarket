import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

//could be deleted
function Footer() {
  return (
    <div className="footer-container">
      <div class="footer-links">
        <div className="footer-link-upperLeft">
          <Link to="/">
            <img src={logo} alt="logo" className="logoImage" />
          </Link>
        </div>
        <div className="footer-link-upperRight">
          <div class="footer-link-items">
            <span>BRUIN MARKET</span>
            <Link to="/">RENT</Link>
            <Link to="/">Buy / Sell</Link>
            <Link to="/">Trade</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
