import React from 'react';
import bannerImage from '../../../images/banner.svg';
import './banner.css';

const Banner = () => {
  return (
    <section className="px-2 bg-clp">
      <div className="banner md:text-left text-center lg:py-52 py-32 flex items-center justify-center">
        <div className="container mx-auto flex lg:flex-row flex-col items-center justify-center lg:gap-4 gap-20">
          <div className="px-16">
            <h2 className="text-lg text-main font-semibold uppercase">TOP RESALE CARS STORE</h2>
            <h1 className="mt-6 md:text-5xl text-3xl font-bold">
              Buy your dream car with the cheapest price!
            </h1>
            <p className="mt-6 md:text-lg ">
              We resell exclusive cars with a very cheap price to help you get your dream car!
              Currently we are offering a 10% discount on every car for the black friday!
            </p>
            <div className="mt-8">
              <button className="py-3 px-5 rounded-full bg-main text-white transition-all hover:bg-white hover:text-dark">
                Get Started
              </button>
            </div>
          </div>
          <div>
            <img src={bannerImage} alt="1 guy standing next to car 1 guy inside the car" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
