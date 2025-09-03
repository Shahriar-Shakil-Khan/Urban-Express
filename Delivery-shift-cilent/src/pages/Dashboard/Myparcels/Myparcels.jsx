import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyParcels = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null);


    const { data: parcels = [], refetch } = useQuery({

        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    });

    const handleView = (parcel) => {

        setSelectedParcel(parcel);
        document.getElementById("parcelDetailsModal").showModal();

    };

    const handlePay = (id) => {

        window.location.href = `/dashboard/payment/${id}`;
    };

    const handleDelete = async (id) => {

        const confirm = await Swal.fire({

            title: "Are you sure?",
            text: "This parcel will be permanently deleted!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete",
            cancelButtonText: "Cancel",
            confirmButtonColor: "#e11d48",
            cancelButtonColor: "#6b7280",
        });
        if (confirm.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/parcels/${id}`);
                if (res.data.deletedCount) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Parcel has been deleted.",
                        icon: "success",
                        timer: 2000,
                        showConfirmButton: false,
                    });
                }
                refetch();
            } catch (err) {
                Swal.fire("Error", err.message || "Failed to delete parcel", "error");
            }
        }
    };

    const formatDate = (iso) => {

        return new Date(iso).toLocaleString();
    };

    return (

        <div className="overflow-x-auto shadow-md rounded-xl  p-4">

            <div className="w-full">

                <table className="table w-full lg:table-zebra">
                   
                    <thead className="hidden lg:table-header-group bg-gradient-to-b from-[#5524B7] to-[#380B60] text-base font-semibold">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Created At</th>
                            <th>Cost</th>
                            <th>Payment</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody >
                        {parcels.map((parcel, index) => (

                            <tr key={parcel._id} className="block lg:table-row mb-4 lg:mb-0 border lg:border-0 rounded-lg lg:rounded-none shadow lg:shadow-none bg-white lg:bg-transparent">
                                <td className="block lg:table-cell bg-white text-black font-bold py-4 px-2">
                                    <span className="lg:hidden font-bold"># </span>
                                    {index + 1}
                                </td>

                                <td className="block lg:table-cell bg-white text-black max-w-[180px] truncate py-4 px-2">
                                    <span className="lg:hidden font-bold">Title: </span>
                                    {parcel.title}
                                </td>

                                <td className="block lg:table-cell bg-white text-black capitalize py-4 px-2">
                                    <span className="lg:hidden font-bold">Type: </span>
                                    {parcel.kind}
                                </td>

                                <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                    <span className="lg:hidden font-bold">Created At: </span>
                                    {formatDate(parcel.creation_date)}
                                </td>

                                <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                    <span className="lg:hidden font-bold">Cost: </span>
                                    ৳{parcel.cost}
                                </td>

                                <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                    <span className="lg:hidden font-bold">Payment: </span>

                                    <span
                                        className={`badge ${parcel.payment_status === "paid"
                                            ? "badge-success"
                                            : "badge-error"
                                            }`}
                                    >
                                        {parcel.payment_status}
                                    </span>
                                </td>

                                <td className="block lg:table-cell bg-white text-black space-x-2 py-4 px-2">
                                    <span className="lg:hidden font-bold">Actions: </span>
                                    <button
                                        onClick={() => handleView(parcel)}
                                        className="btn btn-xs btn-outline"
                                    >
                                        View
                                    </button>
                                    {parcel.payment_status === "unpaid" && (
                                        <button
                                            onClick={() => handlePay(parcel._id)}
                                            className="btn btn-xs btn-primary text-white"
                                        >
                                            Pay
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(parcel._id)}
                                        className="btn btn-xs btn-error text-white"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {parcels.length === 0 && (
                            <tr>
                                <td colSpan="7" className="text-center py-6 bg-white text-black font-bold">
                                    Sorry! No parcels found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* DaisyUI Modal for Parcel Details */}
            <dialog id="parcelDetailsModal" className="modal">
                <div className="modal-box max-w-lg">
                    <h3 className="font-bold text-xl mb-4">Parcel Details</h3>
                    {selectedParcel ? (
                        <div className="space-y-2">
                            <p><strong>Title:</strong> {selectedParcel.title}</p>
                            <p><strong>Type:</strong> {selectedParcel.kind}</p>
                            <p><strong>Created At:</strong> {formatDate(selectedParcel.creation_date)}</p>
                            <p><strong>Cost:</strong> ৳{selectedParcel.cost}</p>
                            <p><strong>Payment Status:</strong> {selectedParcel.payment_status}</p>
                            <p><strong>Sender Center:</strong> {selectedParcel.sender_center}</p>
                            <p><strong>Receiver Center:</strong> {selectedParcel.receiver_center}</p>
                            <p><strong>Tracking ID:</strong> {selectedParcel.tracking_id}</p>
                            {selectedParcel.note && <p><strong>Note:</strong> {selectedParcel.note}</p>}
                        </div>
                    ) : (
                        <p>No parcel selected.</p>
                    )}
                    <div className="modal-action mt-4">
                        <form method="dialog">
                            <button className="btn btn-outline" onClick={() => setSelectedParcel(null)}>
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyParcels;