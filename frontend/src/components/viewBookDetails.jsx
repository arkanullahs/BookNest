import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";

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
        return <p className="text-center text-zinc-400 mt-8">Loading book details...</p>;
    }

    return (
        <>
        {data && (
            <div className="px-12 py-8 bg-zinc-900 flex gap-8">
            <div className="bg-zinc-800 rounded p-4 h-[88vh] w-3/6 flex items-center justify-center">
                {" "} 
                <img src={data.url} alt={data.title} className="h-[70vh]" />
            </div>
            <div className="p-4 w-3/6">
                <h1 className="text-4xl text-zinc-300 font-semibold">{data.title}</h1>
                <p className="text-zinc-400 mt-1">by {data.author}</p>
                <p className="text-zinc-500 mt-4 text-xl">{data.desc}</p>
                <p className="flex mt-4 items-center justify-start text-zinc-400">
                    <GrLanguage className="mr-3" />{data.language}
                </p>
                <p className="mt-4 text-zinc-100 text-3xl font-semibold">
                    Price: ৳ {data.price}
                </p>
            </div>
        </div>
        )}
        </>
    );
};

export default ViewBookDetails;
