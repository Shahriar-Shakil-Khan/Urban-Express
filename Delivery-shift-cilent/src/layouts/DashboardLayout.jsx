import React from 'react';
import { NavLink, Outlet } from 'react-router';
import { Home, Package, CreditCard, Truck, User, UserCheck, Clock, Bike, Shield, Briefcase, Package2, Coins } from 'lucide-react';
import AppLogo from '../pages/shared/AppLogo/AppLogo';
import useUserRole from '../hooks/useUserRole';

const DashBoardLayout = () => {
  const { role, roleLoading } = useUserRole();

  // NavLink active style
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "border-l-4 border-white bg-white/10 text-white font-bold"
      : "text-white";

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col ">
        {/* Navbar */}
        <div className="navbar bg-base-300 w-full lg:hidden">
          <div className="flex-none ">
            <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
        </div>
        {/* Page content here */}
        <Outlet />
      </div>
      <div className="drawer-side">
       
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 bg-gradient-to-b from-[#5524B7] to-[#380B60]">
          {/* Logo and Cross button positioned together */}
          <div className="flex justify-between items-center">
            <AppLogo />
          
            <button
              className="text-white text-4xl bg-transparent border-none cursor-pointer block lg:hidden"
              onClick={() => document.getElementById('my-drawer-2').checked = false}
              aria-label="Close Sidebar"
            >
              ×
            </button>
          </div>

          <li className='mt-12'>
            <NavLink to="/dashboard" end className={navLinkClass}>
              <Home size={30} color="red" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myParcels" className={navLinkClass}>
              <Package size={30} color="blue" /> My Parcels
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/paymentHistory" className={navLinkClass}>
              <CreditCard size={30} color="green" /> Payment
            </NavLink>
          </li>
          {!roleLoading && role === 'rider' && (
            <>
              <li>
                <NavLink to="/dashboard/pendingDeliveries" className={navLinkClass}>
                  <Briefcase size={30} color="blue" /> Pending Deliveries
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/completedDeliveries" className={navLinkClass}>
                  <Package2 size={30} color="green" /> Delivered Item
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myEarnings" className={navLinkClass}>
                  <Coins size={30} color="blue" /> My Earn
                </NavLink>
              </li>
            </>
          )}
          {!roleLoading && role === 'admin' && (
            <>
              <li>
                <NavLink to="/dashboard/track" className={navLinkClass}>
                  <Truck size={30} color="orange" /> Track a Package
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/activeRiders" className={navLinkClass}>
                  <UserCheck size={30} color="green" /> Active Riders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/pendingRiders" className={navLinkClass}>
                  <Clock size={30} color="orange" /> Pending Riders
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/assignRider" className={navLinkClass}>
                  <Bike size={30} color="orange" /> Assign Rider
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/makeAdmin" className={navLinkClass}>
                  <Shield size={30} color="red" /> Admin
                </NavLink>
              </li>
            </>
          )}
          <li>
            <NavLink to="/dashboard/profile" className={navLinkClass}>
              <User size={30} color="green" /> Profile
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashBoardLayout;

