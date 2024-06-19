import { Link, useLocalSearchParams } from "expo-router";
import * as React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
//const URL = "192.168.6.109";

export default function Stats({}) {
  const params = useLocalSearchParams();
  const { userID } = params;
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={require("@/images/Main.png")} style={styles.image} />
      </View>
      <Text style={styles.TEXT1}>HELLO - USER {userID}</Text>
      
      <Text style={styles.TEXT2}>STATISTICS</Text>
      <Link
        href={{ pathname: "home/TransactionStatistics", params: { userID } }}
        style={styles.button}
        asChild
      >
        <Pressable>
          <Text style={styles.buttonText}>TRANSACTION</Text>
        </Pressable>
      </Link>

      <Link
        href={{ pathname: "home/BudgetStatistics", params: { userID } }}
        style={styles.button}
        asChild
      >
        <Pressable>
          <Text style={styles.buttonText}>BUDGET</Text>
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
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    position: "absolute",
    top: 75,
    color: "#afee",
  },
  TEXT2: {
    fontSize: 30,
    textAlign: "center",
    fontWeight: "bold",
    position: "absolute",
    top: 400,
    color: "#afee",
  },

  background: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  image: {
    width: 250,
    height: 200,
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
