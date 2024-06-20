const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const data = require("./data.js");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// default route
app.get("/", (req, res) => {
  //res.json(data);
});

// respones with the list of users
app.get("/users", (req, res) => {
  res.json(data.users);
});

// check username and password with the user accounts saved
// respones with the userID and a result of true if login is successful
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
  res.json({ userID: userID, result: authCheck });

  // for testing the app auto login
  //res.json({ userID: 1, result: true });
});

// adds a new user to the list of users based on the information from req.body
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

// respones with the information of the transaction based on transactionID
// not implemented on the frontend
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

// respones with the preperation data in order to add a transaction
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

// builds the new transaction from the information provided then adds the transaction id to
// the list of transactions in the user and budget datasets
// Also performs the action of changing the total amount of the budget that the transcation
// is applied to
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
    amount: parseFloat(amount),
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
      budget.totalAmount += newTransaction.amount;
      break;
    }
  }
  console.log(newTransaction);
  data.transactions.push(newTransaction);
});

// not implemented
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

// not implemented
app.post("/deleteTransaction", (req, res) => {
  const { transactionID, userID } = req.body;
  // remove transaction from data.transaction and data.userID
});

// not implemented
app.post("/budget", (req, res) => {
  const { budgetID } = req.body;
});

// builds the new budget created by the user
// then adds the budget to the list of budgets in the user dataset
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

// not implemented
app.post("/editBudget", (req, res) => {
  const { budgetID } = req.body;
});

// not implemented
app.post("/deleteBudget", (req, res) => {
  const { budgetID } = req.body;
});

// response with the list of all transactions that have the userID that is
// provided by req.body
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

// response with the list of all budgets that have the userID that is
// provided by req.body
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

// starts the server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  // console.log(parseFloat("40fe"));
  console.log(isNaN("403"));
});
