import React, { useEffect, useState } from "react";
import { db, auth } from "../service/firebase";
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, orderBy, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { Image, View, Text, StyleSheet} from 'react-native';


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
      <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'}}>
        {postLists.map((post) => {
          return (
            
            <View>
              {/*Everything inside this view tag is the structure of one product card.*/}

              <View style={{margin: 50}}>    
                <View style={{padding: 10, width: 350, height: 550, borderWidth: 2, borderColor: '#019FAF', borderRadius: 5}}>

                {/* TITLE */}
                  <View style={{padding: 5, flexDirection: 'row'}}>
                    <Text style={{fontWeight: 800}}> Title: </Text>
                    <Text>{post.title} </Text>
                  </View>

                {/* DATE POSTED */}
                  <View style={{padding: 5, flexDirection: 'row'}}>
                    <Text style={{fontWeight: 800}}> Date Posted: </Text>
                    <Text>{post.date} </Text>
                  </View>

                {/* PRODUCT IMAGE */}
                  <Text>    </Text>
                    <Image style={{alignSelf: 'center', width: 300, height: 300}} source={require('../images/chair.jpg')} />
                  <Text>    </Text>

                {/* STATUS BUTTON: FOR SALE/SOLD */}
                  <View style={{padding: 5, flexDirection: 'row'}}>
                    <Text style={{marginTop: 8, fontWeight: 800}}> Status:   </Text>
                    <button style={styles.statusButton} onClick={() => changeStatus(post.id, post.status)}>
                      <Text style={{fontFamily: 'LoveloBlack', fontWeight: 800, color: 'white'}}> {post.status} </Text>
                    </button>
                  </View>

                {/* PRICE */}
                  <View style={{padding: 5, flexDirection: 'row'}}>
                    <Text style={{fontWeight: 800}}> Price: </Text>
                    <Text>{post.value} </Text> 
                  </View>

                {/* DESCRIPTION */}
                  <View style={{padding: 5}}>
                    <Text style={{fontWeight: 800}}> Description: </Text>
                    <Text style={{marginLeft: 5, marginTop: 5}}>{post.postText} </Text>
                  </View>

                {/* DELETE POST BUTTON */}
                  <button onClick={() => deleteDoc(post.id)}> Delete Post </button>
                </View>


                {/* Below is for the implementation for INPUT BOX and VIEW COMMENTS BUTTON. */}
                <input value={inputValue} placeholder="Comment..." onChange={(event) => {
                        setComment(event.target.value);
                        setInputValue(event.target.value);
                    }}/>
                    <button onClick={() => {
                        addComment(post.id);
                        setInputValue("");
                    }}> Post </button>
                    <button onClick={() => viewComments(post.id)}> View Comments </button>

              
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
