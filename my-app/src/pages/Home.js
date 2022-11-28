import React from "react";
import Navbar from "../components/Navbar";
import roycehall from "../images/roycehall.jpeg";
import { NavLink, BrowserRouter as Router, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faInstagram } from "@fortawesome/free-brands-svg-icons";

function Home() {
  return (
    <React.Fragment>
      <Navbar />
      <div
        className="homepageBanner"
        style={{ backgroundImage: `url(${roycehall})` }}
      >
        <div className="homepageBannerTitle">
          <h1>Bruin Marketplace</h1>
          <NavLink to="/aboutus" className="linkmenuItem">
            Learn more ➜
          </NavLink>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
