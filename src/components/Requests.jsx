import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, removeRequest } from '../utils/requestSlice'

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const [error, setError] = useState("");

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(`${BASE_URL}/request/review/${status}/${_id}`, {}, { withCredentials: true });
      dispatch(removeRequest(_id));
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/received", { withCredentials: true });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!Array.isArray(requests) || requests.length === 0) {
    return <h1 className="text-center text-2xl font-bold mt-10">No Connection Found</h1>;
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[80vh] mt-4">

      <div className="space-y-6 px-4 sm:px-10 w-full max-w-4xl">
        <h1 className="text-center text-2xl font-bold">Connection Requests</h1>
        {error && <p className="text-red-600 text-center">{error}</p>}

        {requests.map((request) => {
          const { _id, firstName, lastName, age, about, skills, gender, photoURL } = request.fromUserId;

          return (
            <div key={_id} className="card bg-base-300 shadow-lg rounded-lg p-5 flex flex-col sm:flex-row items-center sm:items-start w-full">
              {/* Profile Image */}
              <figure className="w-32 h-32 flex-shrink-0">
                <img
                  src={photoURL || 'https://via.placeholder.com/150'}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </figure>

              {/* Card Body */}
              <div className="card-body w-full mt-4 sm:mt-0 sm:ml-5">
                <h2 className="card-title text-xl font-semibold text-center sm:text-left">
                  {firstName} {lastName}
                </h2>
                <p className="text-gray-700 text-center sm:text-left"><strong>Age:</strong> {age}</p>
                <p className="text-gray-700 text-center sm:text-left"><strong>Gender:</strong> {gender}</p>
                <p className="text-gray-700 text-center sm:text-left">
                  <strong>About:</strong> {about || 'No description provided.'}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 w-full mt-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="bg-gray-200 px-3 py-1 rounded-md text-sm text-black">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-center sm:justify-end items-center mt-4">
                  <button className="btn btn-primary mx-2" onClick={() => reviewRequest("accepted", request._id)}>Accept</button>
                  <button className="btn btn-secondary mx-2" onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Requests;
