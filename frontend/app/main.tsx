import * as React from "react";
import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import { Link } from "expo-router";

export default function MainScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("@/images/Main.png")} style={styles.image} />
      </View>

      <Link href={"signup"} style={styles.button} asChild>
        <Pressable>
          <Text style={styles.buttonText}>SIGNUP</Text>
        </Pressable>
      </Link>
      <Link href={"login"} style={styles.button} asChild>
        <Pressable>
          <Text style={styles.buttonText}>LOG IN</Text>
        </Pressable>
      </Link>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 80,
    backgroundColor: "black",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    alignContent: "center",
    padding: 7,
    borderRadius: 5,
  },
  button: {
    width: 300,
    height: 50,
    padding: 10,
    backgroundColor: "#AFEE",
    marginTop: 10,
    marginBottom: 140,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: 
    {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 25,
    fontWeight: "bold",
  },
  background: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  image: {
    width: 250,
    height: 250,
    // marginRight: 10,
   // resizeMode: "contain",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
