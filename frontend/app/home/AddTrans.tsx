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

export default function AddTrans() {
  const params = useLocalSearchParams();
  const { userID } = params;
  //const [isLoading, setIsLoading] = useState(true);
  const [budgetID, setBudgetID] = useState(0);
  const [categoryID, setCategoryID] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [budgetNames, setBudgetNames] = useState({});
  const [budgetIDs, setBudgetIDs] = useState<[]>([]);
  const [categoryIDs, setCategoryIDs] = useState<[]>([]);
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
        setBudgetNames(res.data.budgets);
        const budgetKeys: number[] = Object.keys(res.data.budgets).map((key) =>
          parseInt(key)
        );
        //still works just a typescript type error
        // @ts-ignore comment
        setBudgetIDs(budgetKeys);
        setBudgetID(budgetKeys[0]);
        setCategoryNames(res.data.categorys);
        const categoryKeys = Object.keys(res.data.categorys).map((key) =>
          parseInt(key)
        );
        //still works just a typescript type error
        // @ts-ignore comment
        setCategoryIDs(categoryKeys);
        setCategoryID(categoryKeys[0]);
        //console.log(budgetIDs);
      });
  }, []);

  const onPressAddTransaction = () => {
    //console.log(date);
    axios.post(`${URL}/addTransaction`, {
      userID,
      budgetID,
      categoryID,
      title,
      description,
      amount,
      date,
    });

    router.back();
    // router.replace({
    //   pathname: `/home/Transaction`,
    //   params: { userID: userID },
    // });
  };

  const buildNameList = (data: {}, ids: []) => {
    // return budgetIDs.map((id) => {
    //   return <SelectItem title={budgetNames[id]} key={id} />;
    // });
    return ids.map((id) => {
      return <SelectItem title={data[id]} key={id} />;
    });
  };

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
          onSelect={(index) => {
            console.log(budgetIDs[(index as IndexPath).row]);
            setSelectedBudgetIndex(index);
            setBudgetID(budgetIDs[(index as IndexPath).row]);
          }}
          value={
            selectedBudgetIndex
              ? budgetNames[budgetIDs[(selectedBudgetIndex as IndexPath).row]]
              : "Select an option"
          }
        >
          {buildNameList(budgetNames, budgetIDs)}
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
          value={amount.toString()}
          onChangeText={(text) => setAmount(parseFloat(text))}
          keyboardType="numeric"
        />
      </Layout>
      <Layout style={styles.inputRow}>
        <Text style={styles.text}>Category:</Text>
        <Select
          style={styles.select}
          selectedIndex={selectedCategoryIndex}
          onSelect={(index) => {
            console.log(categoryIDs[(index as IndexPath).row]);
            setCategoryID(categoryIDs[(index as IndexPath).row]);
            setSelectedCategoryIndex(index);
          }}
          value={
            selectedCategoryIndex
              ? categoryNames[
                  categoryIDs[(selectedCategoryIndex as IndexPath).row]
                ]
              : "Select an option"
          }
        >
          {buildNameList(categoryNames, categoryIDs)}
        </Select>
      </Layout>
      <Layout style={styles.inputRow}>
        <Text style={styles.text}>Date</Text>
        {/* <TextInput style={styles.input} value={date} onChangeText={setDate} /> */}
        <Datepicker date={date} onSelect={(nextDate) => setDate(nextDate)} />
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
