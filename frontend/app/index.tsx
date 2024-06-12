// import React from "react";

// export default function GetStartedScreen() {
//   return <div>GetStartedScreen</div>;
// }

//import * as React from "react";
import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";
import { Link, useRouter } from "expo-router";
import TextButton from "@/components/TextButton";

export default function GetStartedScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FINANCIAL TRACKER APP</Text>
      <View style={styles.imageContainer}>
        <Image source={require("@/images/Main.png")} style={styles.image} />
        <Link href={"/main"} style={styles.button} asChild>
          <Pressable>
            <Text style={styles.buttonText}>GET STARTED</Text>
          </Pressable>
        </Link>
      </View>
      {/* <TextButton
        onPress={
          <Link href={}></Link>
        }
        buttonStyle={styles.button}
        buttonText="GET STARTED"
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 80,
    backgroundColor: "black",
    flex: 11,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#ccc",
    alignContent: "center",
    padding: 7,
    borderRadius: 5,
  },
  button: {
    display: "flex",
    flexDirection: "row",
    width: 300,
    height: 50,
    //padding: 30,
    backgroundColor: "#afee",
    //#afee
    marginTop: 40,
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
    //alignItems : 'center',
    alignItems: "center",
    marginTop: 250,
  },
  text: {
    fontSize: 40,
    fontWeight: "bold",
    //position : 'absolute',
    top: 100,
    color: "#999",
  },
});
