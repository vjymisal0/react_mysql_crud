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
    console.log(req.body.price)
    db.query(sql1, [VALUES], (err, result) => {
        if (err) return res.json({ message: err })
        return res.json("Book has been created successfully")
    })
})

app.delete('/books/:id', (req, res) => {
    const bookId = req.params.id;
    const q = "DELETE FROM crud_react WHERE id = ?"

    db.query(q, [bookId], (err, data) => {
        if (err) return res.json(err);
        return res.json("Book has been deleted successfully")
    })
})

app.put("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const q = "UPDATE crud_react SET title = ?, descr = ?, price = ?, cover = ? WHERE id = ?"

    const values = [
        req.body.title,
        req.body.descr,
        req.body.price,
        req.body.cover,
        bookId
    ];

    console.log("Update values:", values); // Log the values being passed to the query

    db.query(q, values, (err, data) => {
        if (err) {
            console.error("Error updating book:", err);
            return res.status(500).json({ error: "Error updating book" });
        }
        console.log("Update result:", data); // Log the result of the update query
        return res.json("Book has been updated successfully");
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
}
)