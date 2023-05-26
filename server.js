require('dotenv').config()
const app = require("./app.js")
const cors = require("cors")
const port = process.env.PORT

app.use(cors({
    origin: 'http://localhost:8080',
    optionSuccessStatus: 200,
}))

app.get('', (req, res) => {
    res.send('Hello from server.js')
})

app.listen(port, () => {
    console.log('App listening on port', port)
})