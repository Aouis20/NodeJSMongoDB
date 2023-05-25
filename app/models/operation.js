// Import de Mongoose
const mongoose = require('mongoose');
const Category = require('./category');
const Account = require('./account');

// Création du schéma pour la collection "accounts"
const operationSchema = new mongoose.Schema({
    label: {
        type: String,
        required: [true, "Label is missing"],
        minlength: [2, "Label should have at least 2 characters"],
        maxlength: [100, "Label should have at most 100 characters"]
    },
    type: {
        type: String,
        enum: {
            values: ["debit", "credit"],
            message: "Invalid operation type. Must be either 'debit' or 'credit'."
        },
        required: [true, "Operation type is missing"]
    },
    amount: { type: Number, required: [true, "Amount is missing"], min: 1 },
    paymentDate: { type: Date, required: [true, "Payment date is missing"]},
    paymentMethod: {
        type: String,
        enum: {
        values: ["Cash", "Direct Deposit", "Credit Card", "Bank Transfer"],
        message: "Invalid payment method."
        },
        required: [true, "Payment method is missing"]
    },
    isCheck: { type: Boolean, required: [true, "Check is missing"] },
    category: {
        id: { type: mongoose.Types.ObjectId },
        ref: "Category",
        required: [true, "Category is missing"]
    },
    accountId: {
        id: { type: mongoose.Types.ObjectId },
        ref: "Account",
        required: [true, "Account is missing"]
    }
});

// Création du modèle pour la collection "accounts"
const Operation = mongoose.model("Operation", operationSchema);
module.exports = Operation