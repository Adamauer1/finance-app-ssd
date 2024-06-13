import axios from "axios";
import { router } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
//import TextButton from "./TextButton.tsx";
const URL = "172.20.10.3";
export default function LogInScreen({}) {
  //export default function GetStartedScreen({ navigation }) {
  const [username, onChangeUsername] = useState("");
  const [password, onChangePassword] = useState("");
  //   const [checkLogin, setCheckLogin] = useState(false);
  //   const [loginResult, setLoginResult] = useState(false);

  const onPressLogin = async () => {
    // send post to server with username and password
    // check on server if valid
    // return result by moving to next page or displaying error
    //console.log(username);
    const data = { username: username, password: password };
    axios
      .post(`http://${URL}:3000/login`, {
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
          console.log("test");
        } else {
          // display error message
        }
      })
      .catch((error) => {});
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {/* <Image source={require("@/images/Main.png")} style={styles.image} /> */}
        <Text style={styles.text}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={onChangeUsername}
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry={true}
        />
        <Pressable style={styles.button} onPress={onPressLogin}>
          <Text>Login</Text>
        </Pressable>
      </View>
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
    marginTop: 20,
    marginBottom: 100,
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
    color: "white",
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
