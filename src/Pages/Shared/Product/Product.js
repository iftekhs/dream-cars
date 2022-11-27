import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheckCircle } from 'react-icons/fa';
import { cl } from '../../../Helpers/Helpers';
import './Product.css';

const Product = ({ product, setActiveProduct }) => {
  const [verified, setVerified] = useState(false);

  const { picture, name, location, resalePrice, originalPrice, yearOfUse, createdAt, sellerName } =
    product;

  useEffect(() => {
    fetch(cl(`/users/verified/${product.userEmail}`))
      .then((res) => res.json())
      .then((data) => setVerified(data.verified));
  }, [product]);

  const date = new Date(createdAt).toDateString();

  const handleBooking = () => {
    setActiveProduct(product);
  };

  const handleWishList = () => {
    fetch(cl('/wishlists'), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('dream-accessToken')}`,
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success('Successfully added to wishlist!');
        } else {
          toast.error('Something went very wrong!');
        }
      })
      .catch(console.error);
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
          <button
            onClick={handleWishList}
            className="px-3 py-2 rounded-full bg-emerald-500 text-white font-semibold text-sm">
            Add to wishlist
          </button>
        </div>
        <div className="mt-5">
          <button
            onClick={handleBooking}
            className="mt-auto py-3 px-5 rounded-full bg-main text-white transition-all hover:bg-cgray hover:text-dark">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
