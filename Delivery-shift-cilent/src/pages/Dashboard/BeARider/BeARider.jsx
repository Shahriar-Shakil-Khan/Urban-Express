import Swal from "sweetalert2";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const BeARider = () => {

    const { user } = useAuth();
    const [selectedRegion, setSelectedRegion] = useState("");
    const axiosSecure = useAxiosSecure();
    const warehouseList = useLoaderData();

    const regions = [...new Set(warehouseList.map((s) => s.region))];
    const districts = warehouseList
    .filter((s) => s.region === selectedRegion)
    .map((s) => s.district);

    const {

        reset,

        register,

        handleSubmit,

        formState: { errors },

    } = useForm();

    

    

    const onSubmit = async (data) => {
        const riderData = {
            ...data,
            name: user?.displayName || "",
            email: user?.email || "",
            status: "pending",
            created_at: new Date().toISOString(),
        };

        // console.log("Rider Application:", riderData);

        axiosSecure.post('/riders', riderData)
            .then(res => {
                if(res.data.insertedId){
                    Swal.fire({
                        icon: "success",
                        title: "Application Submitted!",
                        text: "Your application is pending approval.",
                    });
                }
            })

            reset();
    };

    return (
        <div className="mt-6 mb-6 bg-gradient-to-b from-[#5524B7] to-[#380B60] mx-auto p-6 bg-base-100 rounded-xl shadow ">
            <h2 className="text-2xl font-bold mb-2">Rider Application</h2>
            <p className="text-gray-500 mb-6">Fill out the form to apply as a delivery rider.</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                    {/* Name (read-only) */}
                    <input
                        type="text"
                        value={user?.displayName || ""}
                        readOnly
                        className="input input-bordered text-black w-full bg-gray-100"
                    />

                    {/* Email (read-only) */}
                    <input
                        type="email"
                        value={user?.email || ""}
                        readOnly
                        className="input input-bordered text-black w-full bg-gray-100"
                    />

                    {/* Age */}
                    <input
                        type="number"
                        placeholder="Your Age"
                        className="input input-bordered w-full"
                        {...register("age", { required: true, min: 18 })}
                    />
                    {errors.age && (
                        <span className="text-red-600 text-sm">You must be 18 or older</span>
                    )}

                    {/* Phone */}
                    <input
                        type="tel"
                        placeholder="Phone Number (11 digits)"
                        className="input input-bordered w-full"
                        {...register("phone", {
                            required: true,
                            pattern: {
                                value: /^\d{11}$/,
                                message: "Phone number must be exactly 11 digits",
                            },
                        })}
                    />
                    {errors.phone && (
                        <span className="text-red-600 text-sm">{errors.phone.message || "Phone number is required"}</span>
                    )}

                    {/* National ID */}
                    <input
                        type="text"
                        placeholder="National ID Card Number (10 digits)"
                        className="input input-bordered w-full"
                        {...register("nid", {
                            required: true,
                            pattern: {
                                value: /^\d{10}$/,
                                message: "National ID must be exactly 10 digits",
                            },
                        })}
                    />
                    {errors.nid && (
                        <span className="text-red-600 text-sm">{errors.nid.message || "NID is required"}</span>
                    )}

                    {/* Region */}
                    <select
                        className="select select-bordered w-full"
                        {...register("region", { required: true })}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                    >
                        <option value="">Select Region</option>
                        {regions.map((region, idx) => (
                            <option key={idx} value={region}>
                                {region}
                            </option>
                        ))}
                    </select>
                    {errors.region && <span className="text-red-600 text-sm">Region is required</span>}

                    {/* District */}
                    <select
                        className="select select-bordered w-full"
                        {...register("district", { required: true })}
                        disabled={!selectedRegion}
                    >
                        <option value="">Select District</option>
                        {districts.map((district, idx) => (
                            <option key={idx} value={district}>
                                {district}
                            </option>
                        ))}
                    </select>
                    {errors.district && <span className="text-red-600 text-sm">District is required</span>}

                    {/* Bike Brand */}
                    <input
                        type="text"
                        placeholder="Bike Brand (e.g., Yamaha FZ)"
                        className="input input-bordered w-full"
                        {...register("bike_brand", { required: true })}
                    />
                    {errors.bike_brand && (
                        <span className="text-red-600 text-sm">Bike brand is required</span>
                    )}

                    {/* Bike Registration */}
                    <input
                        type="text"
                        placeholder="Bike Registration Number (e.g., DHA-12-1234)"
                        className="input input-bordered w-full"
                        {...register("bike_registration", {
                            required: true,
                            pattern: {
                                value: /^[A-Z]+-\d{2}-\d{4}$/,
                                message: "Format: [A-Z]-[2 digits]-[4 digits] (e.g., DHA-12-1234)",
                            },
                        })}
                    />
                    {errors.bike_registration && (
                        <span className="text-red-600 text-sm">{errors.bike_registration.message || "Registration number is required"}</span>
                    )}

                    {/* Additional Info (optional) */}
                    <textarea
                        placeholder="Additional information (optional)"
                        className="textarea textarea-bordered w-full"
                        {...register("note")}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary text-white font-bold w-full mt-4">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default BeARider;






