// Import de Mongoose
const mongoose = require('mongoose');

// Création du schéma pour la collection "categories"
const categorySchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is missing"] },
});

// Création du modèle pour la collection "categories"
const Category = mongoose.model(Category, categorySchema);
module.exports = Category