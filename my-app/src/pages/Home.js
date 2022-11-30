import React from "react";
import roycehall from "../images/roycehall.jpeg";
import { NavLink, BrowserRouter as Router, Link } from "react-router-dom";
import {StyleSheet, View, Text, Image} from "react-native";
import "../App.css"

function Home() {
  return (
    <React.Fragment>
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
