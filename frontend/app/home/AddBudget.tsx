import axios from "axios";
import { useState, useEffect, useRef } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { URL } from "@/constants/URL";
import {
  IndexPath,
  Layout,
  Select,
  SelectItem,
  Datepicker,
} from "@ui-kitten/components";
//const URL = ' 192.168.6.109'; // Your server IP

export default function AddBudget() {
  const params = useLocalSearchParams();
  const { userID } = params;
  const [budgetName, setBudgetName] = useState("");
  const [totalAmount, settotalAmount] = useState(0);
  const [startDate, setstartDate] = useState(new Date());
  const [endDate, setendDate] = useState(new Date());
  // useEffect(() => {
  //   // gets all budget objects
  //   axios
  //     .post(`${URL}/user/addBudgetInfo`, {
  //       userID,
  //     })
  //     .then((res) => {
  //       setBudgetNames(res.data.budgets);
  //       const budgetKeys: number[] = Object.keys(res.data.budgets).map((key) =>
  //         parseInt(key)
  //       );
  //       //still works just a typescript type error
  //       // @ts-ignore comment
  //       setBudgetIDs(budgetKeys);
  //       setBudgetID(budgetKeys[0]);
  //     //  setCategoryNames(res.data.categorys);
  //     //  const categoryKeys = Object.keys(res.data.categorys).map((key) =>
  //    //     parseInt(key)
  //    //   );
  //       //still works just a typescript type error
  //       // @ts-ignore comment
  //     //  setCategoryIDs(categoryKeys);
  //     //  setCategoryID(categoryKeys[0]);
  //       //console.log(budgetIDs);
  //     });
  // }, []);

  const onPressAddBudget = () => {
    //console.log(date);
    axios.post(`${URL}/addBudget`, {
      userID,
      budgetName,
      totalAmount,
      startDate,
      endDate,
    });

    router.back();

    // router.replace({
    //   pathname: `/home/Transaction`,
    //   params: { userID: userID },
    // });
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.imageContainer}>
        <Image source={require("@/images/Main.png")} style={styles.image} />
      </View> */}

      <Text style={styles.TEXT1}>ADD BUDGET</Text>
      <Layout style={styles.inputRow}>
        <Text style={styles.text}>Budget Name:</Text>
        <TextInput
          style={styles.input}
          value={budgetName}
          onChangeText={(text) => setBudgetName(text)}
        />
      </Layout>
      <Layout style={styles.inputRow}>
        <Text style={styles.text}>Total Amount:</Text>
        <TextInput
          style={styles.input}
          value={totalAmount.toString()}
          onChangeText={(text) => settotalAmount(parseFloat(text))}
          keyboardType="numeric"
        />
      </Layout>

      <Layout style={styles.inputRow}>
        <Text style={styles.text}>Start Date</Text>
        {/* <TextInput style={styles.input} value={date} onChangeText={setDate} /> */}
        <Datepicker
          date={startDate}
          onSelect={(nextDate) => setstartDate(nextDate)}
        />
      </Layout>

      <Layout style={styles.inputRow}>
        <Text style={styles.text}>End Date</Text>
        <Datepicker
          date={endDate}
          onSelect={(nextDate) => setendDate(nextDate)}
        />
      </Layout>

      <Pressable style={styles.button} onPress={onPressAddBudget}>
        <Text style={styles.buttonText}>Add Budget</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    fontSize: 80,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    //flex: 1,
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
    //marginBottom: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    //bottom: 10,

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
    //flex: 0.1,
    height: 40,
    width: 200,
    //margin: 12,
    borderWidth: 1,
    //padding: 10,
    backgroundColor: "#afee",
    textAlign: "center",
  },

  inputRow: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    backgroundColor: "black",
    //textAlign: "center",
    justifyContent: "space-between",
    textAlign: "left",
    alignItems: "center",
    //gap: 20,
    paddingTop: 20,
  },

  select: {
    width: 200,
  },

  text: {
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    color: "#999",
    //top: 100,
  },
  TEXT1: {
    fontSize: 35,
    textAlign: "center",
    fontWeight: "bold",
    position: "absolute",
    top: 120,
    color: "#afee",
  },

  background: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  image: {
    width: 250,
    height: 126,
    // marginRight: 10,
    resizeMode: "contain",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
});
