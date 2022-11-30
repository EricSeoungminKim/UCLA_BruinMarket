import React from 'react';
import { auth, provider } from "../service/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {StyleSheet, View, Text, Image} from "react-native";
import "../App.css"

function LoginSignup({ setIsAuth }) {
    let navigate = useNavigate();

    const signInWithGoogle = () => {
      signInWithPopup(auth, provider).then((result) => {
        localStorage.setItem("isAuth", true);
        setIsAuth(true);
        navigate("/");
      });
    };
  
    return (
    <React.Fragment>
      <Text style={styles.title}>Login to get Started!</Text>
      <View className="loginPage" style={styles.loginPage}>
        <button className="login-with-google-btn" style={styles.button} onClick={signInWithGoogle}>
          Sign in with Google
        </button>
        <Image style={styles.image} source={require('../images/Bear1.png')} />
      </View>
    </React.Fragment>
    );
}

const styles = StyleSheet.create({
  loginPage: {
    marginTop: 10,
    margin: 20,
    borderWidth: 2,
    width: 600,
    height: 370,
    borderColor: 'gray',
    borderRadius: 15,
    backgroundColor: "#e5e5e5",
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
    alignSelf: 'center'
  },

  title: {
    fontSize: 40,
    margin: 20,
    marginTop: 40,
    alignSelf: 'center',
    fontFamily: "LoveloBlack"
  },

  button: {
    marginTop: 27,
    marginLeft: 50,
    width: 300,
    fontWeight: 500,
    height: 60,
    alignSelf: 'center',
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: "white",
    flex: 1
  },

  image: {
    flex: 1,
    width: 300,
    height: 300,
    alignSelf: 'right',
    marginTop: 30
  }
})

export default LoginSignup;