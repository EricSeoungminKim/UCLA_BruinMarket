import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth, storage } from "../service/firebase";
import CurrencyInput from 'react-currency-input-field';
import { useNavigate } from "react-router-dom";
import {View, Text, StyleSheet, Image} from 'react-native';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import "../App.css"

const numbers = `${v4()}`;

function CreatePost({ isAuth }) {
    const [title, setTitle] = useState(""); // save what user is typing in the textbox
    const [postText, setPostText] = useState("");
    const [value, setValue] = useState("");
    const status = "For Sale"
    const [image, setImage] = useState("")
    const [imageUrl, setUrl] = useState("");
    const [errorMsg, setErrorMsg] = useState("")

    const postsCollectionRef = collection(db, "posts"); // add posts to a table in the firestore database named "posts"

    let navigate = useNavigate();
    useEffect (() => { // cannot create a post if not logged in
        if (!isAuth) {
            console.log("Hello");
        }
    }, []);

    const addImage = (image) => {
        const imageRef = ref(storage, `images/${image.name}${numbers}`);
        uploadBytes(imageRef, image).then((snapshot) => { // upload image
            console.log("Uploaded image")
        })
    }

    const createPost = async () => {
        // Make all entries required
        if (title == ""|| postText == ""|| value == "" || image == "") {
            setErrorMsg("ERROR: Please fill in all entries.");
        } else {
            // get time
            const current = new Date();
            const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
            const tmp = new Date();
            const timestamp = tmp.getTime();
            
            console.log(numbers);
            const imageRef = ref(storage, `images/${image.name}${numbers}`); // ref to picture

            await getDownloadURL(imageRef).then((url) => { // get image URL
                setUrl(url);
            })

            console.log(imageUrl);

            if (imageUrl != "") {
                // add document to firestore
                const document = await addDoc(postsCollectionRef, {
                    name: auth.currentUser.displayName, 
                    id: auth.currentUser.uid,
                    title, 
                    postText,
                    date, 
                    status,
                    value: `$${value}`,
                    timestamp,
                    imageUrl
                });

                console.log(imageUrl);

                // create a comment collection for each posts
                const newCollectionRef = collection(db, 'posts', document.id, 'comments');
                await addDoc(newCollectionRef, {
                    tmp: ""
                })
                window.location.pathname = "/timeline"
            }
            else { 
                setErrorMsg("You will be posting to the listings page, available to the public. Press submit to confirm.");
            }
        }
    };

    return (
        <React.Fragment>
            <View>
                <Text style={styles.title}> Add a Listing! </Text>
            <View style={{flexDirection: 'row', justifyContent: "center", flexShrink: 1}}>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.labels}> Title:                        </Text>
                        <input style={{width: 750, height: 30, margin: 10}} placeholder="Enter a title for your product..." onChange={(event) => {setTitle(event.target.value);}} />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.labels}> Description:           </Text>
                        <textarea style={{width: 750, height: 200, margin: 10}} placeholder="Describe your product..." onChange={(event) => {setPostText(event.target.value);}}/>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.labels}> Price:                       </Text>
                        <CurrencyInput
                                id="Price"
                                name="Price"
                                placeholder="Please enter a number."
                                defaultValue={0}
                                decimalsLimit={2}
                                decimalScale={2}
                                prefix={'$'}
                                onValueChange={(value, name) => setValue(value)}
                                style={{width: 100, height: 30, margin: 10}}
                            />
                    </View>

                    <View style={{flexDirection: 'row'}}>

                        <Text style={styles.labels}> Upload images: </Text> 
                        <input type="file" style={{margin: 10, marginLeft: 30}} onChange={(event) => {setImage(event.target.files[0]); addImage(event.target.files[0])}} />

                    </View> 

                </View>

                <View>
                    <Image style={styles.image} source={require('../images/Bear2.png')} />
                </View>
            </View>
                <View style={{alignSelf: 'center'}}>
                    <button style={styles.submitButton} onClick={createPost}>
                        <Text style={styles.buttonText}> Submit! </Text>
                    </button>
                </View>

                <View>
                    <Text style={styles.errorMsg}>{errorMsg}</Text>
                </View>
            </View>
        
    </React.Fragment>
    );
}

const styles = StyleSheet.create({

    title: {
    fontSize: 60,
    fontWeight: 500,
    margin: 30,
    alignSelf: "center",
    fontFamily: "LoveloBlack"
    },

    labels: {
    marginLeft: 35,
    fontWeight: 200,
    fontSize: 20,
    padding: 10,
    fontFamily: "LoveloBlack"
    },

    submitButton: {
    width: 400,
    height: 30,
    borderRadius: 3,
    borderColor: '#83bdff',
    borderWidth: 2,
    backgroundColor: '#83bdff',
    opacity: 0.70,
    marginTop: 5
    },

    buttonText: {
        fontWeight: 800,
        color: 'white',
        fontFamily: "LoveloBlack"
    },

    errorMsg: {
        alignSelf: "center",
        margin: 15,
        color: "red",
        fontFamily: "LoveloBlack"
    },

    image: {
        width: 250,
        height: 320,
        alignSelf: 'center',
        margin: 20
    }

})

export default CreatePost;