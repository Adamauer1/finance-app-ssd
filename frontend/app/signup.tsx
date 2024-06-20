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
  ScrollView,
} from "react-native";
import { URL } from "@/constants/URL";
export default function LogInScreen() {
  const [username, onChangeUsername] = useState("");
  const [firstUsername, setFirstUsername] = useState(false);
  const [password, onChangePassword] = useState("");
  const [firstPassword, setFirstPassword] = useState(false);
  const [cPassword, onChangeCPassword] = useState("");
  const [firstCPassword, setFirstCPassword] = useState(false);
  const [email, onChangeEmail] = useState("");
  const [firstEmail, setFirstEmail] = useState(false);

  // sends the input data to the backend and saves a new user
  const onPressSignup = async () => {
    if (username == "" || password == "" || cPassword == "" || email == "") {
      setFirstUsername(true);
      setFirstPassword(true);
      setFirstCPassword(true);
      setFirstEmail(true);
      return;
    }

    // very simple signup
    // perform checks if password === cPassword
    // other checks should be implemented
    if (password == cPassword) {
      axios.post(`${URL}/signup`, {
        username,
        password,
        email,
      });
      // navigate back to the index page
      router.replace({
        pathname: `/`,
      });
    } else {
      // display error messages
    }
  };
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      alwaysBounceVertical={false}
      automaticallyAdjustKeyboardInsets={true}
      bounces={false}
    >
      {/* <View style={styles.container}> */}
      <Text style={styles.TEXT1}> USER SIGNUP </Text>
      <View style={styles.imageContainer}>
        {/* <Image source={require("@/images/Main.png")} style={styles.image} /> */}
        <Text style={styles.text}>USERNAME</Text>
        {/* Text Input to enter username */}
        <TextInput
          style={
            username == "" && firstUsername ? styles.inputError : styles.input
          }
          value={username}
          onChangeText={onChangeUsername}
          onPress={() => setFirstUsername(true)}
        />
        <Text style={styles.text}>PASSWORD</Text>
        {/* Text Input to enter password */}
        <TextInput
          style={
            password == "" && firstPassword ? styles.inputError : styles.input
          }
          value={password}
          onChangeText={onChangePassword}
          secureTextEntry={true}
          onPress={() => setFirstPassword(true)}
        />
        <Text style={styles.text}>CONFIRM PASSWORD</Text>
        {/* Text Input to enter confirmation password */}
        <TextInput
          style={
            cPassword == "" && firstCPassword ? styles.inputError : styles.input
          }
          value={cPassword}
          onChangeText={onChangeCPassword}
          secureTextEntry={true}
          onPress={() => setFirstCPassword(true)}
        />
        <Text style={styles.text}>EMAIL</Text>
        {/* Text Input to enter email */}
        <TextInput
          style={email == "" && firstEmail ? styles.inputError : styles.input}
          value={email}
          onChangeText={onChangeEmail}
          onPress={() => setFirstEmail(true)}
        />
        {/* Button to signup */}
        <Pressable style={styles.button} onPress={onPressSignup}>
          <Text style={styles.buttonText}>SIGNUP</Text>
        </Pressable>
      </View>
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
