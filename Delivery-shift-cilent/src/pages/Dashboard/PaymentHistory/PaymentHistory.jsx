import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const formatDate = (iso) => new Date(iso).toLocaleString();

const PaymentHistory = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const { isPending, data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments?email=${user.email}`);
            return res.data;
        }
    });

    if (isPending) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
            <span className="loading loading-bars loading-xl text-black"></span>
        </div>
    );
}
    return (
        <div className="w-full">
           
            <div className="hidden sm:block overflow-x-auto rounded-xl shadow-lg p-2 ">
                <table className="min-w-[500px] w-full text-xs sm:text-sm md:text-base">
                    <thead>
                        <tr className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">
                            <td className="py-2 px-1 sm:py-3 sm:px-2 font-bold">#</td>
                            <td className="py-2 px-1 sm:py-3 sm:px-2 font-bold">Parcel ID</td>
                            <td className="py-2 px-1 sm:py-3 sm:px-2 font-bold">Amount</td>
                            <td className="py-2 px-1 sm:py-3 sm:px-2 font-bold">Transaction</td>
                            <td className="py-2 px-1 sm:py-3 sm:px-2 font-bold">Paid At</td>
                        </tr>
                    </thead>
                    <tbody>
                        {payments?.length > 0 ? (
                            payments.map((p, index) => (
                                <tr
                                    key={p.transactionId}
                                    className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
                                >
                                    <td className="py-1 px-1 sm:py-2 sm:px-2 font-semibold text-blue-600">{index + 1}</td>
                                    <td className="py-1 px-1 sm:py-2 sm:px-2 truncate max-w-[80px] sm:max-w-[120px] md:max-w-xs" title={p.parcelId}>
                                        <span className="bg-purple-100 rounded px-1 py-0.5 sm:px-2 sm:py-1 text-purple-700">{p.parcelId}...</span>
                                    </td>
                                    <td className="py-1 px-1 sm:py-2 sm:px-2 font-bold text-pink-600">৳{p.amount}</td>
                                    <td className="py-1 px-1 sm:py-2 sm:px-2 font-mono text-[10px] sm:text-xs md:text-sm">
                                        <span className="bg-blue-100 rounded px-1 py-0.5 sm:px-2 sm:py-1 text-blue-700" title={p.transactionId}>
                                            {p.transactionId}...
                                        </span>
                                    </td>
                                    <td className="py-1 px-1 sm:py-2 sm:px-2 text-gray-700 whitespace-nowrap">{formatDate(p.paid_at_string)}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-6">
                                    No payment history found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Card layout for xs devices */}
            <div className="sm:hidden space-y-4">
                {payments?.length > 0 ? (
                    payments.map((p, index) => (
                        <div key={p.transactionId} className="rounded-xl shadow-md bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-4">
                            <div className="font-bold text-blue-600 mb-2">#{index + 1}</div>
                            <div className="mb-1">
                                <span className="text-xs font-semibold text-gray-600">Parcel ID: </span>
                                <span className="bg-purple-100 rounded px-2 py-1 text-purple-700 text-xs">{p.parcelId}...</span>
                            </div>
                            <div className="mb-1">
                                <span className="text-xs font-semibold text-gray-600">Amount: </span>
                                <span className="font-bold text-pink-600">৳{p.amount}</span>
                            </div>
                            <div className="mb-1">
                                <span className="text-xs font-semibold text-gray-600">Transaction: </span>
                                <span className="bg-blue-100 rounded px-2 py-1 text-blue-700 font-mono text-xs" title={p.transactionId}>
                                    {p.transactionId}...
                                </span>
                            </div>
                            <div>
                                <span className="text-xs font-semibold text-gray-600">Paid At: </span>
                                <span className="text-gray-700 text-xs">{formatDate(p.paid_at_string)}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-gray-500 py-6 bg-white rounded-xl shadow">
                        No payment history found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default PaymentHistory;