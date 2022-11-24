import React from 'react';

const SectionHeading = ({ topText, mainText }) => {
  return (
    <div className="mb-6">
      <p className="text-md font-semibold text-main">{topText}</p>
      <h2 className="mt-2 text-5xl font-bold">{mainText}</h2>
    </div>
  );
};

export default SectionHeading;
