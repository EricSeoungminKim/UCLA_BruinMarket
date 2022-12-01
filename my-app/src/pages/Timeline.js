import React, { useEffect, useState } from "react";
import { getDocs, collection, query, orderBy, deleteDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../service/firebase";
import { Text, View, StyleSheet, Image } from 'react-native';
import Post from "./Post"

function Timeline({ isAuth }) {
    const [postLists, setPostList] = useState([]);
    const postsCollectionRef = collection(db, "posts");

    useEffect(() => {
        const getPosts = async () => {
          const data = await getDocs(query(postsCollectionRef, orderBy('timestamp', 'desc')));
          setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };
        getPosts();
    }, []);
    
    return (
        <React.Fragment>
            <View className="homePage" style={styles.homePage}>
                {postLists.map((post) => {
                    return (
                        <Post 
                            name={post.name}
                            id={post.id}
                            title={post.title}
                            postText={post.postText}
                            date={post.date}
                            status={post.status}
                            value={post.value}
                            timestamp={post.timestamp}
                            imageUrl={post.imageUrl}
                            isAuth={isAuth}
                        ></Post>
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
