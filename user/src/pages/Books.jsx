import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Books = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000/books");
        setBooks(res.data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);
  return (
    <div>
      <h1>Book Shop</h1>
      <div className="books">
        {books.map((book) => (
          <div className="book" key={book.id}>
            {book.cover && <img src={book.cover} alt={book.title} />}
            <h3>{book.title}</h3>
            <p>{book.descr}</p>
            <span>{book.price}</span>
            <button className="update">Update</button>
            <button className="delete">Delete</button>
          </div>
        ))}
      </div>
      <button>
        <Link to="/Add">Add new book</Link>
      </button>
    </div>
  );
};

export default Books;
