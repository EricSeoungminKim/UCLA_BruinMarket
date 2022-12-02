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

  /*const statusButtonText = ''
  const changeStatusButtonText = (status) =>{
    if (status === "For Sale"){
      statusButtonText = 'MARK AS SOLD!'
    }
    else{
      statusButtonText = 'MARK FOR SALE!'
    }
  }*/

  //const [statusButtonText, setStatusButtonText] = useState('HELLO');

  const changeStatus = async (id, status) => { 
    const docRef = doc(db, "posts", id); // fetch doc
    if(status === "For Sale") { // check status of doc
      await updateDoc(docRef, {
        status: "SOLD!" // change status
      });
      //setStatusButtonText('MARK FOR SALE!')
    }
    else {
      await updateDoc(docRef, {
        status: "For Sale"
      });
      //setStatusButtonText('MARK AS SOLD!')
    }
    window.location.reload(false); // reload to view changes
  };

  const deletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    window.location.reload(false);
  };

  return (
    
    <React.Fragment>

      {/* TOP SECTION: Profile info: image, 'welcome' message, name, email, & intro. */}
      <View style={{flexDirection: 'row'}}>
        <View style={{flex:1}}>
          <Image style={styles.profilePic} source={url} />
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
      <View style={{flexDirection: "row", alignItems: 'center'}}>
        <View style={{flex: 1}}>
          <Text style={styles.bigTitle}> My Listings: </Text>
        </View>

        <View style={{flex: 2}}>
          <Link to="/CreatePost">
            <button style={styles.newPostButton}>
                <Text style={styles.newPostButtonText}> Create a new listing! </Text>
            </button>
          </Link>
        </View>
      </View>

      {/* BOTTOM SECTION: */}
      <View style={styles.postsGrid}>
          {postLists.map((post) => {
              return (
                <View>
                  <View style={{flexDirection: 'row'}}>
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
                    <button style={styles.deleteButton} onClick={() => deletePost(post.id)}> X </button>
                 </View>

                 <View style={styles.statusButtonPosition}>
                  <button style={styles.statusButton} onClick={() => changeStatus(post.id, post.status)}> CHANGE STATUS! </button>
                 </View>
              </View>
              );
          })}
      </View>
      
    </React.Fragment>
  );
}

/*<Text style={styles.statusButtonText}> M A R K                               </Text>
                      <Text> </Text>
                      <Text style={styles.statusButtonText}> A S                                   </Text>
                      <Text> </Text>
                      <Text style={styles.statusButtonText}> S O L D ! </Text> 
*/

const styles=StyleSheet.create({

  bigTitle:{
    fontSize: 60,
    fontWeight: 500,
    margin: 20,
    marginTop: 60,
    fontFamily: "LoveloBlack"
  },

  bioInfo:{
    fontSize: 30,
    fontWeight: 500,
    marginLeft: 30,
    padding: 10,
    //fontFamily: 'LoveloBlack',
  },

  profilePic: {
    margin: 10,
    marginTop: 40,
    marginLeft: 20,
    borderRadius:150,
    width: 300,
    height: 300,
    alignSelf: 'center'
  },

  newPostButton:{
    width: 400,
    height: 50,
    borderRadius: 3,
    borderColor: '#83bdff',
    borderWidth: 2,
    backgroundColor: '#83bdff',
    opacity: 0.70,
    marginLeft: 490,
    marginTop: 20
  },

  newPostButtonText: {
    fontFamily: 'LoveloBlack',
    fontWeight: 800,
    color: 'white',
    fontSize: 20
  },

  postsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignContent: 'flex-start'
  },

  deleteButton: {
    marginTop: 36,
    marginLeft: -70,
    zIndex: 1,
    width: 30,
    height: 30,
    color: "#b53737",
    fontFamily: 'LoveloBlack',
    fontSize: 20,
    borderWidth: 1.5,
    borderColor: "gray",
    borderRadius: 5,
  },

  statusButton:{
    //width: 30,
    //height: 300,
    width: 394,
    height: 40,
    borderRadius: 3,
    borderColor: '#FDEFB2',
    borderWidth: 2,
    backgroundColor: '#FDEFB2',
    fontFamily: 'LoveloBlack',
    fontWeight: 800,
    //color: 'white',
    //alignSelf: 'center',
    //marginTop: 70,
    //marginLeft: 10,
    zIndex: 1,
    //marginTop: -30,
    //marginLeft: 31,
  },

  statusButtonText: {
    fontFamily: 'LoveloBlack',
    fontWeight: 800,
    color: 'black',
  },

  statusButtonPosition: {
    borderWidth: 3,
    width: 400,
    height: 40,
    marginLeft: 30,
    marginTop: -30,
    borderRadius: 6,
    borderColor: "white",
  },

})


export default Profile;
