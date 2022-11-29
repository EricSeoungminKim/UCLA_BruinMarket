import React, { useEffect, useState } from "react";
import { getDocs, collection, query, orderBy } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db } from "../service/firebase";
import { useNavigate } from "react-router-dom";

function Timeline({ isAuth }) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");

    let navigate = useNavigate();
    useEffect (() => {
        if (!isAuth) {
            navigate("/login"); 
        }
    }, []);

    useEffect(() => {
        const getPosts = async () => {
          const data = await getDocs(query(postsCollectionRef, orderBy('timestamp', 'desc')));
          setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
    
        getPosts();
    }, []);

    const displayComments = () => {
        console.log("HELLO") 
    };
    
    return (
        <React.Fragment>
        <div className="homePage">
            {postLists.map((post) => {
                return (
                <div className="post">
                    <div className="postHeader">
                    <div className="title">
                        <button onClick={displayComments}> {post.title} </button>
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
