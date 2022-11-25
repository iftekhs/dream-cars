import React from 'react';
import SectionHeading from '../../Shared/SectionHeading/SectionHeading';
import { useQuery } from '@tanstack/react-query';

const Advertised = () => {
  const { data: ads = [] } = useQuery({
    queryKey: ['ads'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_ROOT}/ads`);
      const data = await res.json();
      return data;
    },
  });

  return (
    <>
      {ads.length && (
        <section className="mb-20 py-24 px-2">
          <div className="container mx-auto">
            <SectionHeading
              top={'OUR ADVERTISED PRODUCTS'}
              main={'Top Advertised Products'}></SectionHeading>
          </div>
        </section>
      )}
    </>
  );
};

export default Advertised;
