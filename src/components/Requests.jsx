import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import {addRequests} from '../utils/requestSlice'

const Requests = () => {

    const dispatch = useDispatch();
    const requests = useSelector((store)=> store.requests)
     const [error, setError] = useState("");
    const fetchRequests = async()=>{

       try{ 
        const res = await axios.get(BASE_URL + "/user/request/received",{withCredentials:true})
        dispatch(addRequests(res.data.data))

    }catch(err){
      setError(err.response ? err.response.data : err.message);
    }
    }

    useEffect(()=>{
        fetchRequests()
    },[])
    if (!Array.isArray(requests) || requests.length === 0) {
      return <h1>No Connection Found</h1>;
    }
  
    return (
      <div className="flex justify-center items-center min-h-screen mt-5 mb-5">
        <div className="space-y-4 px-10 w-full max-w-4xl">
          <h1 className='text-center text-2xl font-bold'>Connection Requests</h1>
          {error && <p className="text-red-600">{error}</p>}
          {requests.map((request) => {
            const { _id, firstName, lastName, age, about, skills, gender, photoURL } = request.fromUserId;
    
            return (
  
              <div key={_id} className="card card-side bg-base-300 shadow-sm px-5  w-full">
             
                <figure>
                  <img
                    src={photoURL || 'https://via.placeholder.com/150'}
                    alt={`${firstName} ${lastName}`}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                </figure>
                <div className="card-body ">
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
                  <div className='flex justify-end items-center '>
                  <button className="btn btn-primary mx-2">Accept</button>
                  <button className="btn btn-secondary mx-2">Reject</button>
                  </div>
                  
                </div>
               
              </div>
            );
          })}
        </div>
        
      </div>
    );
    
}

export default Requests