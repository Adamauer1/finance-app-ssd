const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const data = require("./data.js");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json(data);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  let authCheck = false;
  let userID = -1;
  for (let user of data.users) {
    if (user.username === username && user.password === password) {
      authCheck = true;
      userID = user.userID;
      break;
    }
  }
  res.json({ userID: userID, result: authCheck });
});

app.post("/transaction", (req, res) => {
  const { transactionID } = req.body;
  console.log(transactionID);
  for (let transaction of data.transactions) {
    if (transaction.transactionID === transactionID) {
      res.json(transaction);
      break;
    }
  }
});

app.post("/budget", (req, res) => {
  const { budgetID } = req.body;
  console.log(budgetID);
  for (let budget of data.budgets) {
    if (budget.budgetID === budgetID) {
      res.json(budget);
      break;
    }
  }
});

app.post("/user/transactions", (req, res) => {
  const { userID } = req.body;
  let transactions = [];

  for (let transaction of data.transactions) {
    if (transaction.userID === userID) {
      transactions.push(transaction);
    }
  }

  res.json(transactions);
});

app.post("/user/budgets", (req, res) => {
  const { userID } = req.body;
  let user;

  for (let u of data.users) {
    if (u.userID === userID) {
      user = u;
    }
  }

  let budgetIDs = new Set(user.budgetIDs);
  let budgets = [];

  for (let budget of data.budgets) {
    if (budgetIDs.has(budget.budgetID)) {
      budgets.push(budget);
    }
  }

  res.json(budgets);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
