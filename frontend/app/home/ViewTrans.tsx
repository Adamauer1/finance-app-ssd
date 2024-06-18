import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { Divider, List, ListItem } from "@ui-kitten/components";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { URL } from "@/constants/URL";

interface Transaction {
  transactionID: number;
  userID: number;
  budgetID: number;
  categoryID: number;
  title: string;
  description: string;
  amount: number;
  date: string;
}

export default function ViewTransactionScreen() {
  const params = useLocalSearchParams();
  const { userID } = params;
  //console.log(userID);
  //console.log(transactions);
  //const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  //let transactions: [] = [];
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios
      .post(`${URL}/user/transactions`, {
        userID,
      })
      .then((res) => {
        //console.log(res.data);
        //transactions = res.data;
        setTransactions(res.data);
        //console.log(transactions);
      });
  }, []);

  const renderItem = ({ item }: { item: Transaction }) => {
    //console.log(item);
    //return <Text>Test</Text>;
    console.log(item.title);
    return <ListItem title={item.title} description={item.amount} />;
  };

  return (
    <View style={styles.container}>
      <List
        style={styles.container}
        data={transactions}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "black",
  },
  text: {
    color: "white",
  },
  item: {
    padding: 10,
    marginVertical: 8,
    backgroundColor: "#333",
    borderRadius: 5,
  },
});
