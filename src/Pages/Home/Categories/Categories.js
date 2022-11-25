import React from 'react';
import SectionHeading from '../../Shared/SectionHeading/SectionHeading';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import Loader from '../../Shared/Loader/Loader';

const Categories = () => {
  const { data: categories, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_API_ROOT}/categories`);
      const data = await res.json();
      return data;
    },
  });

  return (
    <section className="mb-20 py-24 px-2">
      <div className="container mx-auto">
        <SectionHeading top={'ALL CAR CATEGORIES'} main={'Our All Car Categories'}></SectionHeading>
        {isLoading ? (
          <Loader></Loader>
        ) : (
          <div className="flex flex-wrap items-center md:justify-start justify-center gap-4">
            {categories.map((category) => (
              <Link
                key={category._id}
                to={`/category/${category._id}`}
                className="py-3 px-5 rounded-full bg-main text-white transition-all hover:bg-cgray hover:text-dark">
                {category.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Categories;
