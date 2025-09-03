import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaUserSlash } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const ActiveRiders = () => {

  const axiosSecure = useAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

 
  const { data: riders = [], isLoading, refetch, error } = useQuery({

    queryKey: ["activeRiders"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders/active");
      return res.data;
    },
  });


  const handleDeactivate = async (id) => {

    const confirm = await Swal.fire({
      title: "Deactivate this rider?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, deactivate",
      cancelButtonText: "Cancel",

    });

    if (!confirm.isConfirmed) return;

    try {

      await axiosSecure.patch(`/riders/${id}/status`, { status: "deactivated" });
      Swal.fire("Done", "Rider has been deactivated", "success");
      refetch();
    } catch {

      //console.error(error);
      Swal.fire("Error", "Failed to deactivate rider", "error");

    }
  };


  const filteredRiders = riders.filter((rider) =>

    rider.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div className="p-8">

      <h2 className="text-3xl font-bold mb-4 text-center">Active Riders</h2>

     
      <div className="mb-4 flex items-center gap-2 justify-center">

       
        <input

          type="text"
          placeholder="Search by name"
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>

   
      {isLoading && (

        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <span className="loading loading-bars loading-xl text-black"></span>
        </div>
      )}
      {error && <p className="text-center text-red-500">Failed to load riders</p>}

     
      {!isLoading && !error && (

        <div className="overflow-x-auto">

          <table className="table table-zebra w-full">

      
            <thead className="hidden lg:table-header-group">
              <tr>

                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Name</th>
                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Email</th>
                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Phone</th>
                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Region</th>
                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">District</th>
                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Bike Details</th>
                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Status</th>
                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Action</th>

              </tr>
            </thead>

            <tbody>

              {filteredRiders.map((rider) => (

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
                    <span className="lg:hidden font-bold">Phone: </span>
                    {rider.phone}
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
                    <span className="lg:hidden font-bold">Bike: </span>
                    {rider.bike_brand} - {rider.bike_registration}
                  </td>

                  <td className="block lg:table-cell bg-white text-black py-4 px-2">
                    <span className="lg:hidden font-bold">Status: </span>
                    <span className="badge badge-success text-white">Active</span>
                  </td>

                  <td className="block lg:table-cell bg-white text-black py-4 px-2">
                    <span className="lg:hidden font-bold">Action: </span>
                    <button

                      onClick={() => handleDeactivate(rider._id)}
                      className="btn btn-sm btn-error"
                    >
                      <FaUserSlash className="mr-1" /> Deactivate

                    </button>
                  </td>
                </tr>
              ))}
              {filteredRiders.length === 0 && (
                
                <tr>
                  <td colSpan="8" className="text-center text-gray-500 bg-white  font-bold py-4 px-2">
                    No matching riders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ActiveRiders;