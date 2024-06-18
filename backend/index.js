const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const data = require("./data.js");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  //res.json(data);
});

app.get("/users", (req, res) => {
  res.json(data.users);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  // console.log(username);
  // console.log(password);
  let authCheck = false;
  let userID = -1;
  for (let user of data.users) {
    if (user.username === username && user.password === password) {
      authCheck = true;
      userID = user.userID;
      break;
    }
  }
  //res.json({ userID: userID, result: authCheck });
  res.json({ userID: 1, result: true });
});

app.post("/signup", (req, res) => {
  const { username, password, email } = req.body;

  //let userID = data.users.length;
  let newUser = {
    userID: data.users.length + 1,
    username: username,
    email: email,
    password: password,
    budgetIDs: [],
    transactionIDs: [],
  };
  data.users.push(newUser);
});

app.post("/transaction", (req, res) => {
  const { transactionID } = req.body;
  console.log(transactionID);
  for (let transaction of data.transactions) {
    if (transaction.transactionID == transactionID) {
      res.json(transaction);
      break;
    }
  }
});

app.post("/user/addTransInfo", (req, res) => {
  const { userID } = req.body;
  let user;
  for (let u of data.users) {
    if (u.userID == userID) {
      user = u;
    }
  }

  let budgetIDs = new Set(user.budgetIDs);
  let budgetNames = [];
  let budgets = {};

  for (let budget of data.budgets) {
    if (budgetIDs.has(budget.budgetID)) {
      budgets[budget.budgetID] = budget.budgetName;
      budgetNames.push(budget.budgetName);
    }
  }

  let ret = {
    budgets: budgets,
    categorys: ["Rent", "Groceries", "Payment", "Gas"],
  };
  console.log(ret);
  res.json(ret);
});

app.post("/addTransaction", (req, res) => {
  const { userID, budgetID, categoryID, title, description, amount, date } =
    req.body;

  let newTransaction = {
    transactionID: data.transactions.length + 1,
    userID: parseInt(userID),
    budgetID: parseInt(budgetID),
    categoryID: parseInt(categoryID),
    title: title,
    description: description,
    amount: amount,
    date: date,
  };

  for (let user of data.users) {
    if (user.userID == userID) {
      user.transactionIDs.push(newTransaction.transactionID);
      break;
    }
  }
  for (let budget of data.budgets) {
    if (budget.budgetID == budgetID) {
      budget.transactionIDs.push(newTransaction.transactionID);
      break;
    }
  }
  console.log(newTransaction);
  data.transactions.push(newTransaction);
});

app.post("/editTransaction", (req, res) => {
  const {
    transactionID,
    userID,
    budgetID,
    categoryID,
    title,
    description,
    amount,
    date,
  } = req.body;

  for (let transaction of data.transactions) {
    if (transaction.transactionID == transactionID) {
      transaction.categoryID = categoryID;
      transaction.title = title;
      transaction.categoryID = description;
      transaction.amount = amount;
      transaction.date = date;
      break;
    }
  }
});

app.post("/deleteTransaction", (req, res) => {
  const { transactionID, userID } = req.body;
  // remove transaction from data.transaction and data.userID
});

app.post("/budget", (req, res) => {
  const { budgetID } = req.body;
});

app.post("/addBudget", (req, res) => {
  const { userID, budgetName, totalAmount, startDate, endDate } = req.body;

  let userIDs = [];
  userIDs.push(parseInt(userID));
  let newBudget = {
    budgetID: data.budgets.length + 1,
    budgetName: budgetName,
    totalAmount: parseFloat(totalAmount),
    startDate: startDate,
    endDate: endDate,
    userIDs: userIDs,
    transactionIDs: [],
  };

  for (let user of data.users) {
    if (user.userID == userID) {
      user.budgetIDs.push(newBudget.budgetID);
      break;
    }
  }
  console.log(newBudget);
  data.budgets.push(newBudget);
});

app.post("/editBudget", (req, res) => {
  const { budgetID } = req.body;
});

app.post("/deleteBudget", (req, res) => {
  const { budgetID } = req.body;
});

app.post("/user/transactions", (req, res) => {
  const { userID } = req.body;
  let transactions = [];
  //console.log(userID);
  for (let transaction of data.transactions) {
    //console.log(transaction);
    if (transaction.userID == userID) {
      transactions.push(transaction);
    }
  }
  //console.log(transactions);
  res.json(transactions);
});

app.post("/user/budgets", (req, res) => {
  const { userID } = req.body;
  let user;

  for (let u of data.users) {
    if (u.userID == userID) {
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
