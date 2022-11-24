import React from 'react';

const SectionHeading = ({ top, main }) => {
  return (
    <div className="mb-6">
      <p className="text-md font-semibold text-main uppercase">{top}</p>
      <h2 className="mt-2 text-5xl font-bold">{main}</h2>
    </div>
  );
};

export default SectionHeading;
