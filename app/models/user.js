const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const { encrypt } = require("../helpers/crypto.js");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "The email field is required."],
    unique: true,
    validate: {
      validator: function (email) {
        const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
        return emailRegex.test(email);
      },
      message: "Please filled a valid e-mail address",
    },
  },
  password: {
    type: String,
    required: [true, "The password field is required."],
    validate: {
      validator: function (value) {
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(
          value
        );
      },
      message:
        "The password must contain at least 8 characters, including at least 1 number and 1 special character.",
    },
  },
});

userSchema.plugin(uniqueValidator);

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("email") || !this.email) {
      return next();
    }
    // Encrypter l'email avec votre logique personnalisée
    this.email = this.email.toLowerCase().trim();
    const encryptedEmail = await encrypt(this.email);
    this.email = encryptedEmail;

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password") || !this.password) {
      return next();
    }

    // Hasher le mot de passe avec bcrypt
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;

    next();
  } catch (error) {
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;