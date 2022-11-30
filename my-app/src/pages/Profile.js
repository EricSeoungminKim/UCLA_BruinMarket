import React, { useEffect, useState } from "react";
import { db, auth } from "../service/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";

function Profile() {
  const user = auth.currentUser;
  const displayName = user.displayName;
  const email = user.email;
  const uid = user.uid;

  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => { // get posts that match user's id == belongs to user
    const getPosts = async () => {
      const data = await getDocs(query(postsCollectionRef, where('id', '==', uid)));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);
  
  return (
    <div className="center">
      <div className="profile">
        <h1>Profile</h1>
        <p>
          <strong>Name: </strong>
          {displayName}
        </p>
        <p>
          <strong>Email: </strong>
          {email}
        </p>
      </div>
      <div className="homePage">
        <h1>My Posts</h1>
        {postLists.map((post) => {
            return ( // display my posts
            <div className="post">
                <div className="postHeader">
                  <p>
                    <strong> {post.title} </strong>
                  </p>
                </div>
                <div className="postTextContainer"> {post.postText} </div>
                <div className="postTextContainer"> 
                  {post.date} {post.value} 
                  <button> {post.status} </button> {/* implement being able to change the status from For Sale to Sold! */}
                </div>
            </div>
            );
        })}
      </div>
    </div>
  );
}

export default Profile;


{/*
import React, {Component} from "react";
import {StyleSheet, View, Text, Image} from "react-native";
import {Link} from 'react-router-dom';

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

      <Link to="/CreatePost" style={{alignSelf: 'center'}}>
        <button style={styles.postButton}>
            <Text style={{fontWeight: 800, color: 'white'}}> Create a new post! </Text>
        </button>
      </Link>

      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {this.cardInfo()}
        {productCards}
      </View>
      
    </React.Fragment>
  )
  }
}

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

    postButton:{
      width: 400,
      height: 30,
      borderRadius: 3,
      borderColor: '#019FAF',
      borderWidth: 2,
      backgroundColor: '#019FAF',
      opacity: 0.70,
    },

})
export default Profile;
*/}
