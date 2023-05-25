// Import de Mongoose
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma pour la collection "users"
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (value) {
                const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(email);
            },
            message: props => `${props.value} n'est pas une adresse e-mail valide.`
        }
    },
    password: { type: String, required: [true, 'The password is missing'], minLength: 8 },
});

userSchema.plugin(uniqueValidator)

// Création du modèle pour la collection "users"
const User = mongoose.model(User, userSchema);
module.exports = User