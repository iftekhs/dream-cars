import React from 'react';
import Advertised from './Advertised/Advertised';
import Banner from './Banner/Banner';
import Categories from './Categories/Categories';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Advertised></Advertised>
      <Categories></Categories>
    </div>
  );
};

export default Home;
