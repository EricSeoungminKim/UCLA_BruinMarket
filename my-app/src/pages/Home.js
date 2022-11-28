import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
          <h1>UCLA CS35L Project</h1>
          <NavLink to="/aboutus" className="linkmenuItem">
            Learn more ➜
          </NavLink>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default Home;
