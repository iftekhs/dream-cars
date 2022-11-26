import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

import './Modal.css';
import { cl } from '../../../Helpers/Helpers';

const Modal = ({ product, setActiveProduct }) => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const number = form.number.value;
    const location = form.location.value;

    const booking = {
      productId: product._id,
      productName: product.name,
      address: product.location,
      price: product.resalePrice,
      number,
      location,
    };

    fetch(cl('/bookings'), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('dream-accessToken')}`,
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          setActiveProduct(null);
          toast.success('Booking confirmed');
        } else {
          toast.error(data.message);
        }
      });
  };

  return (
    <>
      <div className="modal bg-white rounded-lg z-10 p-5">
        <h2 className="text-2xl font-semibold">Book the car</h2>

        <form onSubmit={handleSubmit} className="mt-3">
          <div className="mb-6">
            <label htmlFor="userName" className="block mb-2 text-sm font-medium text-gray-900 ">
              Name
            </label>
            <input
              name="userName"
              type="text"
              id="userName"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              readOnly
              defaultValue={user.displayName}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">
              Email
            </label>
            <input
              name="email"
              type="text"
              id="email"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              readOnly
              defaultValue={user.email}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="productName" className="block mb-2 text-sm font-medium text-gray-900 ">
              Product
            </label>
            <input
              name="productName"
              type="text"
              id="productName"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              readOnly
              defaultValue={product.name}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 ">
              Address
            </label>
            <input
              name="address"
              type="text"
              id="address"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              readOnly
              defaultValue={product.location}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">
              Price
            </label>
            <input
              name="price"
              type="text"
              id="price"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
              readOnly
              defaultValue={'$' + product.resalePrice / 1000 + 'k'}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900 ">
              Your Phone Number
            </label>
            <input
              name="number"
              type="number"
              id="number"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 ">
              Your Location
            </label>
            <input
              name="location"
              type="text"
              id="location"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full p-2.5"
            />
          </div>
          <button className="py-3 px-5 rounded-full bg-main text-white transition-all hover:bg-clp hover:text-dark">
            Book now
          </button>
        </form>
      </div>
      <div onClick={() => setActiveProduct(null)} className="overlay"></div>
    </>
  );
};

export default Modal;
