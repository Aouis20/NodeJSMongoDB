// Import de Mongoose
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma pour la collection "users"
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: [true, "Email address is missing"],
        unique: true,
        validate: {
            validator: function (value) {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(value);
            },
            message: props => `${props.value} isn't a valid email address`
        }
    },
    password: {
        type: String,
        required: [true, 'The password is missing'],
        minLength: 8,
        validate: {
            validator: function (value) {
                const passwordRegex = /^(?=.*[0-9)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/
                return passwordRegex.test(value)
            },
            message: "The password must contain at least 8 character including 1 special character and 1 number"
        }
    },
});

userSchema.plugin(uniqueValidator)

// Création du modèle pour la collection "users"
const User = mongoose.model("User", userSchema);
module.exports = User