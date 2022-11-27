import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { cl } from '../../../../Helpers/Helpers';
import Loader from '../../../Shared/Loader/Loader';

const MyProducts = () => {
  const { user } = useContext(AuthContext);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(cl(`/products/seller/${user.email}`));
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <section className="py-4 px-2">
      <h2 className="text-2xl font-semibold mb-5">Your All Products</h2>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="py-3 px-6">
                  Product name
                </th>
                <th scope="col" class="py-3 px-6">
                  Color
                </th>
                <th scope="col" class="py-3 px-6">
                  Category
                </th>
                <th scope="col" class="py-3 px-6">
                  Price
                </th>
                <th scope="col" class="py-3 px-6">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Apple MacBook Pro 17"
                </th>
                <td class="py-4 px-6">Sliver</td>
                <td class="py-4 px-6">Laptop</td>
                <td class="py-4 px-6">$2999</td>
                <td class="py-4 px-6 text-right"></td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Microsoft Surface Pro
                </th>
                <td class="py-4 px-6">White</td>
                <td class="py-4 px-6">Laptop PC</td>
                <td class="py-4 px-6">$1999</td>
                <td class="py-4 px-6 text-right"></td>
              </tr>
              <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Magic Mouse 2
                </th>
                <td class="py-4 px-6">Black</td>
                <td class="py-4 px-6">Accessories</td>
                <td class="py-4 px-6">$99</td>
                <td class="py-4 px-6 text-right"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default MyProducts;
