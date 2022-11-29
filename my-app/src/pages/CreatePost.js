import React, { useState, useRef, useContext } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../service/firebase";
import CurrencyInput from 'react-currency-input-field';
import {Text, View, StyleSheet} from 'react-native';

function CreatePost() {
    const [title, setTitle] = useState(""); // save what user is typing in the textbox
    const [postText, setPostText] = useState("");
    const [value, setValue] = useState("");
    const status = "For Sale"
    const [image, setImage] = useState("")  // FIXME: IDK IF THIS IS RIGHT, also only allows 1 image -emily
    const postsCollectionRef = collection(db, "posts"); // add posts to a table in the firestore database named "posts"

    const createPost = async () => {
        const current = new Date();
        const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
        await addDoc(postsCollectionRef, {
            title, 
            postText,
            date, 
            status,
            value: `$${value}`
            // how to access account's name?
        });
        window.location.pathname = "/timeline"
    };

    return (
        <React.Fragment>
            <View>
                <Text style={styles.title}> Create a Post! </Text>
            
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.labels}> Title:                        </Text>
                <input style={{width: 1000, height: 30, margin: 10}} placeholder="Enter a title here." onChange={(event) => {setTitle(event.target.value);}}/>
            </View>
            
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.labels}> Description:           </Text>
                <textarea style={{width: 1000, height: 200, margin: 10}} placeholder="Describe your product here." onChange={(event) => {setPostText(event.target.value);}}/>
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
            
            <View style={{alignSelf: 'center'}}>
                <button style={styles.submitButton} onClick={createPost}>
                    <Text style={{fontWeight: 800, color: 'white'}}> Submit post! </Text>
                </button>
            </View>

            </View>
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 60,
        fontWeight: 1000,
        margin: 20,
    },

    labels: {
        marginLeft: 35,
        fontWeight: 1000,
        fontSize: 20,
        padding: 10,
    },

    submitButton: {
      width: 400,
      height: 30,
      borderRadius: 3,
      borderColor: '#019FAF',
      borderWidth: 2,
      backgroundColor: '#019FAF',
      opacity: 0.70,
    },

})

export default CreatePost;