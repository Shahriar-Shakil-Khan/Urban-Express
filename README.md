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
