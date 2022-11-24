import React from 'react';
import './banner.css';

const Banner = () => {
  return (
    <section className="px-2 bg-emerald-500">
      <div className="banner flex items-center justify-center">
        <div className="container mx-auto flex items-center justify-center">
          <div>
            <h1 className="text-5xl font-bold text-white">
              Buy your dream car with the cheapest price!
            </h1>
            <p className="mt-2 text-lg text-white">
              We resell exclusive cars with a very cheap price to help you get your dream car!
              Currently we are offering a 10% discount on every car for the black friday!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
