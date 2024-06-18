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
import { useLocalSearchParams } from "expo-router";
import { URL } from "@/constants/URL";
import { IndexPath, Layout, Select, SelectItem } from "@ui-kitten/components";
//const URL = ' 192.168.6.109'; // Your server IP

interface BudgetInfo {}

interface CategoryInfo {}

export default function AddTrans() {
  const params = useLocalSearchParams();
  const { userID } = params;
  const [isLoading, setIsLoading] = useState(true);
  //const [userID, setUserID] = useState("");
  const [budgetID, setBudgetID] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [budgetNames, setBudgetNames] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);
  const [selectedBudgetIndex, setSelectedBudgetIndex] = useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<
    IndexPath | IndexPath[]
  >(new IndexPath(0));
  useEffect(() => {
    // gets all transaction objects
    axios
      .post(`${URL}/user/addTransInfo`, {
        userID,
      })
      .then((res) => {
        //budgetIDs = res.data;
        setBudgetNames(res.data.budgets);
        setCategoryNames(res.data.categorys);
        //console.log(budgetIDs);
      });
    // .finally(() => {
    //   setIsLoading(false);
    // });
  }, []);

  const onPressAddTransaction = async () => {
    try {
      const response = await axios.post(`${URL}/addTransaction`, {
        userID,
        budgetID,
        categoryID,
        title,
        description,
        amount,
        date,
      });
      console.log("Transaction ID:", response.data.transactionID);
      console.log("Transaction ID:", response.data.userID);
      console.log("Transaction ID:", response.data.budgetID);
    } catch (error) {
      console.error(error);
    }
  };

  const buildNameList = (names: number[]) => {
    return names.map((id) => {
      return <SelectItem title={id} key={id} />;
    });
  };

  // const buildBudgetNameList = () => {
  //   //console.log(budgetIDs);
  //   return budgetNames.map((name) => {
  //     console.log(name);
  //     return <SelectItem title={name} key={name} />;
  //   });
  // };

  // const buildCategoryNameList = () => {
  //   return categoryNames.map((name) => {
  //     return <SelectItem title={name} key={name} />;
  //   });
  // };

  return (
    <View style={styles.container}>
      {/* <View style={styles.imageContainer}>
        <Image source={require("@/images/Main.png")} style={styles.image} />
      </View> */}

      <Text style={styles.TEXT1}>ADD TRANSACTION</Text>
      <Layout style={styles.inputRow}>
        <Text style={styles.text}>Budget:</Text>
        <Select
          style={styles.select}
          selectedIndex={selectedBudgetIndex}
          onSelect={(index) => setSelectedBudgetIndex(index)}
          value={
            selectedBudgetIndex
              ? budgetNames[(selectedBudgetIndex as IndexPath).row]
              : "Select an option"
          }
        >
          {buildNameList(budgetNames)}
        </Select>
      </Layout>
      <Layout style={styles.inputRow}>
        <Text style={styles.text}>Title:</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      </Layout>
      <Layout style={styles.inputRow}>
        <Text style={styles.text}>Amount:</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="numeric"
        />
      </Layout>
      <Layout style={styles.inputRow}>
        <Text style={styles.text}>Category:</Text>
        <Select
          style={styles.select}
          selectedIndex={selectedCategoryIndex}
          onSelect={(index) => setSelectedCategoryIndex(index)}
          value={
            selectedCategoryIndex
              ? categoryNames[(selectedCategoryIndex as IndexPath).row]
              : "Select an option"
          }
        >
          {buildNameList(categoryNames)}
        </Select>
      </Layout>
      <Layout style={styles.inputRow}>
        <Text style={styles.text}>Date</Text>
        <TextInput style={styles.input} value={date} onChangeText={setDate} />
      </Layout>
      <Layout style={styles.inputRow}>
        <Text style={styles.text}>Description</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
        />
      </Layout>
      <Pressable style={styles.button} onPress={onPressAddTransaction}>
        <Text style={styles.buttonText}>Add Transaction</Text>
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
