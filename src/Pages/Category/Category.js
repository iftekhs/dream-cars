import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { cl } from '../../Helpers/Helpers';
import Loader from '../Shared/Loader/Loader';
import SectionHeading from '../Shared/SectionHeading/SectionHeading';

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

  console.log(products);

  return (
    <section className="py-8 px-2">
      <div className="container mx-auto">
        <SectionHeading
          top={`ALL ${currentCategory.name} PRODUCTS`}
          main={currentCategory.name}></SectionHeading>
      </div>
    </section>
  );
};

export default Category;
