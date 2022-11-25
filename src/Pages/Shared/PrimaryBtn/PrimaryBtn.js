import React from 'react';

const PrimaryBtn = ({ children }) => {
  return (
    <button className="py-3 px-5 rounded-full bg-main text-white transition-all hover:bg-cgray hover:text-dark">
      {children}
    </button>
  );
};

export default PrimaryBtn;
