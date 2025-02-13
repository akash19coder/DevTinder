const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    // TODO: the built-in validation are not working on username field
    // fix it after finshing the project
    username: {
      type: String,
      minLenth: [3, "Enter longer username"],
      maxLength: [14, "Enter shorter username"],
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate(email) {
        const isEmailValid = validator.isEmail(email);
        if (!isEmailValid) {
          throw new Error("Please enter valid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      validate(password) {
        const isPasswordStrong = validator.isStrongPassword(password);
        if (!isPasswordStrong) {
          throw new Error("Enter strong password");
        }
      },
    },
    photoURL: {
      type: String,
      validate(url) {
        const isPhotoURLValid = validator.isURL(url);
        if (!isPhotoURLValid) {
          throw new Error("Invalid Photo URL");
        }
      },
    },

    //TODO: add validation to age, skills, and bio fields
    age: {
      type: Number,
    },
    skills: {
      type: Array,
    },
    bio: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
