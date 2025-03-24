import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addConnection } from '../utils/connectionSlice';

const Connection = () => {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnection = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnection(res.data.data));
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!Array.isArray(connections) || connections.length === 0) {
    return <h1 className="text-center mt-10 text-xl font-semibold">No Connection Found</h1>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen mt-5 mb-10 pb-6">
      <div className="space-y-4 px-4 sm:px-10 w-full max-w-4xl">
        <h1 className="text-center text-2xl font-bold">Connections</h1>
        {error && <p className="text-red-600">{error}</p>}
        {connections.map((connection) => {
          const { _id, firstName, lastName, age, about, skills, gender, photoURL } = connection;

          return (
            <div
              key={_id}
              className="card card-side bg-base-300 shadow-md flex flex-col sm:flex-row items-center sm:items-start px-5 py-4 w-full rounded-lg"
            >
              {/* Profile Image */}
              <figure className="w-32 h-32 flex-shrink-0">
                <img
                  src={photoURL || 'https://via.placeholder.com/150'}
                  alt={`${firstName} ${lastName}`}
                  className="w-full h-full object-cover rounded-lg"
                />
              </figure>

              {/* Card Body */}
              <div className="card-body w-full">
                <h2 className="card-title text-xl font-semibold text-center sm:text-left">
                  {firstName} {lastName}
                </h2>
                <p className="text-white-300 text-center sm:text-left"><strong>Age:</strong> {age}</p>
                <p className="text-white-300 text-center sm:text-left"><strong>Gender:</strong> {gender}</p>
                <p className="text-white-300 text-center sm:text-left">
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connection;
