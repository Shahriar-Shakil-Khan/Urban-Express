import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaClipboardList, FaHourglassHalf } from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function UserDashboard() {
  const axiosSecure = useAxiosSecure();

  const { data: summary = {}, isLoading, isError, error } = useQuery({
    queryKey: ["myOrderSummary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/my-order-summary");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );

  if (isError)
    return (
      <div className="text-center text-red-600 mt-10">
        Error loading data: {error.message}
      </div>
    );

  return (
    <div className="p-8 ">
      <h2 className="text-2xl font-bold mb-6 text-center">My Order Summary</h2>
      <div className="card bg-white text-black shadow-md border border-base-200 flex flex-col items-center justify-center p-6 max-w-md mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <FaClipboardList className="text-3xl text-primary" />
          <span className="text-lg font-semibold">Total Orders:</span>
          <span className="text-2xl font-bold">{summary.total_orders}</span>
        </div>
        <div className="flex items-center gap-4">
          <FaHourglassHalf className="text-3xl text-warning" />
          <span className="text-lg font-semibold">Pending Orders:</span>
          <span className="text-2xl font-bold">{summary.pending_orders}</span>
        </div>
      </div>
    </div>
  );
}