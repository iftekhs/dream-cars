import { useQuery } from '@tanstack/react-query';
import React from 'react';
import swal from 'sweetalert';
import { cl } from '../../../../Helpers/Helpers';
import Loader from '../../../Shared/Loader/Loader';

const AllBuyers = () => {
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['buyers'],
    queryFn: async () => {
      const res = await fetch(cl('/users/all/buyers'));
      const data = await res.json();
      return data;
    },
  });

  console.log(users);

  if (isLoading) {
    return <Loader></Loader>;
  }

  const handleDelete = (user) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(cl(`/users/${user._id}`), {
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
              swal('Successfully deleted the user!', {
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
      <h2 className="text-2xl font-semibold mb-5">All Buyers</h2>

      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="py-3 px-6">
              Name
            </th>
            <th scope="col" className="py-3 px-6">
              Email
            </th>
            <th scope="col" className="py-3 px-6">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="bg-white border-b  hover:bg-gray-50 ">
              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>

              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                {user.email}
              </td>

              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">{user.name}</td>

              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                <button
                  onClick={() => handleDelete(user)}
                  className="py-2 w-28 px-3 rounded-full bg-rose-500 text-white">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default AllBuyers;
