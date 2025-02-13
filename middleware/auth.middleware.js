const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.send("User Not Authenticated");
  }

  const decodedToken = jwt.verify(token, "a12lk33lk4j");
  const { userID } = decodedToken;

  const user = await User.findOne({ _id: userID });
  if (user) {
    req.user = user;
    next();
  } else {
    throw new Error("User Not Authenticated");
  }
};

module.exports = userAuth;
