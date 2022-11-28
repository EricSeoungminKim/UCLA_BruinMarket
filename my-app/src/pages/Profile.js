import React, {Component} from "react";
import Navbar from "../components/Navbar";
import {StyleSheet, View, Text, Image} from "react-native";
// import "./Profile.css"

var name="FIRST LAST"
var year = "2024"
var major = "Computer Science"
var intro = "Hello, I like to sell things. Like a lot of things that can be sold. I sell things that sell to be sold. Selling things is very fun to me."
var rating = "5/5"

var title = "Chair"
var postDate = "11/27/22"
var updateDate = "11/27/22"
var status = "For Sale" //sale, trade, rent
var price = 19.00
price = price.toFixed(2)
var description = "Chair to sit in."

class Product extends Component{

  //fits 3 product cards per row on screen
  render(){
    return(
      <View style={{padding: 50}}>    
        <View style={{padding: 10, width: 350, borderWidth: 2, borderColor: '#019FAF'}}>
          <Text> Title: {this.props.title} </Text>
          <Text> Date Posted: {this.props.postDate} </Text>
          <Text> Last Updated: {this.props.updateDate} </Text>

          <Text>    </Text>
          <Image style={{alignSelf: 'center', width: 300, height: 300}} source={require('../images/chair.jpg')} />
          <Text>    </Text>

          <Text> Status: {this.props.status} </Text>
          <Text> Price: ${this.props.price} </Text> 
          <Text> Description: {this.props.description} </Text>
        </View>
      </View>
    )
  }
}


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

      <View>
      <View style={{padding: 50}}>    
        <View style={{alignSelf: 'center' , padding: 10, width: 350, height: 475, borderWidth: 2, borderColor: '#019FAF'}}>
          <Text> Add new item </Text>
        </View>
      </View>
      </View>

      <View style={{flexDirection: 'row', alignSelf: 'center'}}> 
        <Product title={title} postDate={postDate} updateDate={updateDate} status={status} price={price} description={description}></Product>
        <Product></Product>
        <Product></Product>
      </View>

      <View style={{flexDirection: 'row', alignSelf: 'center'}}> 
        <Product></Product>
        <Product></Product>
        <Product></Product>
      </View>
      
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