// import React from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { getAuth } from "firebase/auth";

// const Profile = () => {
//   const axiosSecure = useAxiosSecure();
//   const { data: profile = {}, isLoading } = useQuery({
//     queryKey: ["profile"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users/profile");
//       return res.data;
//     },
//   });

//   const auth = getAuth();
//   const user = auth.currentUser;

//   if (isLoading) return (
//     <div className="flex justify-center items-center min-h-[40vh]">
//       <span className="loading loading-bars loading-xl text-primary"></span>
//     </div>
//   );

//   // Prefer backend data, fallback to Firebase Auth if not present
//   const displayName = profile.name || user?.displayName || "";
//   const profilePic = profile.profile_picture || user?.photoURL || "";
//   const email = profile.email || user?.email || "";

//   if (!email) {
//     return (
//       <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center">
//         <h2 className="text-xl font-bold mb-2 text-[#5524B7]">Profile</h2>
//         <p className="text-gray-700">Not logged in</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-sm mx-auto mt-10 p-20 bg-white rounded-xl shadow text-center">
//       <h2 className="text-xl font-bold  text-[#5524B7] mb-12">Profile</h2>
//       {profilePic && (
//         <img
//           src={profilePic}
//           alt="Profile"
//           className="w-50 h-50 rounded-full object-cover mx-auto mb-4"
//         />
//       )}
//       <h2 className="text-xl font-bold mb-2 text-[#5524B7]">{displayName}</h2>
//       <p className="text-gray-700">{email}</p>
//     </div>
//   );
// };

// export default Profile;


// import React, { useState, useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import { getAuth, updateProfile } from "firebase/auth";
// import axios from "axios";
// import { FaImage } from "react-icons/fa";

// const Profile = () => {
//   const axiosSecure = useAxiosSecure();
//   const { data: profile = {}, isLoading } = useQuery({
//     queryKey: ["profile"],
//     queryFn: async () => {
//       const res = await axiosSecure.get("/users/profile");
//       return res.data;
//     },
//   });

//   const auth = getAuth();
//   const user = auth.currentUser;

//   const [name, setName] = useState(user?.displayName || "");
//   const [pic, setPic] = useState(user?.photoURL || "");
//   const [uploading, setUploading] = useState(false);
//   const [success, setSuccess] = useState("");

//   useEffect(() => {
//     setName(user?.displayName || "");
//     setPic(user?.photoURL || "");
//   }, [user]);

//   const handleImageUpload = async (e) => {
//     const image = e.target.files[0];
//     if (!image) return;
//     setUploading(true);
//     const formData = new FormData();
//     formData.append("image", image);
//     const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
//     const res = await axios.post(imagUploadUrl, formData);
//     setPic(res.data.data.url);
//     setUploading(false);
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     if (!auth.currentUser) return;
//     await updateProfile(auth.currentUser, {
//       displayName: name,
//       photoURL: pic,
//     });
//     setSuccess("Profile updated!");
//     setTimeout(() => setSuccess(""), 2000);
//     window.location.reload();
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center min-h-[40vh]">
//         <span className="loading loading-bars loading-xl text-primary"></span>
//       </div>
//     );

//   const email = profile.email || user?.email || "";

//   if (!email) {
//     return (
//       <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center">
//         <h2 className="text-xl font-bold mb-2 text-[#5524B7]">Profile</h2>
//         <p className="text-gray-700">Not logged in</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-sm w-full mx-auto mt-10 p-8 bg-base-100 rounded-xl shadow-lg text-center">
//       <h2 className="text-2xl font-bold text-[#5524B7] mb-6">Profile</h2>
//       <form onSubmit={handleUpdate} className="space-y-4">
//         <div className="avatar flex justify-center mb-4">
//           <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden mx-auto">
//             <img
//               src={pic}
//               alt="Profile"
//               className="object-cover w-full h-full"
//             />
//           </div>
//         </div>
//         <label className="label flex items-center gap-2 justify-center">
//           <FaImage className="text-[#5524B7] text-lg" />
//           Change Profile Picture
//         </label>
//         <div className="relative mb-2">
//           <input
//             type="file"
//             onChange={handleImageUpload}
//             className="file-input file-input-bordered w-full pl-10"
//             accept="image/*"
//             disabled={uploading}
//           />
//           <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5524B7] pointer-events-none" />
//         </div>
//         <input
//           type="text"
//           className="input input-bordered w-full"
//           placeholder="Your Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <button
//           className="btn btn-primary w-full"
//           type="submit"
//           disabled={uploading}
//         >
//           {uploading ? "Uploading..." : "Update Profile"}
//         </button>
//         {success && <div className="text-green-600">{success}</div>}
//       </form>
//       <h2 className="text-xl font-bold mt-6 mb-2 text-[#5524B7]">{name}</h2>
//       <p className="text-gray-700 break-all">{email}</p>
//       <div className="badge badge-info badge-outline mt-4">User Profile</div>
//     </div>
//   );
// };

// export default Profile;


import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { getAuth, updateProfile } from "firebase/auth";
import axios from "axios";
import { FaImage } from "react-icons/fa";

const Profile = () => {
  const axiosSecure = useAxiosSecure();
  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/profile");
      return res.data;
    },
  });

  const auth = getAuth();
  const user = auth.currentUser;

  const [name, setName] = useState(user?.displayName || "");
  const [pic, setPic] = useState(user?.photoURL || "");
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setName(user?.displayName || "");
    setPic(user?.photoURL || "");
  }, [user]);

  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("image", image);
    const imagUploadUrl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`;
    const res = await axios.post(imagUploadUrl, formData);
    setPic(res.data.data.url);
    setUploading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: pic,
    });
    await auth.currentUser.reload();
    setSuccess("Profile updated!");
    setTimeout(() => setSuccess(""), 2000);
  };

  const handleRemovePic = async () => {
    if (!auth.currentUser) return;
    await updateProfile(auth.currentUser, {
      photoURL: "",
    });
    await auth.currentUser.reload();
    setPic("");
    setSuccess("Profile picture removed!");
    setTimeout(() => setSuccess(""), 2000);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <span className="loading loading-bars loading-xl text-primary"></span>
      </div>
    );

  const email = profile.email || user?.email || "";

  if (!email) {
    return (
      <div className="max-w-sm mx-auto mt-10 p-6 bg-white rounded-xl shadow text-center">
        <h2 className="text-xl font-bold mb-2 text-[#5524B7]">Profile</h2>
        <p className="text-gray-700">Not logged in</p>
      </div>
    );
  }

  return (
    <div className="max-w-sm w-full mx-auto mt-10 p-2 bg-base-100 rounded-xl shadow-lg text-center">
      <h2 className="text-4xl font-bold  mb-6">Profile</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="avatar flex justify-center mb-4">
          <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden mx-auto">
            <img
              src={
                pic ||
                "https://ui-avatars.com/api/?name=" +
                  encodeURIComponent(name)
              }
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        {/* Show name and email just below the picture */}
        <h2 className="text-xl font-bold mb-1 ">{name}</h2>
        <p className="  break-all mb-10">{email}</p>
        <label className="label flex items-center gap-2 justify-center">
          <FaImage className="text-[#5524B7] text-lg" />
          Change Profile Picture
        </label>
        <div className="relative mb-2">
          <input
            type="file"
            onChange={handleImageUpload}
            className="file-input file-input-bordered w-full pl-10"
            accept="image/*"
            disabled={uploading}
          />
          <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-[#5524B7] pointer-events-none" />
        </div>
        {pic && (
          <button
            className="btn btn-error w-full"
            type="button"
            onClick={handleRemovePic}
            disabled={uploading}
          >
            Remove Profile Picture
          </button>
        )}
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          className="btn btn-primary w-full"
          type="submit"
          disabled={uploading}
        >
          {uploading ? "Uploading..." : "Update Profile"}
        </button>
        {success && <div className="text-green-600">{success}</div>}
      </form>
      <div className="badge badge-info badge-outline mt-4">User Profile</div>
    </div>
  );
};

export default Profile;