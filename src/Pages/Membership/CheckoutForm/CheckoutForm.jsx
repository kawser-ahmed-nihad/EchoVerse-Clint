import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet!");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      setError("Card element not found!");
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Create PaymentIntent from backend
      const res = await axiosSecure.post('/api/create-payment-intent', { amount });
      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        Swal.fire("Payment Successful", `Transaction ID: ${result.paymentIntent.id}`, "success");

        const paymentInfo = {
          email: user.email,
          amount,
          transactionId: result.paymentIntent.id,
          date: new Date(),
          status: 'succeeded',
        };

        await axiosSecure.post('/api/payments', paymentInfo);
        await axiosSecure.patch(`/api/users/status/${user.email}`, { status: 'gold' });

        Swal.fire("Success!", "Membership upgraded to Gold 🎉", "success");
        queryClient.invalidateQueries(['user']);
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-md mx-auto bg-white p-4 shadow-md rounded"
    >
      <CardElement className="p-2 border rounded" />

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className={`bg-[#cc5429] text-white px-4 py-2 rounded hover:bg-[#e35b2c] w-full ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Processing...' : `Pay $${amount / 100}`}
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  );
};

export default CheckoutForm;
