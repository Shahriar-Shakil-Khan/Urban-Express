
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';
import useTrackingLogger from '../../../hooks/useTrackingLogger';

const PendingDeliveries = () => {
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { logTracking } = useTrackingLogger();
    const { user } = useAuth();

   
    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["riderParcels"],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/parcels?email=${user.email}`);
            return res.data;
        },
    });

   
    const { mutateAsync: updateStatus } = useMutation({
        mutationFn: async ({ parcel, status }) => {
            const res = await axiosSecure.patch(`/parcels/${parcel._id}/status`, {
                status,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["riderParcels"]);
        },
    });

    const handleStatusUpdate = (parcel, newStatus) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Mark parcel as ${newStatus.replace("_", " ")}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, update",
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatus({ parcel, status: newStatus })
                    .then(async () => {
                        Swal.fire("Updated!", "Parcel status updated.", "success");

                        let trackDetails = `Picked up by ${user.displayName}`;
                        if (newStatus === 'Item has delivered') {
                            trackDetails = `Delivered by ${user.displayName}`;
                        }
                        await logTracking({
                            tracking_id: parcel.tracking_id,
                            status: newStatus,
                            details: trackDetails,
                            updated_by: user.email,
                        });

                    })
                    .catch(() => {
                        Swal.fire("Error!", "Failed to update status.", "error");
                    });
            }
        });
    };

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-4 text-center">Pending Deliveries</h2>
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[30vh]">
                    <span className="loading loading-bars loading-lg text-primary"></span>
                </div>
            ) : parcels.length === 0 ? (
                <p className="text-gray-400 text-center">No assigned deliveries.</p>
            ) : (
                <div className="overflow-x-auto">
                   
                    <div className="hidden lg:block">
                        <table className="table table-zebra w-full">
                            <thead className='bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white'>
                                <tr>
                                    <th>Tracking ID</th>
                                    <th>Title</th>
                                    <th>Receiver</th>
                                    <th>Receiver Center</th>
                                    <th>Cost</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {parcels.map((parcel) => (
                                    <tr key={parcel._id} className="bg-white text-black">
                                        <td>{parcel.tracking_id}</td>
                                        <td>{parcel.title}</td>
                                        <td>{parcel.receiver_name}</td>
                                        <td>{parcel.receiver_center}</td>
                                        <td>৳{parcel.cost}</td>
                                        <td className="capitalize">{parcel.delivery_status.replace("_", " ")}</td>
                                        <td>
                                            {parcel.delivery_status === "rider_assigned" && (
                                                <button
                                                    className="btn btn-sm btn-primary text-black"
                                                    onClick={() =>
                                                        handleStatusUpdate(parcel, "in_transit")
                                                    }
                                                >
                                                    Mark Picked Up
                                                </button>
                                            )}
                                            {parcel.delivery_status === "in_transit" && (
                                                <button
                                                    className="btn btn-sm btn-success text-black"
                                                    onClick={() =>
                                                        handleStatusUpdate(parcel, "delivered")
                                                    }
                                                >
                                                    Mark Delivered
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="lg:hidden space-y-4">
                        {parcels.map((parcel) => (
                            <div key={parcel._id} className="bg-white rounded-xl shadow p-4 text-black">
                                <div className="flex flex-col gap-2">
                                    <div>
                                        <span className="font-semibold text-gray-600">Tracking ID: </span>
                                        {parcel.tracking_id}
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-600">Title: </span>
                                        {parcel.title}
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-600">Receiver: </span>
                                        {parcel.receiver_name}
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-600">Receiver Center: </span>
                                        {parcel.receiver_center}
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-600">Cost: </span>
                                        ৳{parcel.cost}
                                    </div>
                                    <div>
                                        <span className="font-semibold text-gray-600">Status: </span>
                                        <span className="capitalize">{parcel.delivery_status.replace("_", " ")}</span>
                                    </div>
                                    <div className="mt-2">
                                        {parcel.delivery_status === "rider_assigned" && (
                                            <button
                                                className="btn btn-sm btn-primary text-black w-full"
                                                onClick={() =>
                                                    handleStatusUpdate(parcel, "in_transit")
                                                }
                                            >
                                                Mark Picked Up
                                            </button>
                                        )}
                                        {parcel.delivery_status === "in_transit" && (
                                            <button
                                                className="btn btn-sm btn-success text-black w-full"
                                                onClick={() =>
                                                    handleStatusUpdate(parcel, "delivered")
                                                }
                                            >
                                                Mark Delivered
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingDeliveries;