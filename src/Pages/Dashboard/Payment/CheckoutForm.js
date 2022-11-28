import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { cl, getPrice } from '../../../Helpers/Helpers';

const CheckoutForm = ({ booking }) => {
  const [cardError, setCardError] = useState('');
  const [success, setSuccess] = useState('');
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState('');
  const [clientSecret, setClientSecret] = useState('');

  const stripe = useStripe();
  const elements = useElements();
  const { price, email, patient, _id } = booking;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(cl('/create-payment-intent'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `bearer ${localStorage.getItem('dream-accessToken')}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      console.log(error);
      setCardError(error.message);
    } else {
      setCardError('');
    }

    setSuccess('');
    setProcessing(true);

    const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: patient,
          email: email,
        },
      },
    });

    if (confirmError) {
      setCardError(confirmError.message);
      return;
    }
    if (paymentIntent.status === 'succeeded') {
      // store payment info in the database
      const payment = {
        price,
        transactionId: paymentIntent.id,
        email,
        bookingId: _id,
        productId: booking.productId,
      };
      fetch(cl('/payments'), {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `bearer ${localStorage.getItem('dream-accessToken')}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            setSuccess('Congrats! your payment completed');
            toast.success('Your payment was successfull!');
            setTransactionId(paymentIntent.id);
          }
        })
        .catch(() => {
          toast.error('Something went very wrong!');
        });
    } else {
      toast.error('Something went very wrong!');
    }
    setProcessing(false);
  };

  return (
    <>
      <p className="text-3xl font-semibold mb-2">{booking.productName}</p>
      <p className="mb-5 font-semibold">Price: ${getPrice(booking.price)}</p>
      <form onSubmit={handleSubmit} className="border rounded-lg p-5">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#424770',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
              invalid: {
                color: '#f43f5e',
              },
            },
          }}
        />
        <button
          className="mt-5 py-3 px-5 rounded-full bg-main text-white transition-all hover:bg-cgray hover:text-dark"
          type="submit"
          disabled={!stripe || !clientSecret || processing || success}>
          {success ? 'Paid' : 'Pay Now'}
        </button>
      </form>
      <p className="mt-2 text-rose-500">{cardError}</p>
      {success && (
        <div>
          <p>
            Your transactionId: <span className="font-bold text-emerald-500">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
