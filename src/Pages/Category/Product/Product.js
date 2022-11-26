import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './Product.css';

const Product = ({ product, setActiveProduct }) => {
  const {
    picture,
    name,
    location,
    resalePrice,
    originalPrice,
    yearOfUse,
    createdAt,
    sellerName,
    verified,
  } = product;

  const date = new Date(createdAt).toDateString();

  const handleClick = () => {
    console.log('yes');
    setActiveProduct(product);
  };

  return (
    <div className="product flex flex-col">
      <div>
        <img className="rounded-xl" src={picture} alt="" />
      </div>
      <div className="flex flex-col px-2 mt-3">
        <h2 className="text-2xl font-bold mb-4"> {name} </h2>
        <div className="flex flex-col items-start gap-4">
          <p>{location}</p>
          <p>Used: {yearOfUse}/yr</p>
          <p>Posted At: {date}</p>
          <p className=" flex items-center gap-2">
            Seller Name: {sellerName}
            {verified && <FaCheckCircle className="text-blue-500"></FaCheckCircle>}
          </p>
          <p className="px-5 py-3 rounded-full bg-cgray font-semibold">
            Original Price: ${originalPrice / 1000}k
          </p>
          <p className="px-5 py-3 rounded-full bg-cgray font-semibold">
            Resale Price: ${resalePrice / 1000}k
          </p>
        </div>
        <div className="mt-5">
          <button
            onClick={handleClick}
            className="py-3 px-5 rounded-full bg-main text-white transition-all hover:bg-cgray hover:text-dark">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
