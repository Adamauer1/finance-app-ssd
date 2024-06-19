import { View, Text, StyleSheet, Image, Pressable, Button } from "react-native";
import { Link, useRouter } from "expo-router";

export default function GetStartedScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.text}>FINANCIAL TRACKER APP</Text>
      <View style={styles.imageContainer}>
        <Image source={require("@/images/Main.png")} style={styles.image} />
        {/* Button to navigate to the main screen */}
        <Link href={"/main"} style={styles.button} asChild>
          <Pressable>
            <Text style={styles.buttonText}>GET STARTED</Text>
          </Pressable>
        </Link>
      </View>
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
    width: 300,
    height: 50,
    padding: 10,
    backgroundColor: "#AFEE",
    marginTop: 20,
    marginBottom: 100,
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
    textAlign: "center",
    fontWeight: "bold",
    position: "absolute",
    top: 100,
    color: "#999",
  },
});
