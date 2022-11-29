import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../service/firebase";
import CurrencyInput from 'react-currency-input-field';
import { useNavigate } from "react-router-dom";

function CreatePost({ isAuth }) {
    const [title, setTitle] = useState(""); // save what user is typing in the textbox
    const [postText, setPostText] = useState("");
    const [value, setValue] = useState("");
    const status = "For Sale"
    const postsCollectionRef = collection(db, "posts"); // add posts to a table in the firestore database named "posts"

    let navigate = useNavigate();
    useEffect (() => { // cannot create a post if not logged in
        if (!isAuth) {
            navigate("/login"); 
        }
    }, []);

    const createPost = async () => {
        const current = new Date();
        const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
        const tmp = new Date();
        const timestamp = tmp.getTime();

        await addDoc(postsCollectionRef, {
            title, 
            postText,
            date, 
            status,
            value: `$${value}`,
            timestamp
            // how to access account's name?
        });
        window.location.pathname = "/timeline"
    };

    return (
        <React.Fragment>
            <div className="createPostPage"> 
                <div className="cpContainer">
                    <h1> Create a Post </h1>
                    <div className="inputGp"> 
                        <label> Title: </label>
                        <input placeholder="Title..." onChange={(event) => {
                            setTitle(event.target.value);
                        }}/>
                    </div>
                    <div className="inputGp">
                        <label> Post: </label>
                        <textarea placeholder="Post..." onChange={(event) => {
                            setPostText(event.target.value);
                        }}/>
                    </div>
                    <div className="inputGp">
                        <label> Price: </label>
                        <CurrencyInput
                            id="Price"
                            name="Price"
                            placeholder="Please enter a number"
                            defaultValue={0}
                            decimalsLimit={2}
                            decimalScale={2}
                            prefix={'$'}
                            onValueChange={(value, name) => setValue(value)}
                        />
                    </div>
                    <button onClick={createPost}> Submit Post</button>
                </div>
            </div>
        </React.Fragment>
    );
}

export default CreatePost;