import React, { useEffect, useState } from "react";
import { db, auth } from "../service/firebase";
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, orderBy, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Image, View, Text, StyleSheet} from 'react-native';
import Post from "./Post"


function Profile({ isAuth }) {
  let navigate = useNavigate();
  useEffect (() => { // cannot create a post if not logged in
      if (!isAuth) {
          navigate("/login"); 
      }
  }, []);

  // getting user info
  const [displayName, setDisplayName] = useState(JSON.parse(localStorage.getItem('displayName')));
  const [email, setEmail] = useState(JSON.parse(localStorage.getItem('email')));
  const [uid, setId] = useState(JSON.parse(localStorage.getItem('uid')));
  const [url, setUrl] = useState(JSON.parse(localStorage.getItem('url')));

  // setting up list to display my posts
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => { // get posts that match user's id == belongs to user
    const getPosts = async () => {
      const data = await getDocs(query(postsCollectionRef, where('id', '==', uid)));
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const changeStatus = async (id, status) => { 
    const docRef = doc(db, "posts", id); // fetch doc
    if(status == "For Sale") { // check status of doc
      await updateDoc(docRef, {
        status: "SOLD!" // change status
      });
    }
    else {
      await updateDoc(docRef, {
        status: "For Sale"
      });
    }
    window.location.reload(false); // reload to view changes
  };

  const deleteDoc = async (id) => {
    console.log("Delete");
    // I will implement this later
    //await deleteDoc(doc(db, "posts", id));
    //window.location.reload(false);
  };

  return (
    
    <React.Fragment>

      {/* TOP SECTION: Profile info: image, 'welcome' message, name, email, & intro. */}
      <View style={{flexDirection: 'row'}}>
        <View style={{flex:1}}>
          <Image style={{margin: 10, borderRadius: 150, width: 300, height: 300, alignSelf: 'center'}} source={url} />
        </View>
        
        <View style={{flex:3}}>
          <Text style={styles.bigTitle}> WELCOME TO YOUR PROFILE! </Text>
          <Text style={styles.bioInfo}> Name: {displayName} </Text>
          <Text style={styles.bioInfo}> Email: {email} </Text>
        
          <View>
            {/*<View>
              <Text style={styles.otherInfo}> Introduction: </Text>
            </View>

            <View style={{marginLeft: 60, flexShrink: 1}}>
              <Text style={styles.otherInfo}> Hello, I like to sell things. Like a lot of things that can be sold. I sell things that sell to be sold. Selling things is very fun to me. </Text>
            </View>*/}
          </View>
        </View>
      </View>


      {/* MIDDLE SECTION: (after profile info, before product info) */}
      <View>
        <Text style={styles.bigTitle}> My Listings: </Text>
      </View>

      <Link to="/CreatePost" style={{alignSelf: 'center'}}>
        <button style={styles.postButton}>
            <Text style={{fontFamily: 'LoveloBlack', fontWeight: 800, color: 'white'}}> Create a new listing! </Text>
        </button>
      </Link>

      {/* BOTTOM SECTION: */}
      <View className="homePage" style={styles.homePage}>
          {postLists.map((post) => {
              return (
                  <Post 
                      name={post.name}
                      id={post.id}
                      title={post.title}
                      postText={post.postText}
                      date={post.date}
                      status={post.status}
                      value={post.value}
                      timestamp={post.timestamp}
                      imageUrl={post.imageUrl}
                      isAuth={isAuth}
                  ></Post>
              );
          })}
      </View>
      
      
    </React.Fragment>



    
  );
}


const styles=StyleSheet.create({

  bigTitle:{
    marginTop: 25,
    fontSize: 70,
    fontWeight: 500,
    marginLeft: 20,
    fontFamily: 'LoveloBlack',
  },

  bioInfo:{
    fontSize: 40,
    fontWeight: 500,
    marginLeft: 20,
    padding: 10,
    //fontFamily: 'LoveloBlack',
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
