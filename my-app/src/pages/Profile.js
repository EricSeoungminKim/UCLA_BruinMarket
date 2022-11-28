import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {StyleSheet, View, Text, Image} from "react-native";
// import "./Profile.css"

const name="FIRST LAST"
const year = "2024"
const major = "Computer Science"
const intro = "Hello, I like to sell things. Like a lot of things that can be sold. I sell things that sell to be sold. Selling things is very fun to me."
const rating = "5/5"

const title = "Chair"
const postDate = "11/27/22"
const updateDate = "11/27/22"
const status = "For Sale" //sale, trade, rent
const price = 19.00
const description = "Chair to sit in."

function Profile() {
  return (
    <React.Fragment>
      <Navbar /> 
      
      <View style={{flexDirection: 'row'}}>
          <View style={{flex:1}}>
            <Image style={{width: 300, height: 300, alignSelf: 'center'}} source={require('../images/user-image.png')} />
            <Text style={{alignSelf: 'center'}}> User Rating: {rating} </Text>
          </View>
          
          <View style={{flex:3}}>
            <Text style={styles.name}> {name} </Text>
            <Text style={styles.otherInfo}> Year: {year} </Text>
            <Text style={styles.otherInfo}> Major: {major} </Text>

            <View>
              <View>
                <Text style={styles.otherInfo}> Introduction: </Text>
              </View>
              <View style={{marginLeft: 60, flexShrink: 1}}>
                <Text style={styles.otherInfo}> {intro} </Text>
              </View>
            </View>
          </View>
          
      </View>

      <View>
        <Text style={styles.name}> Products: </Text>
      </View>

      <View style={{marginLeft: 20, width: 350, padding: 20, borderWidth: 2, borderColor: "purple", flexShrink: 1}}>
        <Text> Title: {title} </Text>
        <Text> Date Posted: {postDate} </Text>
        <Text> Last Updated: {updateDate} </Text>

        <Text>    </Text>
        <Image style={{width: 300, height: 300}} source={require('../images/chair.jpg')} />
        <Text>    </Text>

        <Text> Status: {status} </Text>
        <Text> Price: ${price} </Text> 
        <Text> Description: {description} </Text>

      </View>

      <Footer />
    </React.Fragment>
  );
}

//<Text className="name"> First  Middle  (opt) Last Name</Text>
//<Text className="more-info"> Year: </Text>
//<Text className="more-info"> Major: </Text>
//<Text className="more-info"> Introduction: </Text>

const styles=StyleSheet.create({

    name:{
      marginTop: 25,
      fontSize: 40,
      fontWeight: 500,
      marginLeft: 20,
    },

    otherInfo:{
      fontSize: 15,
      fontWeight: 500,
      marginLeft: 20,
      padding: 10,
    },


})

export default Profile;