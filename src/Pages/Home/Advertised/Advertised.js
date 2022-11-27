import React, { useState } from 'react';
import SectionHeading from '../../Shared/SectionHeading/SectionHeading';
import { useQuery } from '@tanstack/react-query';
import BookingModal from '../../Shared/BookingModal/Modal';
import Product from '../../Shared/Product/Product';
import Loader from '../../Shared/Loader/Loader';

const Advertised = () => {
  const [activeProduct, setActiveProduct] = useState(null);
  const { data: ads = [], isLoading } = useQuery({
    queryKey: ['ads'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_ROOT}/ads`);
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <>
      {ads.length > 0 && (
        <section className="mb-20 py-24 px-2">
          <div className="container mx-auto">
            <SectionHeading
              top={'OUR ADVERTISED PRODUCTS'}
              main={'Top Advertised Products'}></SectionHeading>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {ads.map((product) => (
                <Product
                  key={product._id}
                  product={product}
                  setActiveProduct={setActiveProduct}></Product>
              ))}
            </div>
            {activeProduct && (
              <BookingModal
                product={activeProduct}
                setActiveProduct={setActiveProduct}></BookingModal>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default Advertised;
