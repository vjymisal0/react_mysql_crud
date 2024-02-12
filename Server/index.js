import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
const app = express()
const port = 3000
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: '',
        database: "react_crud"
    }
)
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
    res.json({ message: "Welcome to our application" })
})
app.get('/books', (req, res) => {
    const sql = "SELECT * FROM crud_react"
    db.query(sql, (err, result) => {
        if (err) throw err
        res.json(result)
    })
})
app.post("/books", (req, res) => {

    const sql1 = "INSERT INTO crud_react (`title`, `descr`,`price` , `cover`) VALUES(?)"

    const VALUES = [
        req.body.title,
        req.body.descr,
        req.body.price,
        req.body.cover,
    ]
    db.query(sql1, [VALUES], (err, result) => {
        if (err) return res.json({ message: err })
        return res.json("Book has been created successfully")
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
}
)
