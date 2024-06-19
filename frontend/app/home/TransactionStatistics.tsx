import { URL } from "@/constants/URL";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { Svg, Line } from "react-native-svg";
import Transaction from "./Transaction";

interface Transaction {
  categoryID: number;
  transactionID: number;
  title: string;
  amount: number;
  description: string;
  date: string;
}

export default function TransactionStatistics() {
  const params = useLocalSearchParams();
  const { userID } = params;
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  //chart
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: { data: number[] }[];
  }>({ labels: [], datasets: [{ data: [] }] });

  useEffect(() => {
    fetchTransactions();
  }, []);

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
  // bar chart
  const prepareChartData = () => {
    const labels: string[] = [];
    const data: number[] = [];
    const colors: ((opacity?: number) => string)[] = [];
    transactions.forEach((transaction) => {
      labels.push(transaction.title);
      data.push(transaction.amount);
      colors.push(
        transaction.amount < 0
          ? (opacity = 100) => `rgba(179, 10, 13, ${opacity})`
          : (opacity = 100) => `rgba(10, 179, 13, ${opacity})`
      );
      console.log("title:", transaction.title);
      // console.log(
      //   "Color: ",
      //   transaction.amount < 0 ? `rgba(179, 10, 13, 1)` : `rgba(10, 179, 13, 1)`
      // );
    });

    return {
      labels,
      datasets: [
        {
          data: data,
          colors: colors,
        },
      ],
    };
  };
  ///////

  return (
    <View style={styles.container}>
    <Text style={styles.header}>TRANSACTION STATISTICS</Text>
    {loading ? (
      <Text>Loading...</Text>
    ) : (
      <BarChart
        data={prepareChartData()}
        width={Dimensions.get('window').width - 20}
        height={450}
        yAxisLabel="$"
        yAxisSuffix="" // Add this line to fix the error
        fromZero={true}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#ffe5e5',
          backgroundGradientTo: '#f77f00',
          decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
         
            propsForBackgroundLines: {
              strokeWidth: 1,
              stroke: '#e3e3e3',
              strokeDasharray: "5, 5", // dashed lines for the background grid
            },
            barPercentage: 0.7,
            useShadowColorFromDataset: false,
          }}
            style = {{
            borderRadius: 16,
            marginVertical : 8,
          }}
          withCustomBarColorFromData={true}
          flatColor={true}
          showBarTops
          fromZero

    />
  )}
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