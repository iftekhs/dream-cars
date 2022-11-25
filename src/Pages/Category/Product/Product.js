import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import PrimaryBtn from '../../Shared/PrimaryBtn/PrimaryBtn';
import './Product.css';

const Product = ({ product }) => {
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
          <p>Posted At: {date}/yr</p>
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
          <PrimaryBtn>Book Now</PrimaryBtn>
        </div>
      </div>
    </div>
  );
};

export default Product;
