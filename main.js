const express = require("express");

const app = express();
const port = 3000;

const users = [];
const logUsers = (req, res, next) => {
  console.log(users);
  next();
};

const logMethod =
  ("/users",
  (req, res, next) => {
    console.log(req.method);
    next();
  });

app.use(express.json());
app.use(logUsers);
app.use(logMethod);

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

app.use((err, req, res, next) => {
  res.json(err.message);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
