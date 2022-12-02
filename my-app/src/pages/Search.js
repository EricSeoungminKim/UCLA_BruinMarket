import React, { useEffect, useState } from "react";
import { getDocs, collection, query, orderBy, deleteDoc, doc, addDoc } from "firebase/firestore";
import { db } from "../service/firebase";
import { Text, View, StyleSheet, Image } from 'react-native';
import Post from "./Post"

function Match({ name, id, title, postText, date, status, value, timestamp, imageUrl, isAuth, searchValue }) {
  const tmp1 = title.toLowerCase();
  const tmp2 = searchValue.toLowerCase();
  if(tmp1.includes(tmp2)) {
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
  }
  else return console.log("Not matched.");
}

function Search({ isAuth }) {
  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearch] = useState("");
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
      <div>
        <input value={inputValue} placeholder="Search posts..." onChange={(event) => {
            setInputValue(event.target.value);
        }} />
        <button onClick={() => {
          setSearch(inputValue);
        }}> Search </button>
      </div>
      <div>
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
      </div>
    </React.Fragment>
  );
}

export default Search;
