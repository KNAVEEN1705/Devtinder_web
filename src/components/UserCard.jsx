import axios from 'axios';
import React from 'react'
import { BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({user}) => {
    const{_id,firstName,lastName,photoURL,about,skills,age,gender}=user;

    const dispatch = useDispatch();
    const handleFeed = async (status,userId)=>{

      try{
        const res = await axios.post(`${BASE_URL}/request/sent/${status}/${userId}`, {}, { withCredentials: true });

        dispatch(removeUserFromFeed(userId))
      }
      catch(err){
        //
      }
    }
     
    if(!user) return ;
  return user && (
    <div className="card bg-base-300 w-96 shadow-sm mb-10">
    <figure>
      <img
      className='w-52 px-2 py-2 rounded-full'
        src={photoURL}
        alt="photo" />
    </figure>
    <div className="card-body my-10">
      <h2 className="card-title">{firstName+" "+ lastName}</h2>
      <p className="text-white font-semibold">{about}</p>
        {age && gender && <p className="text-sm text-white">{`${age} - ${gender}`}</p>}
        <div className="flex flex-wrap gap-2 w-80 p-2">
        {skills.map((skill, index) => (
         <span key={index} className="bg-gray-200 px-2 py-1 rounded-md text-sm text-black">
         {skill}
        </span>
  ))}
</div>
      <div className="card-actions flex justify-center my-5">
        <button className="btn bg-red-400 text-black font-semibold"onClick={()=>handleFeed("ignore",_id)}>Ignore😒</button>
        <button className="btn  bg-green-500 text-black font-semibold"onClick={()=>handleFeed("interested",_id)}>Interested 🙋🏼</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard