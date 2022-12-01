import React, { Component } from "react";
import {StyleSheet, View, Text, Image} from "react-native";

function Wishlist() {
    return (
        <React.Fragment>
            <View>
                <Text style={styles.title}>Wishlist</Text>
            </View>
        </React.Fragment>
    );
}

const styles=StyleSheet.create ({
    title: {
        fontSize: 60,
        fontWeight: 500,
        margin: 20,
        marginTop: 40,
        alignSelf: 'center',
        fontFamily: "LoveloBlack"
    }
})

export default Wishlist;