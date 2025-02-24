import React, { useState } from "react";
import axios from "axios";
import "./AddBook.css"; // Import the CSS file

const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/add-book",
          Data,
          { headers }
        );
        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="add-book-container">
      <h1 className="add-book-title">Add Book</h1>
      <div className="form-container">
        {/* Image URL */}
        <div>
          <label htmlFor="image" className="label">
            Image URL
          </label>
          <input
            id="image"
            type="text"
            className="input"
            placeholder="URL of image"
            name="url"
            required
            value={Data.url}
            onChange={change}
          />
        </div>

        {/* Title of Book */}
        <div className="mt-4">
          <label htmlFor="title" className="label">
            Title of Book
          </label>
          <input
            id="title"
            type="text"
            className="input"
            placeholder="Enter book title"
            name="title"
            required
            value={Data.title}
            onChange={change}
          />
        </div>

        {/* Author of Book */}
        <div className="mt-4">
          <label htmlFor="author" className="label">
            Author of Book
          </label>
          <input
            id="author"
            type="text"
            className="input"
            placeholder="Enter author's name"
            name="author"
            required
            value={Data.author}
            onChange={change}
          />
        </div>

        {/* Language */}
        <div className="mt-4">
          <label htmlFor="language" className="label">
            Language
          </label>
          <input
            id="language"
            type="text"
            className="input"
            placeholder="Enter book language"
            name="language"
            required
            value={Data.language}
            onChange={change}
          />
        </div>

        {/* Price */}
        <div className="mt-4">
          <label htmlFor="price" className="label">
            Price
          </label>
          <input
            id="price"
            type="number"
            className="input"
            placeholder="Enter price"
            name="price"
            required
            value={Data.price}
            onChange={change}
          />
        </div>

        {/* Description of Book */}
        <div className="mt-4">
          <label htmlFor="description" className="label">
            Description of Book
          </label>
          <textarea
            id="description"
            className="textarea"
            rows="5"
            placeholder="Description of book"
            name="desc"
            required
            value={Data.desc}
            onChange={change}
          />
        </div>

        {/* Submit Button */}
        <button className="submit-button" onClick={submit}>
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
