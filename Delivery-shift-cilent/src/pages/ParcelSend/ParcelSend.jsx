
import { useForm, useWatch } from "react-hook-form";
import Swal from 'sweetalert2';
import { useLoaderData } from "react-router";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useTrackingLogger from "../../hooks/useTrackingLogger";

const createTrackingCode = () => {
    const now = new Date();
    const dateStr = now.toISOString().split("T")[0].replace(/-/g, "");
    const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
    return `PKG-${dateStr}-${randomStr}`;
};

const ParcelSend = () => {
    const{ logTracking } = useTrackingLogger();
    const warehouseList = useLoaderData() || [];
    const regionList = [...new Set(warehouseList.map((item) => item.region))];
    const getCentersByRegion = (region) =>
        warehouseList.filter((item) => item.region === region).map((item) => item.district);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
    } = useForm();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const parcelKind = useWatch({ control, name: "kind" });
    const senderRegion = watch("sender_region");
    const receiverRegion = watch("receiver_region");

    const handleForm = (values) => {
        const weightVal = parseFloat(values.weight) || 0;
        const sameDistrict = values.sender_center === values.receiver_center;

        let baseFee = 0;
        let extraFee = 0;
        let feeDetails = "";

        if (values.kind === "document") {
            baseFee = sameDistrict ? 60 : 80;
            feeDetails = `Document delivery ${sameDistrict ? "within" : "outside"} the district.`;
        } else {
            if (weightVal <= 3) {
                baseFee = sameDistrict ? 110 : 150;
                feeDetails = `Non-document up to 3kg ${sameDistrict ? "within" : "outside"} the district.`;
            } else {
                const extraWeight = weightVal - 3;
                const perKgFee = extraWeight * 40;
                const districtFee = sameDistrict ? 0 : 40;
                baseFee = sameDistrict ? 110 : 150;
                extraFee = perKgFee + districtFee;

                feeDetails = `
        Non-document over 3kg ${sameDistrict ? "within" : "outside"} the district.<br/>
        Extra charge: ৳40 x ${extraWeight.toFixed(1)}kg = ৳${perKgFee}<br/>
        ${districtFee ? "+ ৳40 extra for outside district delivery" : ""}
      `;
            }
        }

        const totalFee = baseFee + extraFee;

        Swal.fire({
            title: "Delivery Cost Breakdown",
            icon: "info",
            html: `
      <div class="text-left text-base space-y-2">
        <p><strong>Parcel Kind:</strong> ${values.kind}</p>
        <p><strong>Weight:</strong> ${weightVal} kg</p>
        <p><strong>Delivery Zone:</strong> ${sameDistrict ? "Within Same District" : "Outside District"}</p>
        <hr class="my-2"/>
        <p><strong>Base Fee:</strong> ৳${baseFee}</p>
        ${extraFee > 0 ? `<p><strong>Extra Charges:</strong> ৳${extraFee}</p>` : ""}
        <div class="text-gray-500 text-sm">${feeDetails}</div>
        <hr class="my-2"/>
        <p class="text-xl font-bold text-green-600">Total Fee: ৳${totalFee}</p>
      </div>
    `,
            showDenyButton: true,
            confirmButtonText: "💳 Proceed to Payment",
            denyButtonText: "✏️ Continue Editing",
            confirmButtonColor: "#16a34a",
            denyButtonColor: "#d3d3d3",
            customClass: {
                popup: "rounded-xl shadow-md px-6 py-6",
            },
        }).then((result) => {
            if (result.isConfirmed) {
                const tracking_id = createTrackingCode();

                const parcelInfo = {
                    ...values,
                    cost: totalFee,
                    payment_status: 'unpaid',
                    created_by: user.email,
                    delivery_status: 'not_collected',
                    creation_date: new Date().toISOString(),
                    tracking_id: tracking_id,
                };

                axiosSecure.post('/parcels', parcelInfo)
                .then(async(res) => {
                  if (res.data.insertedId) {
                      Swal.fire({
                        title: "Redirecting.....",
                        position: "top-end",
                        icon: "success",
                        text: "Processing to payment gateway",
                        showConfirmButton: false,
                        timer: 2000
                      });
                      
                      await logTracking({
                                tracking_id: parcelInfo.tracking_id,
                                status: "parcel has been created",
                                details: `Created by ${user.displayName}`,
                                updated_by: user.email,
                            })
                      
                      setTimeout(() => {
                        window.location.href = '/dashboard/myParcels';
                      }, 2000);
                  }
                });
            }
        });
    };

    return (
        <div className="p-6 w-full mt-6 mb-8 rounded-2xl mx-auto bg-gradient-to-b from-[#5524B7] to-[#380B60]">
            <form onSubmit={handleSubmit(handleForm)} className="space-y-8">
                {/* Heading */}
                <div className="text-center">
                    <h2 className="text-3xl font-bold">Send Any Parcel</h2>
                    <p className="text-gray-200">Fill in the details below</p>
                </div>

                {/* Parcel Info */}
                <div className="border p-4 rounded-xl shadow-md space-y-4">
                    <h3 className="font-semibold text-xl">Parcel Info</h3>
                    <div className="space-y-4">
                        {/* Parcel Name */}
                        <div>
                            <label className="label">Please! Enter Parcel Name</label>
                            <input
                                {...register("title", { required: true })}
                                className="input input-bordered w-full bg-gray-600"
                                placeholder="Describe your parcel"
                            />
                            {errors.title && <p className="text-red-500 text-sm">This Parcel name is required</p>}
                        </div>

                        {/* Kind */}
                        <div>
                            <label className="label">Kind</label>
                            <div className="flex gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="document"
                                        {...register("kind", { required: true })}
                                        className="radio"
                                    />
                                    Document
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        value="non-document"
                                        {...register("kind", { required: true })}
                                        className="radio"
                                    />
                                    Non-Document
                                </label>
                            </div>
                            {errors.kind && <p className="text-red-500 text-sm">Kind is required</p>}
                        </div>

                        {/* Weight */}
                        <div>
                            <label className="label">Weight (kg)</label>
                            <input 
                                type="number"
                                step="0.1"
                                {...register("weight", {
                                    required: parcelKind === "non-document" ? "Weight is required for non-document parcels" : false,
                                    min: {
                                        value: 0.1,
                                        message: "Weight must be greater than 0"
                                    }
                                })
                              }
                                disabled={parcelKind !== "non-document"}
                                className={`input input-bordered w-full ${parcelKind !== "non-document" ? "bg-gray-600 text-white" : "bg-gray-500 text-white"}`}
                                placeholder="Enter weight"
                            />
                            {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Sender & Receiver Info */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Sender Info */}
                    <div className="border p-4 rounded-xl shadow-md space-y-4">
                        <h3 className="font-semibold text-xl">Sender Info</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <input {...register("sender_name", { required: true })} className="input input-bordered w-full bg-gray-600" placeholder="Name" />
                            <input {...register("sender_contact", { required: true })} className="input input-bordered w-full bg-gray-600" placeholder="Contact" />
                            <select {...register("sender_region", { required: true })} className="select select-bordered w-full bg-gray-600">
                                <option value="">Select Region</option>
                                {regionList.map((region) => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            <select {...register("sender_center", { required: true })} className="select select-bordered w-full bg-gray-600">
                                <option value="">Select Service Center</option>
                                {getCentersByRegion(senderRegion).map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                            <input {...register("sender_address", { required: true })} className="input input-bordered w-full bg-gray-600" placeholder="Address" />
                            <textarea {...register("pickup_instruction", { required: true })} className="textarea textarea-bordered w-full bg-gray-600" placeholder="Pickup Instruction" />
                        </div>
                    </div>

                    {/* Receiver Info */}
                    <div className="border p-4 rounded-xl shadow-md space-y-4">
                        <h3 className="font-semibold text-xl">Receiver Info</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <input {...register("receiver_name", { required: true })} className="input input-bordered w-full bg-gray-600" placeholder="Name" />
                            <input {...register("receiver_contact", { required: true })} className="input input-bordered w-full bg-gray-600" placeholder="Contact" />
                            <select {...register("receiver_region", { required: true })} className="select select-bordered w-full bg-gray-600">
                                <option value="">Select Region</option>
                                {regionList.map((region) => (
                                    <option key={region} value={region}>{region}</option>
                                ))}
                            </select>
                            <select {...register("receiver_center", { required: true })} className="select select-bordered w-full bg-gray-600">
                                <option value="">Select Service Center</option>
                                {getCentersByRegion(receiverRegion).map((district) => (
                                    <option key={district} value={district}>{district}</option>
                                ))}
                            </select>
                            <input {...register("receiver_address", { required: true })} className="input input-bordered w-full bg-gray-600" placeholder="Address" />
                            <textarea {...register("delivery_instruction", { required: true })} className="textarea textarea-bordered w-full bg-gray-600" placeholder="Delivery Instruction" />
                        </div>
                    </div>
                </div>

                <div className="text-center">
                    <button className="btn btn-primary w-full text-white font-bold">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default ParcelSend;