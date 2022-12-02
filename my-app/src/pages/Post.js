import React, { useState } from "react";
import { getDocs, collection, query, orderBy, deleteDoc, doc, addDoc } from "firebase/firestore";
import { db, auth } from "../service/firebase";
import { Text, View, StyleSheet, Image } from 'react-native';

function Post({ name, id, title, postText, date, status, value, timestamp, imageUrl, isAuth }) {
    const [comment, setComment] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [commentLists, setCommentList] = useState([]);
    
    const postComment = async (id) => {
        const current = new Date();
        const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;
        const tmp = new Date();
        const timestamp = tmp.getTime();

        const newCollectionRef = collection(db, 'posts', id, 'comments');
        await addDoc(newCollectionRef, {
            name: auth.currentUser.displayName, 
            comment,
            date, 
            timestamp
        })
    };

    const loadComments = async (id) => {
      const commentsRef = collection(db, 'posts', id, 'comments');
      const data = await getDocs(query(commentsRef, orderBy('timestamp', 'asc'))); // order by newest first
      setCommentList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // created a list with comments and its data, will implement how to display it later
      console.log(commentLists);
    };
    loadComments();
    
    return (
        <View style={{alignItems: "center"}}>
            <View className="post" style={styles.post}>
                <View className="postHeader" style={styles.postHeader}>
                    <View className="title" style={styles.title}>
                        {title}
                    </View>
                </View>
                <View>
                    <Image source={imageUrl} alt="No image" style={styles.image}/>
                </View>

                {/* Text describing the post. (title, price, status, seller, date, etc.) */}
                <View className="postTextContainer" style={styles.postTextContainer}> {postText} </View>

                <View className="postTextContainer" style={{flexDirection: 'row', marginLeft: 15}}>
                    <Text style={styles.postLabel}> Seller: </Text>
                    <Text style={styles.postDescription}> {name} </Text>
                </View>

                <View className="postTextContainer" style={{flexDirection: 'row', marginLeft: 15}}>
                    <Text style={styles.postLabel}> Posted on: </Text>
                    <Text style={styles.postDescription}> {date} </Text>
                </View>

                <View className="postTextContainer" style={{flexDirection: 'row', marginLeft: 15}}>
                    <Text style={styles.postLabel}> Status: </Text>
                    <Text style={styles.postDescription}> {status} </Text>
                </View>

                <View className="postTextContainer" style={{flexDirection: 'row', marginLeft: 15}}>
                    <Text style={styles.postLabel}> Price: </Text>
                    <Text style={styles.postDescription}> {value} </Text>
                </View>
                {/* COMMENTS DISPLAY IMPLEMENTATION */}
                {commentLists.map((comment) => {
                    return (
                        <View style={styles.commentSection}>
                            <View style={styles.singleComment}>
                                <Text style={styles.commenter}> {comment.name}: </Text>
                                <Text style={styles.commentText}> {comment.comment} </Text>
                            </View>
                            <View>
                                <Text style={styles.commentDate}> {comment.date} </Text>
                            </View>
                        </View>
                    );
                })}
                {isAuth ? (
                    <div className="inputGp"> 
                        <input value={inputValue} placeholder="Comment..." onChange={(event) => {
                            setComment(event.target.value);
                            setInputValue(event.target.value);
                        }} style={styles.commentBox}/>
                        <button onClick={() => {
                            postComment(id);
                            setInputValue("");
                        }} style={styles.button}> Post </button>
                        
                        <div>
                            <button onClick={() => {
                                loadComments(id);
                            }} style={styles.button}> Load Comments </button>
                            <button onClick={() => {
                                setCommentList([]);
                            }} style={styles.button}> Hide Comments </button>
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    homePage: {
        margin: 30,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "center"
    },

    post: {
        flex: 1,
        width: 400,
        height: "100%",
        margin: 30,
        borderColor: "gray",
        borderRadius: 5,
        borderWidth: 2,
        shadowColor: "#e5e5e5",
        shadowRadius: 15
    },

    button: {
        width: 497,
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: "gray",
        backgroundColor: '#019FAF',
        opacity: 0.7
    },

    postHeader: {
        alignSelf: "center"
    },

    title: {
        fontSize: 22,
        color: "black",
        backgroundColor: "#b2d5fd",
        width: 397,
        fontFamily: "LoveloBlack",
        height: 40,
        alignItems: "center",
        padding: 8,
        borderBottomWidth: 2,
        borderBottomColor: "gray",
    },

    postTextContainer: {
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 15,
        fontSize: 16,
        height: 90
    },

    image: {
        marginTop: 15,
        marginBottom: 15,
        height: 200,
        width: 300,
        alignSelf: "center",
        resizeMode: "contain"
    },

    postLabel: {
        fontSize: 14,
        color: 'gray',
        fontWeight:800,
    },

    postDescription: {
        fontSize: 14,
        color: 'gray',
    },

    commentBox: {
        marginRight: 5,
        width: 213,
        marginTop: 10,
        marginLeft: 3,
        flexDirection: "column",
        alignSelf: "baseline",
    },
    
    button: {
        margin: 5
    },

    commentSection: {
        borderRadius: 2,
        borderColor: "black",
        margin: 7
    },

    singleComment: {
        borderRadius: 1,
        flexDirection: "row"
    },

    commenter: {
    flex: 1,
    marginLeft: 15,
    fontWeight: 600,
    },

    commentText: {
        flex: 2,
        marginRight: 5
    },

    commentDate: {
    marginLeft: 30,
    marginRight: 30,
    color: "gray"
    }
})

export default Post;