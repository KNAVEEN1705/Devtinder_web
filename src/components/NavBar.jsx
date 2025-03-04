import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom";

const NavBar = () => {
  const user = useSelector(store=>store.user);

  return (
    <div className="navbar bg-base-300">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
  </div>

  {user && (<div className="flex-none gap-2">
    <div className="font-semibold">Welcome!👋 {user.firstName}</div>
  <div className="dropdown dropdown-end mx-5 ">
      
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={"https://media.istockphoto.com/id/639695818/photo/photographer-workplace.webp?a=1&b=1&s=612x612&w=0&k=20&c=nbW3PZXa0XzuBG4z3pt7h3LvQRb5HI8wLnvDs2TWRgA="} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>)}
</div>
  )
}

export default NavBar