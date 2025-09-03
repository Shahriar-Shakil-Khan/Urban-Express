
import React, { useState } from "react";
import { FaSearch, FaMotorcycle, FaUser } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function TrackParcel() {
  const [title, setTitle] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const axiosSecure = useAxiosSecure();

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const res = await axiosSecure.get(`/track-parcel/by-title/${encodeURIComponent(title.trim())}`);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Parcel not found.");
    }
    setLoading(false);
    setSearchTitle(title.trim());
  };

  return (
    <div className=" sm:p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4 text-center ">Track a Package by Title</h2>
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          className="input input-bordered w-full text-white"
          placeholder="Enter Parcel Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button className="btn btn-primary flex items-center gap-2" type="submit">
          <FaSearch /> <span>Track</span>
        </button>
      </form>

      {loading && (
        <div className="flex justify-center items-center py-8">
          <span className="loading loading-bars loading-xl text-[#5524B7]"></span>
        </div>
      )}
      {error && <div className="text-red-600 text-center mb-4">{error}</div>}

      {/* Parcel Details */}
      {result?.parcel && (
        <div className="card  shadow-md mb-6 p-4  border text-black bg-white">
          <h3 className="text-xl font-semibold mb-2 ">Parcel Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <p><strong >Title:</strong> {result.parcel.title}</p>
            <p><strong >Status:</strong> {result.parcel.delivery_status}</p>
            <p><strong>Created By:</strong> <FaUser className="inline mr-1" /> {result.parcel.created_by}</p>
            {result.parcel.assigned_rider_name && (
              <p>
                <strong>Assigned Rider:</strong> <FaMotorcycle className="inline mr-1" /> {result.parcel.assigned_rider_name} ({result.parcel.assigned_rider_email})
              </p>
            )}
          </div>
        </div>
      )}

      {/* Tracking History */}
      
      {result?.trackingHistory?.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="hidden lg:table-header-group">
              <tr>
                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Status</th>
                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Details</th>
                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Updated By</th>
                <th className="bg-gradient-to-b from-[#5524B7] to-[#380B60] text-white">Time</th>
              </tr>
            </thead>
            <tbody>
              {result.trackingHistory.map((track, idx) => (
                <tr
                  key={idx}
                  className="block lg:table-row mb-4 lg:mb-0 border lg:border-0 rounded-lg lg:rounded-none shadow lg:shadow-none"
                >
                  <td className="block lg:table-cell bg-white text-black font-bold py-2 px-2">
                    <span className="lg:hidden font-bold">Status: </span>
                    {track.status}
                  </td>
                  <td className="block lg:table-cell bg-white text-black py-2 px-2">
                    <span className="lg:hidden font-bold">Details: </span>
                    {track.message || track.details}
                  </td>
                  <td className="block lg:table-cell bg-white text-black py-2 px-2">
                    <span className="lg:hidden font-bold">Updated By: </span>
                    {track.updated_by}
                  </td>
                  <td className="block lg:table-cell bg-white text-black py-2 px-2">
                    <span className="lg:hidden font-bold">Time: </span>
                    {new Date(track.time || track.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        searchTitle && <div className="text-center text-gray-500">No tracking updates yet.</div>
      )}
    </div>
  );
}