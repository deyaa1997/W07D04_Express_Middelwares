const express = require("express");

const app = express();
const port = 3000;
const userHandle = express.Router();
const productsHandle = express.Router();
const users = ["John", "Mark"];
const products = ["keyboard", "mouse"];

/*const logUsers = (req, res, next) => {
    console.log(users);
    next();
  };
*/

const logMethod = (req, res, next) => {
  console.log(req.method);
  next();
};

userHandle.use((req, res, next) => {
  console.log(users);
  next();
});

app.use(express.json());
// app.use(logUsers);
app.use("/users", logMethod);

if (users.length > 0) {
  app.get("/users", (req, res, next) => {
    res.json(users);
  });
} else {
  app.get("/users", (req, res, next) => {
    // create a new error
    const err = new Error("No users");
    // pass it to next, we only pass values to `next` when we want to call the error handling middleware
    next(err);
  });
}

userHandle.use("/create", (req, res, next) => {
  if (req.body.name) {
    console.log(req.body.name);
    next();
  }
});

userHandle.post("/create", (req, res) => {
  users.push(req.body.name);
  res.json(users);
});

productsHandle.post("/update", (req, res) => {
  // suppose update value and new value come from body like this :-
  /* {
        "update" : "keyboard",
    "newValue" : "ss"}
    */
  let status = false;
  for (let x = 0; x < products.length; x++) {
    if (req.body.update === products[x]) {
      products[x] = req.body.newValue;
      status = true;
      res.json("Your products Update");
    }
  }
  if (status === false) {
    res.json("You cant update this items");
  }
  console.log(products);
});

app.use((err, req, res, next) => {
  res.json(err.message);
});

app.use("/users", userHandle);
app.use("/products", productsHandle);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
