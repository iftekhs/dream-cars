import React, { useState } from 'react';
import SectionHeading from '../../Shared/SectionHeading/SectionHeading';
import { useQuery } from '@tanstack/react-query';
import BookingModal from '../../Shared/BookingModal/BookingModal';
import Product from '../../Shared/Product/Product';
import Loader from '../../Shared/Loader/Loader';
import { cl } from '../../../Helpers/Helpers';

const Advertised = () => {
  const [activeProduct, setActiveProduct] = useState(null);
  const { data: proucts = [], isLoading } = useQuery({
    queryKey: ['advertisedProucts'],
    queryFn: async () => {
      const res = await fetch(cl('/products/advertised'));
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return <Loader></Loader>;
  }

  return (
    <>
      {proucts.length > 0 && (
        <section className="mb-20 py-24 px-2">
          <div className="container mx-auto">
            <SectionHeading
              top={'OUR ADVERTISED PRODUCTS'}
              main={'Top Advertised Products'}></SectionHeading>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {proucts.map((product) => (
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
