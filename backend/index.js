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
  for (user of data.users) {
    if (user.username === username && user.password === password) {
      authCheck = true;
      userID = user.userID;
      break;
    }
  }
  res.json({ userID: userID, result: authCheck });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
