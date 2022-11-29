import React, { useEffect, useState } from "react";
import { getDocs, collection, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { db, auth } from "../service/firebase";
import { useNavigate } from "react-router-dom";

function Timeline({ isAuth }) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");

    const deletePost = async (id) => {
        const postDoc = doc(db, "posts", id);
        await deleteDoc(postDoc);
    };

    const displayComments = () => {
        console.log("HELLO") 
    };

    let navigate = useNavigate();
    useEffect (() => { // cannot create a post if not logged in
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
    }, [deletePost]);
    
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
                    <div className="postTextContainer"> @{post.name} {post.date} {post.value} {post.status} </div>
                    <div className="deletePost">
                        {isAuth && post.id === auth.currentUser.uid && (
                        <button
                            onClick={() => {
                            deletePost(post.id);
                            }}
                        >
                            {" "}
                            &#128465;
                        </button>
                        )}
                    </div>
                </div>
                );
            })}
        </div>
        </React.Fragment>
    );
    // add author and delete post button
}

export default Timeline;
