import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import { MdCheckCircle } from 'react-icons/md';
import { useLoaderData, useNavigation } from 'react-router-dom';
import Loader from '../../Shared/Loader/Loader';
import SectionContent from '../../Shared/SectionContent/SectionContent';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
  const { data: booking } = useLoaderData();
  const navigation = useNavigation();

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

  if (navigation.state === 'loading') {
    return <Loader></Loader>;
  }

  return (
    <section className="py-4 px-2">
      <h2 className="text-2xl font-semibold mb-5">Pay Using Stripe</h2>
      <SectionContent>
        <div className="mt-5 px-6 py-3 rounded">
          {booking.status === 'paid' ? (
            <div className="flex items-center justify-center h-3/4">
              <h2 className="text-4xl font-semibold flex gap-2">
                <MdCheckCircle className="text-emerald-500"></MdCheckCircle>
                You have already paid for this order!
              </h2>
            </div>
          ) : (
            <Elements stripe={stripePromise}>
              <CheckoutForm booking={booking} />
            </Elements>
          )}
        </div>
      </SectionContent>
    </section>
  );
};

export default Payment;
