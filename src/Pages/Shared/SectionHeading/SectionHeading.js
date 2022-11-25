import React from 'react';

const SectionHeading = ({ top, main }) => {
  return (
    <div className="mb-6">
      <p className="md:text-md md:text-left text-center font-semibold text-main uppercase">{top}</p>
      <h2 className="mt-2 md:text-5xl md:text-left text-center text-3xl font-bold">{main}</h2>
    </div>
  );
};

export default SectionHeading;
