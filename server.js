const express = require("express")
const mysql = require("mysql")
const cors = require("cors")

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

var port = process.env.REACT_APP_PORT

const db = mysql.createConnection({
    user: process.env.REACT_APP_MYSQL_USER,
    host: process.env.REACT_APP_MYSQL_HOST,
    password: process.env.REACT_APP_MYSQL_PWD,
    database: process.env.REACT_APP_MYSQL_DB,
})

app.post('/register', (req, res) => {

    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    const picture = req.body.picture

    db.query("INSERT INTO users (username, email, password, image) VALUES (?,?,?,?)",
    [username, email, password, picture],
    (err, result) => {
        console.log(err)
    })
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    db.query("SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
        if(err) {
            res.send({ err: err })
        } 

        if(result.length > 0) {
            res.send(result)
        } else {
            res.send({ message: "Incorrect username or password"})
        }
    })
})

app.get('/', (req, res) => {
    res.send('merge')
})

app.listen(3001, () => {
    console.log("running")
})