import { URL } from "@/constants/URL";
import axios from "axios";
import { useLocalSearchParams, router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import { BarChart } from "react-native-chart-kit";

interface Transaction {
  categoryID: number;
  transactionID: number;
  title: string;
  amount: number;
  description: string;
  date: string;
}

export default function ViewTrans() {
  const params = useLocalSearchParams();
  const { userID } = params;
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  //chart
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { data: number[] }[];
  }>({ labels: [], datasets: [{ data: [] }] });

  //let transactions: [] = [];
  //const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchTransactions();
  }, []);
  // requests all of the transactions that belong to the user
  const fetchTransactions = () => {
    axios
      .post(`${URL}/user/transactions`, { userID })
      .then((res) => {
        setTransactions(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        alert("Failed to fetch transactions");
        setLoading(false);
      });
  };
  //display all transaction
  const renderItem = ({ item }: { item: Transaction }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionText}>{`Title: ${item.title}`}</Text>
      <Text style={styles.transactionText}>{`Amount: $${item.amount}`}</Text>
      <Text
        style={styles.transactionText}
      >{`Description: ${item.description}`}</Text>
      <Text style={styles.transactionText}>{`Date: ${new Date(
        item.date
      ).toLocaleDateString()}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SHOW TRANSACTIONS</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        // List of all the transactions
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.transactionID.toString()}
          renderItem={renderItem}
          style={styles.flatList}
        />
      )}

      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
    color: "#afee",
    marginBottom: 40,
  },
  button: {
    width: 300,
    height: 50,
    padding: 10,
    backgroundColor: "#afee",
    marginTop: 20,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  transactionItem: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
  },
  transactionText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 5,
  },
  flatList: {
    width: "100%",
  },
});
