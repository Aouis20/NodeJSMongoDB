// Import de Mongoose
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma pour la collection "users"
const userSchema = new mongoose.Schema({
    lastname: { type: String, required: true },
    age: {type: Number, min: [18,"L'age minimum est 18 ans, reçu: {VALUE}"], max: [100,"L'age maximum est 100 ans, reçu: {VALUE}"] },
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
    password: { type: String, required: true, minLength: 8 },
});

userSchema.plugin(uniqueValidator)

// Création du modèle pour la collection "utilisateurs"
const User = mongoose.model(User, userSchema);
module.exports = User