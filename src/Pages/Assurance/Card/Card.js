import React from 'react';
import './Card.css';

const Card = ({ heading, text, icon }) => {
  return (
    <div className="card flex flex-col py-3 px-5 rounded-lg">
      <div className="flex items-center justify-center h-10 w-10 rounded-full text-white bg-main text-xl">
        {icon}
      </div>
      <h2 className="mt-3 md:text-2xl text-xl font-semibold">{heading}</h2>
      <p className="lh-18">{text}</p>
    </div>
  );
};

export default Card;
