import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {FaUserShield, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeAdmin = () => {

    const axiosSecure = useAxiosSecure();
    const [emailQuery, setEmailQuery] = useState("");

    const {
        data: users = [],
        refetch,
        isFetching,
    } = useQuery({
        queryKey: ["searchedUsers", emailQuery],
        enabled: !!emailQuery,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${emailQuery}`);
            return res.data;
        },
    });

    const { mutateAsync: updateRole } = useMutation({

        mutationFn: async ({ id, role }) =>
            await axiosSecure.patch(`/users/${id}/role`, { role }),
        onSuccess: () => {
            refetch();
        },
    });

    const handleRoleChange = async (id, currentRole) => {

        const action = currentRole === "admin" ? "Remove admin" : "Make admin";
        const newRole = currentRole === "admin" ? "user" : "admin";

        const confirm = await Swal.fire({
            title: `${action}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            await updateRole({ id, role: newRole });
            Swal.fire("Success", `${action} successful`, "success");
        } catch {
            Swal.fire("Error", "Failed to update user role", "error");
        }
    };

    return (
        <div className="p-8">

            <h2 className="text-4xl font-bold mb-4 text-center ">Make Another Admin</h2>

            <div className="flex gap-2 mb-6 items-center justify-center">

                <input
                    type="text"
                    className="input input-bordered w-full max-w-md"
                    placeholder="Search user by email"
                    value={emailQuery}
                    onChange={(e) => setEmailQuery(e.target.value)}
                />
            </div>

            {isFetching && (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <span className="loading loading-bars loading-xl text-black"></span>
    </div>
)}

            {!isFetching && users.length === 0 && emailQuery && (
                <p className="text-gray-500">Sorry! No users found.</p>
            )}

            {users.length > 0 && (
                <div className="overflow-x-auto">

                    <table className="table w-full table-zebra">

                        <thead className="hidden md:table-header-group bg-gradient-to-b from-[#5524B7] to-[#380B60]">
                            <tr>
                                <th>Email</th>
                                <th>Created At</th>
                                <th>Role</th>
                                <th>Action</th>

                            </tr>
                        </thead>
                        <tbody>
                            {users.map((u) => (

                                <tr
                                    key={u._id}
                                    className="block md:table-row mb-4 md:mb-0 border md:border-0 rounded-lg md:rounded-none shadow md:shadow-none"
                                >
                                    <td className="block md:table-cell bg-white text-black font-semibold">
                                        <span className="md:hidden font-bold">Email: </span>
                                        {u.email}
                                    </td>

                                    <td className="block md:table-cell bg-white text-black">
                                        <span className="md:hidden font-bold">Created At: </span>
                                        {new Date(u.created_at).toLocaleDateString()}
                                    </td>

                                    <td className="block md:table-cell bg-white text-black">
                                        <span className="md:hidden font-bold">Role: </span>
                                        <span
                                            className={`badge ${u.role === "admin" ? "badge-success" : "badge-ghost"}`}
                                        >
                                            {u.role || "user"}
                                        </span>
                                    </td>

                                    <td className="block md:table-cell bg-white text-black">
                                        <span className="md:hidden font-bold">Action: </span>
                                        <button
                                            onClick={() => handleRoleChange(u._id, u.role || "user")}
                                            className={`btn btn-sm text-white ${u.role === "admin" ? "btn-error" : "btn-primary"}`}
                                        >
                                            {u.role === "admin" ? (
                                                <>
                                                    <FaUserTimes className="mr-1" />

                                                    Remove Admin

                                                </>
                                            ) : (
                                                <>
                                                    <FaUserShield className="mr-1" />

                                                    Make Admin

                                                </>
                                            )}

                                        </button>
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

export default MakeAdmin;