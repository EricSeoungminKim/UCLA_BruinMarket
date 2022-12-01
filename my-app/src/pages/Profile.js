import React, { useEffect, useState } from "react";
import { db, auth } from "../service/firebase";
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, orderBy, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Image, View, Text, StyleSheet} from 'react-native';
import { AuthErrorCodes } from "firebase/auth";


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

  // setting up comment text box and list to display comments on a post
  const [comment, setComment] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [commentLists, setCommentList] = useState([]);
  
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

  const addComment = async (id) => {
    const current = new Date();
    const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
    const tmp = new Date();
    const timestamp = tmp.getTime();

    const newCollectionRef = collection(db, 'posts', id, 'comments'); // go to comments collection of a post
    await addDoc(newCollectionRef, { // add doc to comments
        name: auth.currentUser.displayName, 
        comment,
        date, 
        timestamp
    })
    viewComments(id);
  };

  const viewComments = async (id) => {
      const commentsRef = collection(db, 'posts', id, 'comments');
      const data = await getDocs(query(commentsRef, orderBy('timestamp', 'desc'))); // order by newest first
      setCommentList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // created a list with comments and its data, will implement how to display it later
      console.log(commentLists);
  };
  console.log(url);
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
              <View style={{margin: 30}}> 
              {/*Everything inside this view tag is the structure of one product card.*/}

                <View style={styles.post}>

                  {/* TITLE */}
                    <View style={{padding: 5}}>
                      <Text style={styles.itemTitle}>{post.title} </Text>
                    </View>

                  {/* ------DELETE POST BUTTON------ */}
                  <button onClick={() => deleteDoc(post.id)} style={styles.deleteButton}> X </button>

                  {/* DATE POSTED */}
                  <View style={{padding: 5, flexDirection: 'row'}}>
                    <Text style={styles.boldSubtitle}> Posted on: </Text>
                    <Text style={styles.itemText}>{post.date} </Text>
                  </View>

                  {/* PRODUCT IMAGE */}
                  <Image style={styles.productImage} source={require('../images/chair.jpg')} />

                  {/* STATUS BUTTON: FOR SALE/SOLD */}
                    <View style={{padding: 5, flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={styles.boldSubtitle}> Status:   </Text>
                      <button style={styles.statusButton} onClick={() => changeStatus(post.id, post.status)}>
                        <Text style={styles.statusButtonText}> {post.status} </Text>
                      </button>
                    </View>

                  {/* PRICE */}
                    <View style={{padding: 5, flexDirection: 'row'}}>
                      <Text style={styles.boldSubtitle}> Price: </Text>
                      <Text style={styles.itemText}>{post.value} </Text> 
                    </View>

                  {/* DESCRIPTION */}
                    <View style={{padding: 5}}>
                      <Text style={styles.boldSubtitle}> Description: </Text>
                      <Text style={styles.postDescription}>{post.postText} </Text>
                    </View>
                  
                  {/* ------Below is for the implementation for INPUT BOX and VIEW COMMENTS BUTTON.------ */}
                  <View style={styles.commentSection}>
                    <input value={inputValue} placeholder="Comment..." onChange={(event) => {
                            setComment(event.target.value);
                            setInputValue(event.target.value);
                        }} style={styles.commentBox}/>
                    <button onClick={() => {
                        addComment(post.id);
                        setInputValue("");
                    }} style={styles.postCommentButton}> Post </button>
                    <button onClick={() => viewComments(post.id)} style={styles.viewCommentsButton}> View Comments </button>
                  </View>
                </View>
              
              </View>
            </View>
          );
        })}
      
      </View>

      
    </React.Fragment>
    
  );
}


const styles=StyleSheet.create({

  bigTitle:{
    fontSize: 60,
    fontWeight: 500,
    margin: 20,
    marginTop: 60,
    fontFamily: "LoveloBlack"
  },

  bioInfo:{
    fontSize: 40,
    fontWeight: 500,
    marginLeft: 20,
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

  post: {
    width: 400,
    borderWidth: 2,
    borderColor: 'gray',
    borderRadius: 5,
  },

  itemTitle: {
    fontSize: 22,
    color: "black",
    backgroundColor: "#b2d5fd",
    width: 396,
    fontFamily: "LoveloBlack",
    height: 40,
    alignSelf: "center",
    textAlign: "center",
    padding: 8,
    marginTop: -5,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
    marginBottom: 5
  },

  deleteButton: {
    marginTop: -46,
    zIndex: 2,
    width: 30,
    height: 30,
    color: "#b53737",
    fontSize: 20,
    borderWidth: 1.5,
    borderColor: "gray",
    marginLeft: 360,
    marginBottom: 15,
    borderRadius: 5
  },

  boldSubtitle: {
    fontWeight: 750,
    marginLeft: 10,
    fontSize: 16
  },

  itemText: {
    fontSize: 16
  },

  productImage: {
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
    height: 200,
    width: 300,
    resizeMode: "contain"
  },

  statusButton:{
    width: 100,
    height: 30,
    borderRadius: 3,
    borderColor: '#b2d5fd',
    borderWidth: 2,
    backgroundColor: '#b2d5fd'
  },

  statusButtonText: {
    fontFamily: 'LoveloBlack',
    fontWeight: 800, color: 'white'
  },

  postDescription: {
    fontSize: 16,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 8,
    marginBottom: 10,
    height: 80
  },

  commentSection: {
    flexDirection: "row",
    marginBottom: 3
  },

  commentBox: {
    marginRight: 5,
    width: 213,
    marginLeft: 3,
    flexDirection: "column",
    alignSelf: "baseline",
  },

  postCommentButton: {
    width: 50,
    marginRight: 5
  },

  viewCommentsButton: {
    width: 116
  }

})


export default Profile;
