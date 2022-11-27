import React from 'react';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loader from '../../Shared/Loader/Loader';
import SectionHeading from '../../Shared/SectionHeading/SectionHeading';

const Payment = () => {
  const { data: booking } = useLoaderData();

  const navigation = useNavigation();

  if (navigation.state === 'loading') {
    return <Loader></Loader>;
  }

  console.log(booking);

  return (
    <section className="py-4 px-2">
      <h2 className="text-2xl font-semibold mb-5">Pay Using Stripe</h2>
      <SectionHeading></SectionHeading>
    </section>
  );
};

export default Payment;
