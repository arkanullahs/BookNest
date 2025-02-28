import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import './ViewBookDetails.css'; // Import the CSS file

const ViewBookDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:1000/api/v1/get-book-by-id/${id}`);
                setData(response.data.data);
            } catch (error) {
                console.error("Error fetching book details:", error);
            }
        };
        fetchBook();
    }, [id]);

    if (!data) {
        return <p className="loading-text">Loading book details...</p>;
    }

    return (
        <>
        {data && (
            <div className="book-details-container">
                <div className="book-image-container">
                    <img src={data.url} alt={data.title} className="book-image" />
                </div>
                <div className="book-info">
                    <h1 className="book-title">{data.title}</h1>
                    <p className="book-author">by {data.author}</p>
                    <p className="book-description">{data.desc}</p>
                    <p className="book-language">
                        <GrLanguage className="language-icon" />{data.language}
                    </p>
                    <p className="book-price">Price: ৳ {data.price}</p>
                </div>
            </div>
        )}
        </>
    );
};

export default ViewBookDetails;
