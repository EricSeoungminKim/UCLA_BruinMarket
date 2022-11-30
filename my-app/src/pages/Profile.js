import React, { Component, useEffect, useState } from "react";
import { db, auth } from "../service/firebase";
import { collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import {StyleSheet, View, Text, Image} from "react-native";
import {Link} from 'react-router-dom';

//stars/user-rating:
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

var year = "2024"
var major = "Computer Science"
var intro = "Hello, I like to sell things. Like a lot of things that can be sold. I sell things that sell to be sold. Selling things is very fun to me."

function getUserBio(){

  const user = auth.currentUser;
  const displayName = user.displayName;
  const email = user.email;

  return(
    <View style={{flexDirection: 'row'}}>
      <View style={{flex:1}}>
        <Image style={{width: 300, height: 300, alignSelf: 'center'}} source={require('../images/user-image.png')} />
        <RateUser/>
      </View>
         
      <View style={{flex:3}}>
        <Text style={styles.name}> {displayName} </Text>
        <Text style={styles.otherInfo}> Year: {year} </Text>
        <Text style={styles.otherInfo}> Major: {major} </Text>
        <Text style={styles.otherInfo}> Email: {email} </Text>
      
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
  )
}

function BuildProductCards(){
  const user = auth.currentUser;
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

  // build the product cards with info from firebase (post.'info')
  // cards shown in rows of three, scrolls vertically down the screen
  return(
    <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}> {postLists.map((post) => {
      return ( // display my posts
        <View>
          <View style={{margin: 50}}>    
            <View style={{padding: 10, width: 350, height: 550, borderWidth: 2, borderColor: '#019FAF', borderRadius: 5}}>

              <View style={{padding: 5, flexDirection: 'row'}}>
                <Text style={{fontWeight: 800}}> Title: </Text>
                <Text>{post.title} </Text>
              </View>

              <View style={{padding: 5, flexDirection: 'row'}}>
                <Text style={{fontWeight: 800}}> Date Posted: </Text>
                <Text>{post.date} </Text>
              </View>

              <Text>    </Text>
                <Image style={{alignSelf: 'center', width: 300, height: 300}} source={require('../images/chair.jpg')} />
              <Text>    </Text>

              <View style={{padding: 5, flexDirection: 'row'}}>
                <Text style={{marginTop: 8, fontWeight: 800}}> Status:   </Text>
                  <button style={styles.statusButton}>
                    <Text style={{fontWeight: 800, color: 'white'}}> {post.status} </Text>
                  </button>

                  {/* implement being able to change the status from For Sale to Sold! */}

              </View>

              <View style={{padding: 5, flexDirection: 'row'}}>
                <Text style={{fontWeight: 800}}> Price: </Text>
                <Text>{post.value} </Text> 
              </View>

              <View style={{padding: 5}}>
                <Text style={{fontWeight: 800}}> Description: </Text>
                <Text style={{marginLeft: 5, marginTop: 5}}>{post.postText} </Text>
              </View>

            </View>
          </View>
        </View>
            );
      })}
    
    </View>
  )
}

//to test out the button for changing status
class changeStatus extends Component{
  render(){
    return(
      <View> <Text> HELLO </Text> </View>
  )}
}

//displays the whole profile (user bio & product cards)
function Profile() {  
  
  return (
    <React.Fragment>

      {getUserBio()}

      <View>
        <Text style={styles.name}> Products: </Text>
      </View>

      <Link to="/CreatePost" style={{alignSelf: 'center'}}>
        <button style={styles.postButton}>
            <Text style={{fontWeight: 800, color: 'white'}}> Create a new post! </Text>
        </button>
      </Link>

      {BuildProductCards()}
      
    </React.Fragment>
  )
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

    statusButton:{
      width: 100,
      height: 30,
      borderRadius: 3,
      borderColor: '#019FAF',
      borderWidth: 2,
      backgroundColor: '#019FAF',
      opacity: 0.70,
      marginBottom: 10,
    }

})

export default Profile;
