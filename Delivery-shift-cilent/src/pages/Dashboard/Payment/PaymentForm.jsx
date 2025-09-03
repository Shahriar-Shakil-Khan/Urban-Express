import React, { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router';
import useTrackingLogger from '../../../hooks/useTrackingLogger';
import Swal from 'sweetalert2';

const PaymentForm = () => {
    const [error, setError] = useState('');
    const [paymentDone, setPaymentDone] = useState(false); // Track payment status
    const elements = useElements();
    const stripe = useStripe();
    const { user } = useAuth();
    const { parcelId } = useParams();
    const axiosSecure = useAxiosSecure();
    const { logTracking } = useTrackingLogger();
    const navigate = useNavigate();

    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        }
    });

    if (isPending) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <span className="loading loading-bars loading-xl"></span>
            </div>
        );
    }

    const amount = parcelInfo.cost;
    const amountInCents = amount * 100;

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;
        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
            const res = await axiosSecure.post('/create-payment-intent', {
                amountInCents,
                parcelId
            });
            const clientSecret = res.data.clientSecret;
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user.displayName,
                        email: user.email
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                setError('');
                if (result.paymentIntent.status === 'succeeded') {
                    const transactionId = result.paymentIntent.id;
                    const paymentData = {
                        parcelId,
                        email: user.email,
                        amount,
                        transactionId: transactionId,
                        paymentMethod: result.paymentIntent.payment_method_types
                    };
                    const paymentRes = await axiosSecure.post('/payments', paymentData);
                    if (paymentRes.data.insertedId) {
                        setPaymentDone(true); // Disable button after payment
                        await Swal.fire({
                            icon: 'success',
                            title: 'Congratulations!Payment Successful!',
                            html: `<strong>Transaction ID:</strong> <code>${transactionId}</code>`,
                            confirmButtonText: 'Go to My Parcels',
                        });
                        await logTracking({
                            tracking_id: parcelInfo.tracking_id,
                            status: "payment has been done",
                            details: `Paid by ${user.displayName}`,
                            updated_by: user.email,
                        });
                        navigate('/dashboard/myParcels');
                    }
                }
            }
        }
    };

    return (
        <div className='p-8'>
            <h1 className='text-3xl font-bold text-amber-50 text-center mt-5 mb-10'>Payment</h1>
            <form onSubmit={handleSubmit} className="text-amber-50 space-y-4 bg-white p-4 rounded-xl w-full mx-auto">
                <CardElement className="p-12 border rounded" />
                <button
                    type='submit'
                    className="btn btn-primary text-black w-full p-8"
                    disabled={!stripe || paymentDone} // Disable after payment
                >
                    <span className='font-bold text-white text-xl'>Pay ৳{amount}</span>
                </button>
                {error && <p className='text-red-500'>{error}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;