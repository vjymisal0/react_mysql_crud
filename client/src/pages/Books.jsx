import React, { useEffect, useState } from "react";
import axios from "axios";

const Books = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:3000");
        console.log(res);
        setBooks(res.data);
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
            {book.cover && <img src="{book.cover}" alt="" />}
            <h2>Z{book.title}</h2>
            <p>{book.descr}</p>
            {/* <span>{book.price}</span> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
