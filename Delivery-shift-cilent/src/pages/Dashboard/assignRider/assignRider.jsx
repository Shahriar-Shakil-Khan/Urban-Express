import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaMotorcycle } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import useTrackingLogger from "../../../hooks/useTrackingLogger";
import useAuth from "../../../hooks/useAuth";




const AssignRider = () => {

    const axiosSecure = useAxiosSecure();
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [selectedRider, setSelectedRider] = useState(null);
    const [riders, setRiders] = useState([]);
    const [loadingRiders, setLoadingRiders] = useState(false);
    const queryClient = useQueryClient();
    const { logTracking } = useTrackingLogger();
    const { user } = useAuth();

    const { data: parcels = [], isLoading } = useQuery({

        queryKey: ["assignableParcels"],
        queryFn: async () => {
            const res = await axiosSecure.get(
                "/parcels?payment_status=paid&delivery_status=not_collected"
            );

            return res.data.sort(

                (a, b) => new Date(a.creation_date) - new Date(b.creation_date)

            );
        },
    });

    const { mutateAsync: assignRider } = useMutation({

        mutationFn: async ({ parcelId, rider }) => {

            setSelectedRider(rider);
            const res = await axiosSecure.patch(`/parcels/${parcelId}/assign`, {
                riderId: rider._id,
                riderEmail: rider.email,
                riderName: rider.name,
            });
            return res.data;
        },
        onSuccess: async () => {
            queryClient.invalidateQueries(["assignableParcels"]);
            Swal.fire("Success", "Rider assigned successfully!", "success");
            await logTracking({
                tracking_id: selectedParcel.tracking_id,
                status: "rider has been assigned",
                details: `Assigned to ${selectedRider.name}`,
                updated_by: user.email,
            });

            document.getElementById("assignModal").close();
        },
        onError: () => {

            Swal.fire("Error", "Failed to assign rider", "error");
        },
    });

    const openAssignModal = async (parcel) => {

        setSelectedParcel(parcel);
        setLoadingRiders(true);
        setRiders([]);
        try {
            const res = await axiosSecure.get("/riders/available", {

                params: {
                    district: parcel.sender_center,
                },

            });
            setRiders(res.data);
        } catch {

            //console.error(error);

            Swal.fire("Error", "Failed to load riders", "error");

        } finally {

            setLoadingRiders(false);
            document.getElementById("assignModal").showModal();
        }
    };

    return (

        <div className="p-8">

            <h2 className="text-3xl font-bold mb-4 text-center">Assign Rider to Parcels</h2>
            {isLoading ? (

                <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                    <span className="loading loading-bars loading-xl text-black"></span>

                </div>
            ) : parcels.length === 0 ? (

                <p className="text-gray-500">Sorry! No parcels available for assignment.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full table-zebra">
                        {/* Hide thead on sm/md, show on lg */}
                        <thead className="hidden lg:table-header-group">
                            <tr>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Tracking ID</th>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Title</th>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Sender Center</th>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Receiver Center</th>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Cost</th>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Created At</th>
                                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Action</th>
                            
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

                                    <td className="block lg:table-cell bg-white text-black font-bold py-4 px-2">
                                        <span className="lg:hidden font-bold">Title: </span>
                                        {parcel.title}
                                    </td>

                                    <td className="block lg:table-cell bg-white text-black font-bold py-4 px-2">
                                        <span className="lg:hidden font-bold">Sender Center: </span>
                                        {parcel.sender_center}
                                    </td>

                                    <td className="block lg:table-cell bg-white text-black font-bold py-4 px-2">
                                        <span className="lg:hidden font-bold">Receiver Center: </span>
                                        {parcel.receiver_center}
                                    </td>

                                    <td className="block lg:table-cell bg-white text-black font-bold py-4 px-2">
                                        <span className="lg:hidden font-bold">Cost: </span>
                                        ৳{parcel.cost}
                                    </td>

                                    <td className="block lg:table-cell bg-white text-black font-bold py-4 px-2">
                                        <span className="lg:hidden font-bold">Created At: </span>
                                        {new Date(parcel.creation_date).toLocaleDateString()}
                                    </td>

                                    <td className="block lg:table-cell bg-white text-black font-bold py-4 px-2">
                                        <span className="lg:hidden font-bold">Action: </span>
                                        <button
                                            onClick={() => openAssignModal(parcel)}
                                            className="btn btn-sm btn-primary text-white font-bold">
                                            <FaMotorcycle className="inline-block mr-1" />
                                            Assign Rider
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* Assign Rider Modal */}
                    <dialog id="assignModal" className="modal">
                        <div className="modal-box max-w-2xl">
                            <h3 className="text-lg font-bold mb-3">
                                Assign Rider for Parcel:{" "}
                                <span className="text-primary">{selectedParcel?.title}</span>
                            </h3>
                            {loadingRiders ? (
                                <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
                                    <span className="loading loading-bars loading-xl text-black"></span>
                                </div>
                            ) : riders.length === 0 ? (
                                <p className="text-error">Sorry! No available riders in this district.</p>
                            ) : (
                                <div className="overflow-x-auto max-h-80 overflow-y-auto">
                                    <table className="table table-sm">
                                        <thead>

                                            <tr>
                                                <th>Name</th>
                                                <th>Phone</th>
                                                <th>Bike Info</th>
                                                <th>Action</th>

                                            </tr>
                                        </thead>

                                        <tbody>
                                            {riders.map((rider) => (
                                                <tr key={rider._id}>
                                                    <td>{rider.name}</td>
                                                    <td>{rider.phone}</td>
                                                    <td>
                                                        {rider.bike_brand} - {rider.bike_registration}
                                                    </td>

                                                    <td>
                                                        <button
                                                            onClick={() =>
                                                                assignRider({
                                                                    parcelId: selectedParcel._id,
                                                                    rider,
                                                                })
                                                            }
                                                            className="btn btn-xs btn-success">
                                                            Assign

                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            <div className="modal-action">
                                <form method="dialog">
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            )}
        </div>
    );
};

export default AssignRider;