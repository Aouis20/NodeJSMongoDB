require('dotenv').config()
const app = require("./app.js")

// Exemple de route
app.get('/', (req, res) => {
  res.send('Bienvenue sur MongoDB !');
});