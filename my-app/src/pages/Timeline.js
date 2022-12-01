import React, { useEffect, useState } from "react";
import { getDocs, collection, query, orderBy, deleteDoc, doc, addDoc } from "firebase/firestore";
import { Link, renderMatches } from "react-router-dom";
import { db, auth, storage } from "../service/firebase";
import { useNavigate } from "react-router-dom";
import { Text, View, StyleSheet, Image } from 'react-native';
import { ref, getDownloadURL } from "firebase/storage";

function Timeline({ isAuth }) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");
    const [comment, setComment] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [commentLists, setCommentList] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
          const data = await getDocs(query(postsCollectionRef, orderBy('timestamp', 'desc')));
          setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPosts();
    }, []);

    const addComment = async (id) => {
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
        viewComments(id);
    };

    const viewComments = async (id) => {
      const commentsRef = collection(db, 'posts', id, 'comments');
      const data = await getDocs(query(commentsRef, orderBy('timestamp', 'desc'))); // order by newest first
      setCommentList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      // created a list with comments and its data, will implement how to display it later
      console.log(commentLists);
    };
    
    return (
        <React.Fragment>
            <View className="homePage" style={styles.homePage}>
                {postLists.map((post) => {
                    return (
                        <View style={{alignItems: "center"}}>
                            <View className="post" style={styles.post}>
                                <View className="postHeader" style={styles.postHeader}>
                                    <View className="title" style={styles.title}>
                                        {post.title}
                                    </View>
                                </View>
                                <View>
                                    <img src={post.imageUrl} alt="No image" />
                                </View>

                                {/* Text describing the post. (title, price, status, seller, date, etc.) */}
                                <View className="postTextContainer" style={styles.postTextContainer}> {post.postText} </View>

                                <View className="postTextContainer" style={{flexDirection: 'row', marginLeft: 15}}>
                                    <Text style={styles.postLabel}> Seller: </Text>
                                    <Text style={styles.postDescription}> {post.name} </Text>
                                </View>

                                <View className="postTextContainer" style={{flexDirection: 'row', marginLeft: 15}}>
                                    <Text style={styles.postLabel}> Posted on: </Text>
                                    <Text style={styles.postDescription}> {post.date} </Text>
                                </View>

                                <View className="postTextContainer" style={{flexDirection: 'row', marginLeft: 15}}>
                                    <Text style={styles.postLabel}> Status: </Text>
                                    <Text style={styles.postDescription}> {post.status} </Text>
                                </View>

                                <View className="postTextContainer" style={{flexDirection: 'row', marginLeft: 15}}>
                                    <Text style={styles.postLabel}> Price: </Text>
                                    <Text style={styles.postDescription}> {post.value} </Text>
                                </View>

                                {isAuth ? (
                                    <div className="inputGp"> 
                                        <input value={inputValue} placeholder="Comment..." onChange={(event) => {
                                            setComment(event.target.value);
                                            setInputValue(event.target.value);
                                        }} style={styles.commentBox}/>
                                        <button onClick={() => {
                                            addComment(post.id);
                                            setInputValue("");
                                        }} style={styles.button}> Post </button>
                                        <button onClick={() => viewComments(post.id)} style={styles.button}> View Comments </button>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </View>
                        </View>
                    );
                })}
            </View>
        </React.Fragment>
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
        borderWidth: 2,
        borderColor: "gray",
        alignSelf: "center"
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
    }
})

export default Timeline;
