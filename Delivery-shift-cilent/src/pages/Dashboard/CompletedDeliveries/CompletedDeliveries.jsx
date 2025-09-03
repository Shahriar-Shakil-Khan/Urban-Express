import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

const CompletedDeliveries = () => {

    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const { user } = useAuth();
    const email = user?.email;

    const { data: parcels = [], isLoading } = useQuery({

        queryKey: ["completedDeliveries", email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/rider/completed-parcels?email=${email}`);
            return res.data;
        },
    });

    const calculateEarning = (parcel) => {

        const cost = Number(parcel.cost);
        if (parcel.sender_center === parcel.receiver_center) {

            return cost * 0.8;
        } else {
            return cost * 0.3;
        }
    };

   
    const { mutateAsync: cashout } = useMutation({
        mutationFn: async (parcelId) => {
            const res = await axiosSecure.patch(`/parcels/${parcelId}/cashout`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["completedDeliveries"]);
        },
    });

    const handleCashout = (parcelId) => {
        Swal.fire({
            title: "Confirm Cashout",
            text: "You are about to cash out this delivery.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Cash Out",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                cashout(parcelId)
                    .then(() => {
                        Swal.fire("Success", "Cashout completed.", "success");
                    })
                    .catch(() => {
                        Swal.fire("Error", "Failed to cash out. Try again.", "error");
                    });
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Completed Deliveries</h2>
            {isLoading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                    <span className="loading loading-bars loading-xl text-black"></span>
                </div>
            ) : parcels.length === 0 ? (
                <p className="text-gray-500 text-center">No deliveries yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full table-zebra">
                        
                        <thead className="hidden lg:table-header-group">

                            <tr>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Tracking ID</th>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Title</th>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">From</th>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">To</th>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Picked At</th>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Delivered At</th>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Fee (৳)</th>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Your Earning (৳)</th>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Cashout</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel) => (

                                <tr
                                    key={parcel._id}
                                    className="block lg:table-row mb-4 lg:mb-0 border lg:border-0 rounded-lg lg:rounded-none shadow lg:shadow-none"
                                >
                                    <td className="block lg:table-cell bg-white text-black font-bold py-4 px-2">
                                        <span className="lg:hidden font-bold">Tracking ID: </span>
                                        {parcel.tracking_id}
                                    </td>

                                    <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                        <span className="lg:hidden font-bold">Title: </span>
                                        {parcel.title}
                                    </td>

                                    <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                        <span className="lg:hidden font-bold">From: </span>
                                        {parcel.sender_center}
                                    </td>

                                    <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                        <span className="lg:hidden font-bold">To: </span>
                                        {parcel.receiver_center}
                                    </td>

                                    <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                        <span className="lg:hidden font-bold">Picked At: </span>
                                        {parcel.picked_at ? new Date(parcel.picked_at).toLocaleString() : "N/A"}
                                    </td>

                                    <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                        <span className="lg:hidden font-bold">Delivered At: </span>
                                        {parcel.delivered_at ? new Date(parcel.delivered_at).toLocaleString() : "N/A"}
                                    </td>

                                    <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                        <span className="lg:hidden font-bold">Fee (৳): </span>
                                        ৳{parcel.cost}
                                    </td>

                                    <td className="block lg:table-cell bg-white text-green-600 font-semibold py-4 px-2">
                                        <span className="lg:hidden font-bold">Your Earning (৳): </span>
                                        ৳{calculateEarning(parcel).toFixed(2)}
                                    </td>

                                    <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                        <span className="lg:hidden font-bold">Cashout: </span>
                                        {parcel.cashout_status === "cashed_out" ? (
                                            <span className="badge badge-success text-xs px-2 py-1 whitespace-nowrap">
                                                Cashed Out
                                            </span>
                                        ) : (
                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => handleCashout(parcel._id)}
                                            >
                                                Cashout
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default CompletedDeliveries;