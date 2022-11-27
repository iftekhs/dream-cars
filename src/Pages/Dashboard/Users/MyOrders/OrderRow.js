import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cl } from '../../../../Helpers/Helpers';
import Loader from '../../../Shared/Loader/Loader';

const OrderRow = ({ order }) => {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(cl(`/products/find/${order.productId}`))
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [order]);

  if (!product) {
    return <Loader></Loader>;
  }

  return (
    <tr className="bg-white border-b  hover:bg-gray-50 ">
      <td className="py-2">
        <img className="h-24 rounded-lg" src={product.picture} alt={product.name} />
      </td>
      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{product.name}</td>
      <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
        ${product.originalPrice}
      </td>
      <td className="py-4 px-6">
        <div
          className={`bg-main text-white py-2 px-4 rounded-full inline ${
            order.status === 'paid' ? 'bg-emerald-500' : 'bg-rose-500'
          }`}>
          {order.status}
        </div>
      </td>

      <td className="py-4 px-6">
        <Link
          to={`/dashboard/payment/${order._id}`}
          className="py-2 w-28 px-3 rounded-full bg-main text-white">
          Pay
        </Link>
      </td>
    </tr>
  );
};

export default OrderRow;
