import axios from 'axios';
import React from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoURL, about, skills, age, gender } = user;
    const dispatch = useDispatch();

    const handleFeed = async (status, userId) => {
        try {
            await axios.post(`${BASE_URL}/request/sent/${status}/${userId}`, {}, { withCredentials: true });
            dispatch(removeUserFromFeed(userId));
        } catch (err) {
            // Handle error
        }
    };

    if (!user) return null;

    return (
        <div className="card bg-base-300 max-w-sm sm:w-96 shadow-sm mb-10 mx-auto">
            <figure className="flex justify-center pt-4">
                <img
                    className="w-32 sm:w-52 px-2 py-2 rounded-full object-cover"
                    src={photoURL}
                    alt="User"
                />
            </figure>
            <div className="card-body my-6 text-center">
                <h2 className="card-title text-lg sm:text-xl">{firstName + " " + lastName}</h2>
                <p className="text-white font-semibold text-sm sm:text-base">{about}</p>
                {age && gender && (
                    <p className="text-xs sm:text-sm text-white">{`${age} - ${gender}`}</p>
                )}

                {/* Skills List */}
                <div className="flex flex-wrap justify-center gap-2 p-2">
                    {skills.map((skill, index) => (
                        <span key={index} className="bg-gray-200 px-2 py-1 rounded-md text-xs sm:text-sm text-black">
                            {skill}
                        </span>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="card-actions flex flex-col sm:flex-row justify-center gap-2 my-4">
                    <button className="btn bg-red-400 text-black font-semibold w-full sm:w-auto" onClick={() => handleFeed("ignore", _id)}>
                        Ignore 😒
                    </button>
                    <button className="btn bg-green-500 text-black font-semibold w-full sm:w-auto" onClick={() => handleFeed("interested", _id)}>
                        Interested 🙋🏼
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
