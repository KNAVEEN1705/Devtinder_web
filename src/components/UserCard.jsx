import React from 'react'

const UserCard = ({user}) => {
    const{firstName,lastName,photoURL,about,skills,age,gender}=user;
       
  return user && (
    <div className="card bg-base-300 w-96 shadow-sm">
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
        <button className="btn bg-red-400 text-black font-semibold">Ignore😒</button>
        <button className="btn  bg-green-500 text-black font-semibold">Interested 🙋🏼</button>
      </div>
    </div>
  </div>
  )
}

export default UserCard