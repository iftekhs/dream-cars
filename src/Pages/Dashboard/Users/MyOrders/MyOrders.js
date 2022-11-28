import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { cl } from '../../../../Helpers/Helpers';
import Loader from '../../../Shared/Loader/Loader';
import SectionContent from '../../../Shared/SectionContent/SectionContent';
import OrderRow from './OrderRow';

const MyOrders = () => {
  const { user } = useContext(AuthContext);

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await fetch(cl(`/bookings/${user.email}`), {
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('dream-accessToken')}`,
        },
      });
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <section className="px-2 py-8">
      <SectionContent>
        <h2 className="text-2xl font-semibold mb-5">Your All Orders</h2>
        <div className="overflow-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Image
                </th>
                <th scope="col" className="py-3 px-6">
                  Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderRow key={order._id} order={order}></OrderRow>
              ))}
            </tbody>
          </table>
        </div>
      </SectionContent>
    </section>
  );
};

export default MyOrders;
