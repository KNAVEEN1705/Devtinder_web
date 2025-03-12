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
      console.log("Fetched Connections:", res.data.data);
      dispatch(addConnection(res.data.data));
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!Array.isArray(connections) || connections.length === 0) {
    return <h1>No Connection Found</h1>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen mt-5">
      <div className="space-y-4 px-10 w-full max-w-4xl">
        <h1 className='text-center text-2xl font-bold'>Connections</h1>
        {error && <p className="text-red-600">{error}</p>}
        {connections.map((connection) => {
          const { _id, firstName, lastName, age, about, skills, gender, photoURL } = connection;
  
          return (

            <div key={_id} className="card card-side bg-base-300 shadow-sm px-5 w-full">
           
              <figure>
                <img
                  src={photoURL || 'https://via.placeholder.com/150'}
                  alt={`${firstName} ${lastName}`}
                  className="w-32 h-32 object-cover rounded-lg"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl">
                  {firstName} {lastName}
                </h2>
                <p><strong>Age:</strong> {age}</p>
                <p><strong>Gender:</strong> {gender}</p>
                <p><strong>About:</strong> {about || 'No description provided.'}</p>
                <div className="flex flex-wrap gap-2 w-80 p-2">
                  {skills.map((skill, index) => (
                    <span key={index} className="bg-gray-200 px-2 py-1 rounded-md text-sm text-black">
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
