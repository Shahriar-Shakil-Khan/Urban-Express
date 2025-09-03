import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
    FaMotorcycle,
    FaCheckCircle,
    FaShippingFast,
    FaBoxOpen,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const statusIcons = {
    rider_assigned: <FaMotorcycle className="text-4xl text-info" />,
    delivered: <FaCheckCircle className="text-4xl text-success" />,
    in_transit: <FaShippingFast className="text-4xl text-warning" />,
    not_collected: <FaBoxOpen className="text-4xl text-error" />,
};

const statusLabels = {
    rider_assigned: "Assigned to Rider",
    delivered: "Delivered",
    in_transit: "In Transit",
    not_collected: "Not Collected",
};

export default function RiderDashboard() {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const riderEmail = user?.email;

    const { data: deliveryStatus = [], isLoading, isError, error } = useQuery({
        queryKey: ["riderParcelStatusCount", riderEmail],
        queryFn: async () => {
            if (!riderEmail) return [];
            const res = await axiosSecure.get(`/rider/status-count?email=${riderEmail}`);
            return res.data;
        },
        enabled: !!riderEmail,
        staleTime: 5 * 60 * 1000,
        retry: 1,
    });

    if (isLoading)
        return (
            <div className="flex justify-center items-center min-h-[70vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );

    if (isError)
        return (
            <div className="text-center text-red-600 mt-10">
                Error loading data: {error.message}
            </div>
        );

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6 text-center">My Delivery Status</h1>
            <div className="overflow-x-auto">
                <div >
                    {deliveryStatus.map(({ count, status }) => (
                        <div
                            key={status}
                            className="card bg-white text-black  border border-base-200 flex flex-col items-center justify-center p-6 min-w-[180px]"
                        >
                            {statusIcons[status] || <FaBoxOpen className="text-4xl" />}
                            <h2 className="text-lg font-semibold mt-3 text-center">
                                {statusLabels[status] || status}
                            </h2>
                            <p className="text-4xl font-extrabold text-primary mt-2">{count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}