import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBook.css";

const AddBook = () => {
  const [bookData, setBookData] = useState({
    image: "",
    title: "",
    price: "",
    description: "",
    category: "",
    status: "Available"
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookData({ ...bookData, [name]: value });
  };

  const handleSubmit = () => {
    console.log("Book Added:", bookData);
    navigate("/dashboard");
  };

  return (
    <div className="add-book-wrapper">
      <div className="add-book-container">
        <h2>Add a New Book</h2>
        <input 
          type="text" 
          name="image" 
          placeholder="Image URL" 
          value={bookData.image} 
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="title" 
          placeholder="Title" 
          value={bookData.title} 
          onChange={handleChange} 
        />
        <input 
          type="text" 
          name="price" 
          placeholder="Price" 
          value={bookData.price} 
          onChange={handleChange} 
        />
        <textarea 
          name="description" 
          placeholder="Description" 
          value={bookData.description} 
          onChange={handleChange} 
        ></textarea>
        <input 
          type="text" 
          name="category" 
          placeholder="Category" 
          value={bookData.category} 
          onChange={handleChange} 
        />
        <select name="status" value={bookData.status} onChange={handleChange}>
          <option value="Available">Available</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
        <button className="add-book-btn" onClick={handleSubmit}>Add</button>
      </div>
    </div>
  );
};

export default AddBook;