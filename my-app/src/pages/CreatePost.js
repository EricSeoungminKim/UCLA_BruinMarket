import React, { useState, useRef, useContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../service/firebase";
import Navbar from "../components/Navbar";
import { AccountContext } from "../components/Account";

function CreatePost() {
    const [title, setTitle] = useState(""); // save what user is typing in the textbox
    const [postText, setPostText] = useState("");
    const postsCollectionRef = collection(db, "posts"); // add posts to a table in the firestore database named "posts"

    const createPost = async () => {
        await addDoc(postsCollectionRef, {
            title, 
            postText
            // how to access account's name?
        });
        window.location.pathname = "/timeline"
    };

    return (
        <React.Fragment>
        <Navbar />
            <div className="createPostPage"> 
                <div className="cpContainer">
                    <h1> Create a Post </h1>
                    <div className="inputGp"> 
                        <label> Title: </label>
                        <input placeholder="Title..." onChange={(event) => {
                            setPostText(event.target.value);
                        }}/>
                    </div>
                    <div className="inputGp">
                        <label> Post: </label>
                        <textarea placeholder="Post..." onChange={(event) => {
                            setTitle(event.target.value);
                        }}/>
                    </div>
                    <button onClick={createPost}> Submit Post</button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CreatePost;