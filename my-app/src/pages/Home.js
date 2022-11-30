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
        <View className="homepageBannerTitle">
          <Text style={styles.title}>Welcome to{"\n"}Bruin Marketplace!</Text>
          <NavLink to="/aboutus" className="linkmenuItem" style={styles.button}>
            Learn more ➜
          </NavLink>
        </View>
      </div>
    </React.Fragment>
  );
}

const styles=StyleSheet.create({

  title:{
    fontSize: 60,
    fontWeight: 500,
    marginTop: 40,
    marginRight: 40,
    alignSelf: 'flex-end',
    fontFamily: "LoveloBlack",
    color: "white",
    textAlign: "right"
  },

  button: {
    margin: 20,
    marginRight: 40,
    alignSelf: "flex-end"
  }

})

export default Home;
