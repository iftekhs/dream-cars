import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import swal from 'sweetalert';
import { cl } from '../../../../Helpers/Helpers';
import Loader from '../../../Shared/Loader/Loader';
import SectionContent from '../../../Shared/SectionContent/SectionContent';

const AllSellers = () => {
  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['sellers'],
    queryFn: async () => {
      const res = await fetch(cl('/users/all/sellers'));
      const data = await res.json();
      return data;
    },
  });

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

  const handleVerify = (user, status) => {
    fetch(cl(`/users/sellers/${user.email}`), {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('dream-accessToken')}`,
      },
      body: JSON.stringify({ verified: status }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount > 0) {
          refetch();
          if (status) {
            return toast.success('Successdully verified.');
          }
          toast.success('Successdully unverified.');
        } else {
          toast.error('Something went very wrong!');
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <section className="py-4 px-2">
      <h2 className="text-2xl font-semibold mb-5">All Sellers</h2>
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

              <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap flex flex-col gap-2">
                {!user.verified ? (
                  <button
                    onClick={() => handleVerify(user, true)}
                    className="py-2 w-28 px-3 rounded-full bg-main text-white">
                    Verify
                  </button>
                ) : (
                  <button
                    onClick={() => handleVerify(user, false)}
                    className="py-2 w-28 px-3 rounded-full bg-main text-white">
                    Unverify
                  </button>
                )}
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

export default AllSellers;
