import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { cl } from '../../../../Helpers/Helpers';
import Loader from '../../../Shared/Loader/Loader';
import swal from 'sweetalert';

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const {
    data: products = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['SellerProducts'],
    queryFn: async () => {
      const res = await fetch(cl(`/products/seller/${user.email}`));
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  const handleAdvertise = (product, advertise) => {
    fetch(cl(`/products/${product._id}`), {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('dream-accessToken')}`,
      },
      body: JSON.stringify({ advertise: advertise }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          refetch();
          if (advertise) {
            return toast.success('Successdully advertised.');
          }
          toast.success('Successdully unadvertised.');
        } else {
          toast.error('Something went very wrong!');
        }
      })
      .catch((error) => console.log(error));
  };

  const handleDelete = (product) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(cl(`/products/${product._id}`), {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('dream-accessToken')}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              swal('Successfully deleted the product!', {
                icon: 'success',
              });
            }
          })
          .catch((error) => console.log(error));
      }
    });
  };

  return (
    <section className="py-4 px-2">
      <h2 className="text-2xl font-semibold mb-5">Your All Products</h2>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Created At
                </th>
                <th scope="col" className="py-3 px-6">
                  Picture
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Status
                </th>
                <th scope="col" className="py-3 px-6">
                  Original Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Resale Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="bg-white border-b  hover:bg-gray-50 ">
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    {new Date(product.createdAt).toDateString()}
                  </td>
                  <td className="py-2">
                    <img className="h-24 rounded-lg" src={product.picture} alt={product.name} />
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="py-4 px-6">
                    <div
                      className={`bg-main text-white py-2 px-4 rounded-full inline ${
                        product.status === 'unsold' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}>
                      {product.status}
                    </div>
                  </td>

                  <td className="py-4 px-6">{product.originalPrice}</td>
                  <td className="py-4 px-6">{product.resalePrice}</td>
                  <td className="py-4 px-6 text-right flex flex-col gap-2">
                    {product.status === 'unsold' && !product.advertise && (
                      <button
                        onClick={() => handleAdvertise(product, true)}
                        className="py-2 w-28 px-3 rounded-full bg-main text-white">
                        Advertise
                      </button>
                    )}
                    {product.advertise && product.status === 'unsold' && (
                      <button
                        onClick={() => handleAdvertise(product, false)}
                        className="py-2 w-28 px-3 rounded-full bg-main text-white">
                        Unadvertise
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(product)}
                      className="py-2 w-28 px-3 rounded-full bg-rose-500 text-white">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyProducts;
