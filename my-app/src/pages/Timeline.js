import React, { useEffect, useState } from "react";
import { getDocs, collection, deleteDoc, doc } from "firebase/firestore";
import { db } from "../service/firebase";
import Navbar from "../components/Navbar";

function Timeline() {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");
    useEffect(() => {
        const getPosts = async () => {
          const data = await getDocs(postsCollectionRef);
          setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
    
        getPosts();
      }, []);
    
    return (
        <React.Fragment>
        <Navbar />
        <div className="homePage">
            {postLists.map((post) => {
                return (
                <div className="post">
                    <div className="postHeader">
                    <div className="title">
                        <h1> {post.title}</h1>
                    </div>
        
                    </div>
                    <div className="postTextContainer"> {post.postText} </div>
                    <div className="postTextContainer"> {post.date} {post.value} {post.status} </div>
                </div>
                );
            })}
        </div>
        </React.Fragment>
    );
    // add author and delete post button
}

export default Timeline;
