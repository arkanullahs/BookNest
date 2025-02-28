import React from 'react';
import { Link } from "react-router-dom";
import './BookCard.css'; // Import the CSS file

const BookCard = ({ data }) => {
    console.log(data);
    return (
        <>
            <Link>
                <div className="book-card">
                    <div className="book-image-container">
                        <img src={data.url} alt="/" className="book-image"/>
                    </div>
                    <h2 className="book-title">{data.title}</h2>
                    <p className="book-author">by {data.author}</p>
                    <p className="book-price">৳ {data.price}</p>
                </div>
            </Link>
        </>
    );
};

export default BookCard;
