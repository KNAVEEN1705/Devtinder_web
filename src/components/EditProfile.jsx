import React, { useState } from 'react';
import UserCard from "./UserCard";
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender || "");
  const [photoURL, setPhotoURL] = useState(user.photoURL || "");
  const [about, setAbout] = useState(user.about || "");
  const [age, setAge] = useState(user.age || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const SaveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, age, gender, photoURL, about },
        { withCredentials: true }
      );

      dispatch(addUser(res.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 my-10 px-4">
        {/* Profile Edit Form */}
        <div className="card bg-base-200 w-full max-w-xs sm:max-w-md shadow-xl p-6 rounded-lg">
          <div className="card-body">
            <h2 className="card-title text-center font-bold text-2xl">Edit Profile</h2>

            <label className="form-control w-full">
              <span className="label-text font-semibold text-lg">First Name</span>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text font-semibold text-lg">Last Name</span>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text font-semibold text-lg">Gender</span>
              <input
                type="text"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text font-semibold text-lg">Age</span>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text font-semibold text-lg">About</span>
              <textarea
                className="textarea textarea-bordered h-24 w-full"
                placeholder="Tell us about yourself..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text font-semibold text-lg">Photo URL</span>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>

            <p className="text-sm text-gray-400 mt-1">Must be a valid image URL.</p>

            <p className="font-semibold text-red-600">{error}</p>

            <div className="card-actions justify-center p-2">
              <button
                className="btn bg-blue-500 hover:bg-blue-600 text-white font-semibold w-full"
                onClick={SaveProfile}
              >
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="flex justify-center w-full sm:w-auto mx-10">
          <UserCard user={{ firstName, lastName, age, gender, photoURL, about, skills: user.skills || [] }} />
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md shadow-md">
          Profile Saved Successfully.
        </div>
      )}
    </>
  );
};

export default EditProfile;
