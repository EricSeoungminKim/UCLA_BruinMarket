import React, { useState, useEffect } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../service/firebase";
import CurrencyInput from 'react-currency-input-field';
import { useNavigate } from "react-router-dom";
import {View, Text, StyleSheet, Image} from 'react-native';
import "../App.css"

function CreatePost({ isAuth }) {
    const [title, setTitle] = useState(""); // save what user is typing in the textbox
    const [postText, setPostText] = useState("");
    const [value, setValue] = useState("");
    const status = "For Sale"
    const [image, setImage] = useState("")  // FIXME: IDK IF THIS IS RIGHT, also only allows 1 image -emily
    const [errorMsg, setErrorMsg] = useState("")
    const postsCollectionRef = collection(db, "posts"); // add posts to a table in the firestore database named "posts"

    let navigate = useNavigate();
    useEffect (() => { // cannot create a post if not logged in
        if (!isAuth) {
            navigate("/login"); 
        }
    }, []);

    const user = auth.currentUser;
    console.log(user);

    const createPost = async () => {
        // Make all entries required (FIXME: NOT IMAGE YET)
        if (title == ""|| postText == ""|| value == "") {
            setErrorMsg("ERROR: Please fill in all entries.");
        } else {
            const current = new Date();
            const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
            const tmp = new Date();
            const timestamp = tmp.getTime();

            const document = await addDoc(postsCollectionRef, {
                name: auth.currentUser.displayName, 
                id: auth.currentUser.uid,
                title, 
                postText,
                date, 
                status,
                value: `$${value}`,
                timestamp
            });

            const newCollectionRef = collection(db, 'posts', document.id, 'comments');
            await addDoc(newCollectionRef, {
                tmp: ""
            })
            
            window.location.pathname = "/timeline"
        }
    };

    return (
        <React.Fragment>
            <View>
                <Text style={styles.title}> Create a Post! </Text>
            <View style={{flexDirection: 'row', justifyContent: "center", flexShrink: 1}}>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.labels}> Title:                        </Text>
                        <input style={{width: 750, height: 30, margin: 10}} placeholder="Enter a title for your product here." onChange={(event) => {setTitle(event.target.value);}} />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.labels}> Description:           </Text>
                        <textarea style={{width: 750, height: 200, margin: 10}} placeholder="Describe your product here." onChange={(event) => {setPostText(event.target.value);}}/>
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
                        <input type="file" style={{margin: 10, marginLeft: 30}} onChange={(event) => {setImage(event.target.value);}} />

                    </View> 

                    <View>
                        <Text style={styles.errorMsg}>{errorMsg}</Text>
                    </View>
                </View>

                <View>
                    <Image style={styles.image} source={require('../images/Bear2.png')} />
                </View>
            </View>
                <View style={{alignSelf: 'center'}}>
                    <button style={styles.submitButton} onClick={createPost}>
                        <Text style={styles.buttonText}> Submit post! </Text>
                    </button>
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
    borderColor: '#019FAF',
    borderWidth: 2,
    backgroundColor: '#019FAF',
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