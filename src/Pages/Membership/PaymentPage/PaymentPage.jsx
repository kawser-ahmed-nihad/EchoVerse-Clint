import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../CheckoutForm/CheckoutForm';
import { Helmet } from 'react-helmet';

const stripePromise = loadStripe(import.meta.env.VITE_payment_Key);

const PaymentPage = () => {
    const amount = 1000;

    return (
        <>
            <Helmet>
                <title>EchoVerse || Join Our Creative Community</title>
            </Helmet>
            <div className="max-w-xl h-screen mx-auto">
                <h2 className="text-2xl font-bold pt-20 text-center mb-4">Become a Member</h2>
                <p className="mb-4 text-center mt-12">Pay $10 to become a premium member.</p>

                <Elements stripe={stripePromise}>
                    <CheckoutForm amount={amount} />
                </Elements>
            </div>
        </>
    );
};

export default PaymentPage;
