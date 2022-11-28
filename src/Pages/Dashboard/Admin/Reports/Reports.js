import { useQuery } from '@tanstack/react-query';
import React from 'react';
import swal from 'sweetalert';
import { cl } from '../../../../Helpers/Helpers';
import Loader from '../../../Shared/Loader/Loader';
import ReportRow from './ReportRow';

const Reports = () => {
  const {
    data: reports = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['reports'],
    queryFn: async () => {
      const res = await fetch(cl('/reports'), {
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

  const handleDelete = (product, report) => {
    swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(cl('/reports/'), {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('dream-accessToken')}`,
          },
          body: JSON.stringify({
            productId: product._id,
            reportId: report._id,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.productResult.deletedCount > 0 && data.reportResult.deletedCount > 0) {
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
      <h2 className="text-2xl font-semibold mb-5">All Reported Items ({reports.length})</h2>
      <div className="overflow-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="py-3 px-6">
                Picture
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Seller Email
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
            {reports.map((report) => (
              <ReportRow key={report._id} report={report} handleDelete={handleDelete}></ReportRow>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Reports;
