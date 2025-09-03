import { useState } from "react";
import Swal from "sweetalert2";
import { FaEye, FaCheck, FaTimes } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PendingRiders = () => {

    const [selectedRider, setSelectedRider] = useState(null);
    const axiosSecure = useAxiosSecure();

    const { isPending, data: riders = [], refetch } = useQuery({

        queryKey: ['pending-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/pending");
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

    const handleDecision = async (id, action, email) => {

        const confirm = await Swal.fire({
            title: `${action === "approve" ? "Approve" : "Reject"} Application?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {

            const status = action === "approve" ? "active" : "rejected";
            await axiosSecure.patch(`/riders/${id}/status`, {
                status,
                email
            });

            refetch();

            Swal.fire("Success", `Rider ${action}d successfully`, "success");

        } catch (err) {
            Swal.fire("Error", "Could not update rider status", err);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4 text-center">Pending Rider</h2>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* Hide thead on sm/md, show on lg */}
                    <thead className="hidden lg:table-header-group">

                        <tr>
                            <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Name</th>
                            <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Email</th>
                            <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Region</th>
                            <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">District</th>
                            <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Phone</th>
                            <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Applied</th>
                            <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Actions</th>
                        </tr>

                    </thead>
                    <tbody>
                        {riders.map((rider) => (
                            <tr
                                key={rider._id}
                                className="block lg:table-row mb-4 lg:mb-0 border lg:border-0 rounded-lg lg:rounded-none shadow lg:shadow-none"
                            >
                                <td className="block lg:table-cell bg-white text-black font-bold py-4 px-2">
                                    <span className="lg:hidden font-bold">Name: </span>
                                    {rider.name}
                                </td>

                                <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                    <span className="lg:hidden font-bold">Email: </span>
                                    {rider.email}
                                </td>

                                <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                    <span className="lg:hidden font-bold">Region: </span>
                                    {rider.region}
                                </td>

                                <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                    <span className="lg:hidden font-bold">District: </span>
                                    {rider.district}
                                </td>

                                <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                    <span className="lg:hidden font-bold">Phone: </span>
                                    {rider.phone}
                                </td>

                                <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                    <span className="lg:hidden font-bold">Applied: </span>
                                    {new Date(rider.created_at).toLocaleDateString()}
                                </td>

                                <td className="block lg:table-cell bg-white text-black py-4 px-2">
                                    <span className="lg:hidden font-bold">Actions: </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSelectedRider(rider)}
                                            className="btn btn-sm btn-info"
                                        >
                                            <FaEye />
                                        </button>
                                        <button
                                            onClick={() => handleDecision(rider._id, "approve", rider.email)}
                                            className="btn btn-sm btn-success"
                                        >
                                            <FaCheck />
                                        </button>
                                        <button
                                            onClick={() => handleDecision(rider._id, "reject", rider.email)}
                                            className="btn btn-sm btn-error"
                                        >
                                            <FaTimes />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for viewing rider details */}
            {selectedRider && (
                <dialog id="riderDetailsModal" className="modal modal-open">
                    <div className="modal-box max-w-2xl">
                        <h3 className="font-bold text-xl mb-2">Rider Details</h3>
                        <div className="space-y-2">
                            <p><strong>Name:</strong> {selectedRider.name}</p>
                            <p><strong>Email:</strong> {selectedRider.email}</p>
                            <p><strong>Phone:</strong> {selectedRider.phone}</p>
                            <p><strong>Age:</strong> {selectedRider.age}</p>
                            <p><strong>NID:</strong> {selectedRider.nid}</p>
                            <p><strong>Bike Brand:</strong> {selectedRider.bike_brand}</p>
                            <p><strong>Bike Registration:</strong> {selectedRider.bike_registration}</p>
                            <p><strong>Region:</strong> {selectedRider.region}</p>
                            <p><strong>District:</strong> {selectedRider.district}</p>
                            <p><strong>Applied At:</strong> {new Date(selectedRider.created_at).toLocaleString()}</p>
                            {selectedRider.note && <p><strong>Note:</strong> {selectedRider.note}</p>}
                        </div>

                        <div className="modal-action mt-4">
                            <button
                                className="btn btn-outline"
                                onClick={() => setSelectedRider(null)}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default PendingRiders;