import { useEffect } from "react";
import { View, StyleSheet, Image, Pressable, Text } from "react-native";
import { Link } from "expo-router";
import { URL } from "@/constants/URL";
import axios from "axios";

export default function MainScreen() {
  let userID = 1;
  useEffect(() => {
    axios
      .post(`${URL}/user/budgets`, {
        userID,
      })
      .then((res) => {
        console.log(res.data);
      });
  });
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
      {/* <TextButton
        onPress={() => navigation.navigate("SignUpScreen")}
        buttonStyle={styles.button}
        buttonText="SIGNUP"
      />
      <TextButton
        onPress={() => navigation.navigate("LogInScreen")}
        buttonStyle={styles.button}
        buttonText="LOG IN"
      /> */}
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
    //padding: 10,
    backgroundColor: "#afee",
    marginTop: 20,
    marginBottom: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20,
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
    resizeMode: "contain",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
