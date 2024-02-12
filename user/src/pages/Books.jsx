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
            <span>{book.price}</span>
            <p>{book.descr}</p>
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
