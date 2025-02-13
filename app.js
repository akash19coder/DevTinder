const express = require("express");
const { connectDB } = require("./db/connect-db");
const jwt = require("jsonwebtoken");
const app = express();
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/user.routes");

app.use(express.json());
app.use(cookieParser());

app.use("/user", userRouter);

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("server connected successfully");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
