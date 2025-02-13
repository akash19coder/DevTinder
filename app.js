const express = require("express");
const { connectDB } = require("./db/connect-db");
const User = require("./models/user.model");
const jwt = require("jsonwebtoken");
const app = express();
const cookieParser = require("cookie-parser");
const userAuth = require("./middleware/auth.middleware");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  const { username, email, password, photoURL } = req.body;

  try {
    const user = {
      username,
      email,
      password,
      photoURL,
    };

    const response = await User.create(user);
    res.status(200).json({
      message: "User created successfully",
      data: response,
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).send(err.message);
  }
});

app.post("/login", async (req, res) => {
  //get input email and password
  const { email, password } = req.body;

  try {
    //compare email and password
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User does not exist");
    }

    //match -> send token in cookie.
    const isPasswordMatch = user.password === password;

    if (!isPasswordMatch) {
      res.status(400).send("Invalid credentials");
    }
    // generate a token = user._id
    const token = jwt.sign({ userID: user._id }, "a12lk33lk4j");

    res.cookie("token", token);
    res.status(200).send("User logged in - " + user.username);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      throw new Error("User not found");
    }
    res.json({
      data: user,
    });
  } catch (err) {
    res.send(err.message);
  }
});

app.patch("/profile", userAuth, async (req, res) => {
  //define allowed fields to be updated
  const allowedFieldsUpdate = ["username", "skills", "photoURL", "age", "bio"];

  //get the data from user
  const updatedInfo = req.body;

  try {
    //check if allowed fields are only being updated
    const isValidUpdate = Object.keys(updatedInfo).every((value) =>
      allowedFieldsUpdate.includes(value)
    );

    if (!isValidUpdate) {
      throw new Error("restricted field update");
    }
    console.log(req.user);
    const user = await User.findByIdAndUpdate(req.user._id, updatedInfo, {
      new: true,
    });

    res.json({
      data: user,
    });
  } catch (err) {
    res.send(err.message);
  }
});

connectDB()
  .then(() => {
    app.listen(3000, () => {
      console.log("server connected successfully");
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
