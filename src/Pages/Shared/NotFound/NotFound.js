import React from 'react';
import { useNavigate } from 'react-router-dom';
import NotFoundImage from '../../../images/404.svg';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className="px-2 bg-clp">
      <div className="mh-100 flex flex-col items-center justify-center gap-4">
        <img className="h-52" src={NotFoundImage} alt="" />
        <h2 className="text-3xl font-bold">Oop's looks like your lost!</h2>
        <button
          onClick={() => navigate(-1)}
          className="py-3 px-5 rounded-full bg-main text-white"
          to="/">
          Go Back
        </button>
      </div>
    </section>
  );
};

export default NotFound;
