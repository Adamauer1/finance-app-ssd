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
//import TextButton from "./TextButton.tsx";
import { URL } from "@/constants/URL";
//const URL = "192.168.1.28";
export default function LogInScreen({}) {
  //export default function GetStartedScreen({ navigation }) {
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  const [cPassword, onChangeCPassword] = useState("");
  const [email, onChangeEmail] = useState("");
  //   const [checkLogin, setCheckLogin] = useState(false);
  //   const [loginResult, setLoginResult] = useState(false);

  const onPressSignup = async () => {
    const data = { username: username, password: password };

    // perform checks if email is taken / password === cPassword
    if (password == cPassword) {
      console.log("test");
      axios.post(`${URL}/signup`, {
        username,
        password,
        email,
      });
      router.replace({
        pathname: `/`,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.TEXT1}>USER SIGNUP </Text>
      <View style={styles.imageContainer}>
        <Image source={require("@/images/Main.png")} style={styles.image} />
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
        <Text style={styles.text}>CONFIRM PASSWORD</Text>
        <TextInput
          style={styles.input}
          value={cPassword}
          onChangeText={onChangeCPassword}
          secureTextEntry={true}
        />
        <Text style={styles.text}>EMAIL</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={onChangeEmail}
        />
        <Pressable style={styles.button} onPress={onPressSignup}>
          <Text style={styles.buttonText}>SIGNUP</Text>
        </Pressable>
      </View>
    </View>
    //add email
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
    top: 80,
    color: "#afee",
  },

  background: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  image: {
    width: 250,
    height: 110,
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
