import React from 'react';
import Assurance from '../Assurance/Assurance';
import Advertised from './Advertised/Advertised';
import Banner from './Banner/Banner';
import Categories from './Categories/Categories';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Categories></Categories>
      <Assurance></Assurance>
      <Advertised></Advertised>
    </div>
  );
};

export default Home;
