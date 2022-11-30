import React, { useEffect, useState } from "react";
import { db, auth } from "../service/firebase";
import { collection, query, where, getDocs, updateDoc, doc, deleteDoc, orderBy, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

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
  };

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
      <div className="my posts">
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
                  <button onClick={() => changeStatus(post.id, post.status)}> {post.status} </button>
                </div>
                <div className="inputGp"> 
                    <input value={inputValue} placeholder="Comment..." onChange={(event) => {
                        setComment(event.target.value);
                        setInputValue(event.target.value);
                    }}/>
                    <button onClick={() => {
                        addComment(post.id);
                        setInputValue("");
                    }}> Post </button>
                    <button onClick={() => viewComments(post.id)}> View Comments </button>
                </div>
                <button onClick={() => deleteDoc(post.id)}> Delete Post </button>
            </div>
            );
        })}
      </div>
    </div>
  );
}

export default Profile;
