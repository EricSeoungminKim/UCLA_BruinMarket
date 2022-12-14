import React, { Component } from "react";
import {StyleSheet, View, Text, Image} from "react-native";
import "../App.css"

class AboutUs extends Component {
  render(){
    return (
      <React.Fragment>
        <View>
          <Text style = {styles.title}>About Us</Text>
            <Text style = {styles.subtitle}>What is the Bruin Marketplace?</Text>
                <Text style = {styles.paragraph}>The Bruin Marketplace is a web application for Bruins to sell and/or purchase used items. After creating an account and signing in, users can list posts for sale or search through current listings. Users may comment on posts to communicate with the seller and negotiate a purchase.</Text>
                <Image style={{width: 300, height: 300, alignSelf: 'center'}} source={require('../images/uclaBruinsLogo.jpeg')} />
            <Text style = {styles.subtitle}>Mission Statement</Text>
              <Text style = {styles.paragraph}>Our goal is to promote eco-friendly shopping among the Bruin community. Made with the purpose of allowing students to sell their unwanted items, particularly at the end of the school year when students are moving out, we hope Bruins can find new homes for their items while saving money!</Text>
            <Text style = {styles.subtitle}>Rules and Privacy</Text>
                <Text style = {styles.paragraph}>Keep in mind that the posts and comments made by users are open to the public. Please be respectful, appropriate, and most importantly, do not share your private information on this website.</Text>
            <Text style = {styles.subtitle}>Creators</Text>
              <Text style = {styles.paragraph}> Lana Lim, Kelly Yu, Emily Nham, Seoungmin (Eric) Kim, John Hsu </Text>
        </View>
      </React.Fragment>
    );
  }
}

const styles=StyleSheet.create({

  title:{
    fontSize: 60,
    fontWeight: 500,
    margin: 20,
    marginTop: 40,
    alignSelf: 'center',
    fontFamily: "LoveloBlack"
  },

  subtitle:{
    fontSize: 26,
    fontWeight: 70,
    marginLeft: 20,
    padding: 10,
    fontFamily: "LoveloBlack"
  },

  paragraph:{
    fontSize: 18,
    fontWeight: 300,
    marginLeft: 20,
    padding: 10,
    marginBottom: 15
  }

})

export default AboutUs;