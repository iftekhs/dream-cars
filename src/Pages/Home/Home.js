import React from 'react';
import Assurance from '../Assurance/Assurance';
import Advertised from './Advertised/Advertised';
import Banner from './Banner/Banner';
import Categories from './Categories/Categories';

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Assurance></Assurance>
      <Categories></Categories>
      <Advertised></Advertised>
    </div>
  );
};

export default Home;
