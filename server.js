const express = require('express');
const mongoose = require('mongoose');

// Création de l'application Express
const app = express();

// Connexion à la base de données MongoDB
mongoose.connect('mongodb+srv://aouiscbpro:2OivCgrd62RGfd1C@coursmongo.ndzdpa9.mongodb.net/', {
  ssl: true,
})
  .then(() => {
    console.log('Connexion à MongoDB réussie');
  })
  .catch((error) => {
    console.log('Erreur de connexion à MongoDB :', error);
  });

// Définition des routes et des middleware pour votre application

// Exemple de route
app.get('/', (req, res) => {
  res.send('Bienvenue sur votre serveur Express avec MongoDB !');
});

// Démarrage du serveur
app.listen(3000, () => {
  console.log('Le serveur est démarré sur le port 3000');
});
