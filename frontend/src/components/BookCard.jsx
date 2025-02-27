import React from 'react'
import { Link } from "react-router-dom";
const BookCard = ({data}) => {
    console.log(data);
  return (
    <>
      <Link>
       <div className="bg-zinc-800 rounded p-4">
        <div className="bg-zinc-900">
            <img src={data.url} alt="/" className="h-[25bh]"/>
        </div>
        <h2 className="mt-4 text-xl font-semibold">{data.title}</h2>
        <p className="mt-2 text-zinc-400 font-semibold">by {data.author}</p>
        <p className="mt-2 text-zinc-400 font-semibold text-xl">
            ৳ {data.price}
        </p>
       </div>
      </Link>
    </>
  );
};

export default BookCard; 
