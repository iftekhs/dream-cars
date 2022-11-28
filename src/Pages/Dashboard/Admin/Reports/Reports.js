import { useQuery } from '@tanstack/react-query';
import React from 'react';
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
      const res = await fetch(cl('/reports'));
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <section className="py-4 px-2">
      <h2 className="text-2xl font-semibold mb-5">All Reported Products {reports.length}</h2>
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
            <ReportRow key={reports._id} report={report}></ReportRow>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Reports;
