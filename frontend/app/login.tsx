import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
} from "react-native";
import { URL } from "@/constants/URL";
export default function LogInScreen({}) {
  const [username, onChangeUsername] = useState("");
  const [firstUsername, setFirstUsername] = useState(false);
  const [password, onChangePassword] = useState("");
  const [firstPassword, setFirstPassword] = useState(false);

  // axios.get(`${URL}/users`).then((res) => {
  //   //console.log(res.data);
  // });
  const onPressLogin = async () => {
    if (username == "" || password == "") {
      setFirstUsername(true);
      setFirstPassword(true);
      return;
    }

    // very simple login for demo only
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
          onChangePassword("");
        }
      })
      .catch((error) => {});
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      alwaysBounceVertical={false}
      automaticallyAdjustKeyboardInsets={true}
      bounces={false}
    >
      {/* <View style={styles.container}> */}
      <Text style={styles.TEXT1}>USER LOGIN </Text>
      <View style={styles.imageContainer}>
        <Image source={require("@/images/Main.png")} style={styles.image} />
      </View>

      <Text style={styles.text}>USERNAME</Text>
      {/* Text Input for username */}
      <TextInput
        style={
          username == "" && firstUsername ? styles.inputError : styles.input
        }
        value={username}
        onChangeText={onChangeUsername}
        onPress={() => setFirstUsername(true)}
      />
      <Text style={styles.text}>PASSWORD</Text>
      {/* Text Input for password */}
      <TextInput
        style={
          password == "" && firstPassword ? styles.inputError : styles.input
        }
        value={password}
        onChangeText={onChangePassword}
        secureTextEntry={true}
        onPress={() => setFirstPassword(true)}
      />
      {/* Button to login */}
      <Pressable style={styles.button} onPress={onPressLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </Pressable>
      {/* </View> */}
    </ScrollView>
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
  inputError: {
    //flex: 0.1,
    height: 60,
    width: 250,
    margin: 12,
    borderWidth: 3,
    borderColor: "red",
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
