import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Update = () => {
  const [book, setBook] = useState({
    title: "",
    descr: "",
    price: "",
    cover: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const bookId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/books", bookId, book);
      navigate("/");
      console.log(bookId);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(book);
  return (
    <div className="form">
      <h1>Update book</h1>
      <input
        type="text"
        placeholder="title"
        onChange={handleChange}
        name="title"
      />
      <input
        type="text"
        placeholder="description"
        onChange={handleChange}
        name="descr"
      />
      <input
        type="number"
        placeholder="price"
        onChange={handleChange}
        name="number"
      />
      <input
        type="text"
        placeholder="cover"
        onChange={handleChange}
        name="cover"
      />
      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default Update;
