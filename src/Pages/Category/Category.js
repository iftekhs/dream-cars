import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { cl } from '../../Helpers/Helpers';
import Loader from '../Shared/Loader/Loader';
import SectionHeading from '../Shared/SectionHeading/SectionHeading';
import Product from './Product/Product';

const Category = () => {
  const { data: currentCategory } = useLoaderData();
  const navigation = useNavigation();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(cl(`/products/${currentCategory._id}`));
      const data = await res.json();
      return data;
    },
  });

  if (navigation.state === 'loading' || isLoading) {
    return <Loader></Loader>;
  }

  return (
    <section className="py-8 px-2">
      <div className="container mx-auto">
        <SectionHeading
          top={`ALL ${currentCategory.name} PRODUCTS`}
          main={currentCategory.name}></SectionHeading>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;
