require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const db = process.env.DATABASE_URL
const dbname = process.env.DATABASE_NAME
// Création de l'application Express
const app = express();

// Connexion à la base de données MongoDB
mongoose.connect(db, {
  ssl: true
})
  .then(() => {
    console.log('Connexion à MongoDB réussie, sur la bdd', dbname);
  })
  .catch((error) => {
    console.log('Erreur de connexion à MongoDB :', error);
  });

  module.exports = app

