import axios from "axios";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { URL } from "@/constants/URL";

interface Budget {
  budgetID: number;
  budgetName: string;
  totalAmount: number;
  startDate: string;
  endDate: string;
  numOfUsers: number;
  numOfTransactions: number;
}

export default function ViewBudget() {
  const params = useLocalSearchParams();
  const { userID } = params;
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBudgets();
  }, []);
  // requests all of the budgets that belong to the user
  const fetchBudgets = () => {
    axios
      .post(`${URL}/user/budgets`, { userID })
      .then((res) => {
        setBudgets(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
        alert("Failed to fetch transactions");
        setLoading(false);
      });
  };

  // generates the list items for all the budgets
  const renderItem = ({ item }: { item: Budget }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionText}>{`Name: ${item.budgetName}`}</Text>
      <Text
        style={styles.transactionText}
      >{`Total Amount: $${item.totalAmount}`}</Text>
      <Text style={styles.transactionText}>{`Start Date: ${new Date(
        item.startDate
      ).toLocaleDateString()}`}</Text>
      <Text style={styles.transactionText}>{`End Date: ${new Date(
        item.endDate
      ).toLocaleDateString()}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>SHOW BUDGETS</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        // List of all the budgets
        <FlatList
          data={budgets}
          keyExtractor={(item) => item.budgetID.toString()}
          renderItem={renderItem}
          style={styles.flatList}
        />
      )}
      {/* Button to go back on the navigation stack */}
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
