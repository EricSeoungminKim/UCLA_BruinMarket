//Profile version: for others viewing profiles that are not their own

import React, {Component} from "react";
import {StyleSheet, View, Text, Image} from "react-native";

//backend:
  //render new data after user shares their rating --> update # stars filled based on new avg rating
  //each user gets one rating --> overwrite their old rating with new rating

//user clicks on button to confirm new rating: RateUsers class
  //update backend data
  //compute new overall rating
  //use backend data to determine number of stars filled to display

//displaying stars: setUpStars()
  //for loop: compare star's index to overall rating to determine which stars are filled/empty

function setUpStars(newRate){

  let stars=[]
  var i=1;

  for(; i<=newRate; i++){
    stars[i] =  <Image style={styles.stars} source={require('../images/filled.png')} />
  }

  for(; i<=5; i++){
    stars[i] =  <Image style={styles.stars} source={require('../images/empty.png')} />
  }

  return(
    <View>
      <Text style={{alignSelf: 'center', marginLeft: 20, fontSize: 15, fontWeight: 500}}> User's Current Rating: </Text>
      <View style={{alignSelf: 'center', flexDirection: 'row'}}> {stars} </View>
    </View>
  )
}
 
class RateUser extends Component{
  constructor (props){
    super(props)
    this.state = {
      rating: 5
    };
  }

  onClickHandler (value){
    this.setState({rating: value});
  }
  
  render(){
    return (
      <View>
        <View> {setUpStars(this.state.rating)} </View>
        <Text> </Text>

        <View style={{alignSelf: 'center'}}>
          <Text style={{fontSize: 15, fontWeight: 500}}> Select your rating: </Text>
        </View>

        <View style={{alignSelf: 'center', flexDirection: 'row'}}>
          <button style={styles.dot} onClick={() => this.onClickHandler(1)}> 1 </button>
          <button style={styles.dot} onClick={() => this.onClickHandler(2)}> 2 </button>
          <button style={styles.dot} onClick={() => this.onClickHandler(3)}> 3 </button>
          <button style={styles.dot} onClick={() => this.onClickHandler(4)}> 4 </button>
          <button style={styles.dot} onClick={() => this.onClickHandler(5)}> 5 </button>
        </View>
        
      </View>
    )
  }
}

class Product extends Component{
  constructor(props){
    super(props)
    this.state = {

    };
  }

  //fits 3 product cards per row on screen
  render(){
    return(
      <View style={{padding: 50}}>    
        <View style={{padding: 10, width: 350, borderWidth: 2, borderColor: '#019FAF'}}>
          <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 800}}> Title: </Text>
              <Text>{this.props.title} </Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 800}}> Date Posted: </Text>
            <Text>{this.props.postDate} </Text>
          </View>

          <Text>    </Text>
          <Image style={{alignSelf: 'center', width: 300, height: 300}} source={require('../images/chair.jpg')} />
          <Text>    </Text>

          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 800}}> Status: </Text>
            <Text>{this.props.status}</Text>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 800}}> Price: </Text>
            <Text>${this.props.price} </Text> 
          </View>

          <View style={{flexDirection: 'row'}}>
            <Text style={{fontWeight: 800}}> Description: </Text>
            <Text>{this.props.description} </Text>
          </View>

        </View>
      </View>
    )
  }
}

var name="FIRST LAST"
var year = "2024"
var major = "Computer Science"
var intro = "Hello, I like to sell things. Like a lot of things that can be sold. I sell things that sell to be sold. Selling things is very fun to me."

var title = "Chair"
var postDate = "11/27/22"
//var updateDate = "11/27/22"
var status = "For Sale" //sale, trade, rent //sold, traded, rented
var price = 19.00
price = price.toFixed(2)
var description = "Chair to sit in." 

var productInfo = []    //replace with info from firebase; info from firebase will initialize the product cards in cardInfo()
var productCards = []

productInfo[0] = title
productInfo[1] = postDate
productInfo[2] = status
productInfo[3] = price
productInfo[4] = description

//array of product card info
//use array of info to create array of product cards
//display array of product cards

class Profile extends Component {

  cardInfo(){
    for(let i=0; i<60; i++){
      productCards[i] = <Product title={productInfo[0]} postDate={productInfo[1]} status={productInfo[2]} price={productInfo[3]} description={productInfo[4]}></Product>
    }
  }

  render(){
    return (
    <React.Fragment>
      
      <View style={{flexDirection: 'row'}}>
          <View style={{flex:1}}>
            <Image style={{width: 300, height: 300, alignSelf: 'center'}} source={require('../images/user-image.png')} />
            <RateUser/>
            
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

      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {this.cardInfo()}
        {productCards}
      </View>
      
    </React.Fragment>
  )
  }
}

/*<View style={{flexDirection: 'row', alignSelf: 'center'}}> 
        <Product title={productInfo[0]} postDate={productInfo[1]} updateDate={productInfo[2]} status={productInfo[3]} price={productInfo[4]} description={productInfo[5]}></Product>
        <Product></Product>
        <Product></Product>
      </View>

      <View style={{flexDirection: 'row', alignSelf: 'center'}}> 
        <Product></Product>
        <Product></Product>
        <Product></Product>
      </View>
*/

/* ADD NEW ITEM
  <View>
      <View style={{padding: 50}}>    
        <View style={{alignSelf: 'center' , padding: 10, width: 350, height: 475, borderWidth: 2, borderColor: '#019FAF'}}>
          <Text> Add new item </Text>
        </View>
      </View>
      </View>
*/

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

    stars:{
      width: 30,
      height: 30,
      padding: 2,
    },

    dot:{
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: "white",
      borderColor: "black",
      borderWidth: 2,
      alignSelf: 'center',
      padding: 5,
    },

})

export default Profile;