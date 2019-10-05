const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/api/user");

mongoose
  .connect("mongodb://localhost:27017/project-xedike", {
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log("connected successfully");
  })
  .catch(err => {
    console.log(err);
  });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/user", userRouter);

const port = 7777;
app.listen(port, () => {
  console.log("app is listening on ", port);
});
