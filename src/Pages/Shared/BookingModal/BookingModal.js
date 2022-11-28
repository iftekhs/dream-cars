import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { toast } from 'react-hot-toast';
import { cl, getPrice } from '../../../Helpers/Helpers';
import './BookingModal.css';
import { FaTimes } from 'react-icons/fa';

const BookingModal = ({ product, setActiveProduct }) => {
  const { user } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;
    const number = form.number.value;
    const location = form.location.value;

    const booking = {
      productId: product._id,
      productName: product.name,
      number,
      location,
      price: product.resalePrice,
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
      <div className="booking-modal rounded-lg p-5">
        <form onSubmit={handleSubmit} className="mt-3 bg-white p-5 rounded-lg">
          <div className="flex items-center text-white justify-end">
            <button
              onClick={() => setActiveProduct(null)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-main p-3">
              <FaTimes></FaTimes>
            </button>
          </div>
          <h2 className="text-2xl font-semibold">Book the car</h2>
          <div className="mb-6">
            <label htmlFor="userName" className="block md:mb-2 text-sm font-medium text-gray-900 ">
              Name
            </label>
            <input
              name="userName"
              type="text"
              id="userName"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full md:p-2.5 p-1 px-2"
              readOnly
              defaultValue={user.displayName}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block md:mb-2 text-sm font-medium text-gray-900 ">
              Email
            </label>
            <input
              name="email"
              type="text"
              id="email"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full md:p-2.5 p-1 px-2"
              readOnly
              defaultValue={user.email}
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="productName"
              className="block md:mb-2 text-sm font-medium text-gray-900 ">
              Product
            </label>
            <input
              name="productName"
              type="text"
              id="productName"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full md:p-2.5 p-1 px-2"
              readOnly
              defaultValue={product.name}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="price" className="block md:mb-2 text-sm font-medium text-gray-900 ">
              Price
            </label>
            <input
              name="price"
              type="text"
              id="price"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full md:p-2.5 p-1 px-2"
              readOnly
              defaultValue={'$' + getPrice(product.resalePrice)}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="number" className="block md:mb-2 text-sm font-medium text-gray-900 ">
              Your Phone Number
            </label>
            <input
              name="number"
              type="number"
              id="number"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full md:p-2.5 p-1 px-2"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="location" className="block md:mb-2 text-sm font-medium text-gray-900 ">
              Meeting Location
            </label>
            <input
              name="location"
              type="text"
              id="location"
              className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-main focus:border-main block w-full md:p-2.5 p-1 px-2"
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

export default BookingModal;
