const express = require("express");

const app = express();
const port = 3000;
const userHandle = express.Router()

const users = ["John", "Mark"];

/*const logUsers = (req, res, next) => {
    console.log(users);
    next();
  };
*/

const logMethod =
  ("/users",
  (req, res, next) => {
    console.log(req.method);
    next();
  });

  userHandle.use((req, res, next) => {
    console.log(users);
    next();
  });

const create = (req, res, next) => {
    if (req.body.name){
        console.log(req.body.name);
        next();
    }
  };

app.use(express.json());
// app.use(logUsers);
app.use(logMethod);
app.use("/users/create",create)
  app.use("/users", userHandle);


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

app.post("/users/create" , (req,res) =>{
    users.push(req.body.name)
    res.json(users)

})

app.use((err, req, res, next) => {
  res.json(err.message);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
