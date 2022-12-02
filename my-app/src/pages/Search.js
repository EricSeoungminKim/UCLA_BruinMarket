import React, { useEffect, useState } from "react";
import {
  getDocs,
  collection,
  query,
  orderBy,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "../service/firebase";
import { Text, View, StyleSheet, Image } from "react-native";
import Post from "./Post";

function Match({
  name,
  id,
  title,
  postText,
  date,
  status,
  value,
  timestamp,
  imageUrl,
  isAuth,
  searchValue,
}) {
  const tmp1 = title.toLowerCase();
  const tmp2 = searchValue.toLowerCase();
  if (tmp1.includes(tmp2)) {
    return (
      <Post
        name={name}
        id={id}
        title={title}
        postText={postText}
        date={date}
        status={status}
        value={value}
        timestamp={timestamp}
        imageUrl={imageUrl}
        isAuth={isAuth}
      ></Post>
    );
  } else return console.log("Not matched.");
}

function Search({ isAuth }) {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearch] = useState("");
  const [postLists, setPostList] = useState([]);
  const postsCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(
        query(postsCollectionRef, orderBy("timestamp", "desc"))
      );
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, []);

  const searchBarStyle = {
    color: "black",
    backgroundColor: "#eeeeee",
    padding: "20px",
    border: "none",
    fontSize: 18,
    marginBottom: 10,
    fontFamily: "LoveloBlack",
    borderBottomLeftRadius: "30px",
    borderTopLeftRadius: "30px",
    height: 20,
    marginTop: 30
  };
  const buttonStyle = {
    color: "black",
    fontSize: 18,
    border: "none",
    backgroundColor: "lightgray",
    fontFamily: "LoveloBlack",
    borderBottomRightRadius: "30px",
    borderTopRightRadius: "30px",
    height: 40,
    width: 90,
    marginTop: 30,
    alignContents: "center",
  };

  return (
    <React.Fragment>
      <View style={{flexDirection: "row", justifyContent: "flex-start", marginLeft: 55}}>
        <input
          style={searchBarStyle}
          value={inputValue}
          placeholder="Search posts..."
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
        />
        <button
          style={buttonStyle}
          onClick={() => {
            setSearch(inputValue);
          }}
        >
          {" "}
          Search{" "}
        </button>
      </View>
      <View>
        <View className="homePage" style={styles.homePage}>
          {postLists.map((post) => {
            return (
              <Match
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
                searchValue={searchValue}
              ></Match>
            );
          })}
          </View>
      </View>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  homePage: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: "center"
  },
})

export default Search;
