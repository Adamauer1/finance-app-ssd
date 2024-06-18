import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { URL } from "@/constants/URL";
// const URL = "192.168.6.109";
export default function LogInScreen({}) {
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");

  axios.get(`${URL}/users`).then((res) => {
    console.log(res.data);
  });

  const onPressLogin = async () => {
    // send post to server with username and password
    // check on server if valid
    // return result by moving to next page or displaying error
    //console.log(username);
    const data = { username: username, password: password };
    axios
      .post(`${URL}/login`, {
        username,
        password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.result) {
          // navigate to next page
          router.replace({
            pathname: `/home/${res.data.userID}`,
            params: { userID: res.data.userID },
          });
        } else {
          // display error message
        }
      })
      .catch((error) => {});
  };
  return (
    <View style={styles.container}>
      <Text style={styles.TEXT1}>USER LOGIN </Text>
      <View style={styles.imageContainer}>
        <Image source={require("@/images/Main.png")} style={styles.image} />
      </View>

      <Text style={styles.text}>USERNAME</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={onChangeUsername}
      />
      <Text style={styles.text}>PASSWORD</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry={true}
      />
      <Pressable style={styles.button} onPress={onPressLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </Pressable>
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
    backgroundColor: "#afee",
    marginTop: 55,
    marginBottom: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "black",
    fontSize: 26,
    fontWeight: "bold",
  },
  input: {
    height: 60,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#afee",
    textAlign: "center",
  },

  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#999",
    top: 100,
  },
  TEXT1: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    position: "absolute",
    top: 70,
    color: "#afee",
  },

  background: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  image: {
    width: 250,
    height: 180,
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
