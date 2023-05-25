// Import de Mongoose
const mongoose = require('mongoose');
const User = require('./user');


// Création du schéma pour la collection "accounts"
const accountSchema = new mongoose.Schema({
    bankName: { type: String, required: [true, "Bank name is missing"]},
    customName: {
        type: String,
        required: [true, "Custom name is missing"],
        minlength: [2, "Custom name should have at least 2 characters"],
        maxlength: [100, "Custom name should have at most 100 characters"],
        validate: {
            validator: function(value) {
                return /^[A-Za-z\s]+$/.test(value);
            },
            message: "Custom name should only contain letters and spaces"
        }
    },
    lastUpdated: { type: Date },
    user: {
        id: {type: mongoose.Types.ObjectId },
        ref: "User",
        required: [true, "User is missing"]
    }
});

// Création du modèle pour la collection "accounts"
const Account = mongoose.model("Account", accountSchema);
module.exports = Account