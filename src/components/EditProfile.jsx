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
  <div className="flex flex-col sm:flex-row justify-center items-start gap-8 sm:gap-6 my-10 px-4">
  {/* Profile Edit Form */}
  <div className="card bg-base-200 w-full max-w-sm sm:max-w-md shadow-xl p-6 rounded-xl">
    <div className="card-body space-y-4">
      <h2 className="card-title text-center font-bold text-2xl text-primary">Edit Profile</h2>

      <label className="form-control w-full">
        <span className="label-text font-semibold text-sm sm:text-base">First Name</span>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="input input-bordered w-full"
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text font-semibold text-sm sm:text-base">Last Name</span>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="input input-bordered w-full"
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text font-semibold text-sm sm:text-base">Gender</span>
        <input
          type="text"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="input input-bordered w-full"
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text font-semibold text-sm sm:text-base">Age</span>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="input input-bordered w-full"
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text font-semibold text-sm sm:text-base">About</span>
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          placeholder="Tell us about yourself..."
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />
      </label>

      <label className="form-control w-full">
        <span className="label-text font-semibold text-sm sm:text-base">Photo URL</span>
        <input
          type="text"
          value={photoURL}
          onChange={(e) => setPhotoURL(e.target.value)}
          className="input input-bordered w-full"
        />
      </label>
      <p className="text-xs text-gray-400 mt-1">Must be a valid image URL</p>

      {error && <p className="font-semibold text-red-600 text-sm">{error}</p>}

      <div className="card-actions pt-2">
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
  <div className="w-full sm:w-1/3 flex justify-center">
    <UserCard
      user={{
        firstName,
        lastName,
        age,
        gender,
        photoURL,
        about,
        skills: user.skills || [],
      }}
    />
  </div>
</div>

{/* Toast Notification */}
{showToast && (
  <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-sm px-6 py-2 rounded-full shadow-lg z-50 animate-bounce">
    ✅ Profile Saved Successfully!
  </div>
)}

  </>
  );
};

export default EditProfile;
