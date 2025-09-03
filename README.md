# UrbanExpress — Parcel Delivery App (MERN)

> Zero fluff, all speed. **UrbanExpress** is a full-stack MERN app for booking, assigning, tracking, and delivering parcels with rider + admin workflows, payments, and real-time status updates.

![Node](https://img.shields.io/badge/Node-18%2B-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=222)
![Express](https://img.shields.io/badge/Express-4-black?logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-6%2B-47A248?logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-informational)
![Status](https://img.shields.io/badge/Status-WIP-yellow)

---

## 🚀 Features (what actually matters)
- **Auth**: JWT + refresh tokens, email/password; roles: `user`, `rider`, `admin`.
- **Parcel Lifecycle**: create → price estimate → assign rider → pickup → in-transit → delivered/cancelled.
- **Live Tracking**: status updates + timestamps; optional location pings.
- **Payments**: Stripe checkout, webhooks, receipts.
- **Dashboards**:
  - User: my parcels, payments, support.
  - Rider: assigned jobs, daily route, earnings.
  - Admin: users, riders, parcel ops, payouts, analytics.
- **Notifications**: email updates (booked, assigned, delivered), optional SMS hook.
- **Clean Ops**: activity logs, audit fields, soft deletes.
- **Production-ready vibes**: env-driven config, rate-limit, CORS, Helmet, request validation.

---

## 🧱 Tech Stack
- **Frontend**: React 18, Vite, React Router, TanStack Query, TailwindCSS, shadcn/ui, Axios.
- **Backend**: Node.js, Express, Mongoose, Zod (validation), Passport/JWT (or custom), Stripe SDK.
- **DB**: MongoDB + indexes for hot queries.
- **Tooling**: TypeScript (recommended), ESLint, Prettier, Husky + lint-staged.
- **Optional**: Socket.io (live events), Cloudinary/S3 (proof of delivery).

---

## 📁 Monorepo Structure
### **Screenshot**

- **Login Page**
  ![Login Page](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/login.png)

- **Registration**
  ![Registration](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/Registration.png)

- **User Home**
  ![User Home](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/userHome.png)

- **Profile**
  ![Profile](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/profile.png)

- **Admin Home**
  ![Admin Home](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/Admin_Home.png)

- **Admin Make Admin**
  ![Admin Make Admin](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/Admin%20make%20Admin.png)

- **Admin Trace Percel**
  ![Admin Trace Percel](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/admin%20trace%20percel.png)

- **Active Rider**
  ![Active Rider](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/Active%20Rider.png)

- **Assign Rider**
  ![Assign Rider](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/AssignRider.png)

- **Percel Details**
  ![Percel Details](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/Percel_details.png)

- **Completed Delivered**
  ![Completed Delivered](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/completed%20Deliverd.png)

- **My Percel**
  ![My Percel](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/My%20percel.png)

- **Mongo Database**
  ![Mongo Database](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/Mongo_database.png)

- **Proced Payment**
  ![Proced Payment](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/Proced_payment.png)

- **Payment**
  ![Payment](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/payment.png)

- **Rider Earn**
  ![Rider Earn](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/RiderEarn.png)

- **Transection**
  ![Transection](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/Transection.png)

- **Cover 64 District**
  ![Cover 64 District](https://github.com/Shahriar-Shakil-Khan/Urban-Express/blob/9880d19c81e106bcdbcb86b2d2857c80e0a0e95d/Delivery-shift-cilent/screenshoot/cover_64_distric.png)
