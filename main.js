const express = require("express");

const app = express();
const port = 3000;

const users = ["John", "Mark"];
const logUsers = (req , res , next) => {
    console.log(users)
    next()
}



app.use(express.json());
app.use(logUsers)


app.get("/users", (req, res, next) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});