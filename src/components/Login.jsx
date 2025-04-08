import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        { emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/signup`,
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-base-200">
    <div className="card card-side bg-base-100 shadow-2xl max-w-4xl w-full flex-col md:flex-row rounded-2xl overflow-hidden">
  
      {/* Left side image (hidden on mobile) */}
      <figure className="md:w-1/2 hidden md:block bg-white">
        <img
          src="https://img.freepik.com/free-vector/confirmed-concept-illustration_114360-545.jpg?t=st=1744117878~exp=1744121478~hmac=8601d7dd3d75a5eee8c6d81002ae1b552fb4b461fd42546b94a75bbfbcf75544&w=900"
          alt="Login Visual"
          className="object-cover h-full w-full"
        />
      </figure>
  
      {/* Right side form */}
      <div className="card-body w-full md:w-1/2 p-6 md:p-10 text-center bg-base-300">
        <h2 className="text-3xl font-extrabold mb-6 text-primary">
          {isLoginForm ? "Login" : "Sign Up"}
        </h2>
  
        <div className="space-y-5 text-left">
          {!isLoginForm && (
            <>
              <label className="form-control w-full">
                <span className="label-text font-semibold">First Name</span>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full bg-base-100"
                />
              </label>
              <label className="form-control w-full">
                <span className="label-text font-semibold">Last Name</span>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full bg-base-100"
                />
              </label>
            </>
          )}
  
          <label className="form-control w-full">
            <span className="label-text font-semibold">Email ID</span>
            <input
              type="email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="input input-bordered w-full bg-base-100"
            />
          </label>
  
          <label className="form-control w-full">
            <span className="label-text font-semibold">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full bg-base-100"
            />
          </label>
        </div>
  
        {error && (
          <p className="bg-red-100 text-red-600 border border-red-300 rounded-md p-2 text-sm font-medium mt-4">
            {error}
          </p>
        )}
  
        <div className="card-actions justify-center pt-6">
          <button
            className="btn btn-primary w-full text-white font-semibold text-lg transition-transform hover:scale-[1.02]"
            onClick={isLoginForm ? handleLogin : handleSignup}
          >
            {isLoginForm ? "Login" : "Sign Up"}
          </button>
        </div>
  
        <p
          className="font-semibold mt-5 text-sm md:text-base text-primary cursor-pointer hover:underline"
          onClick={() => setIsLoginForm((prev) => !prev)}
        >
          {isLoginForm ? "New here? Sign Up" : "Already a user? Log In"}
        </p>
      </div>
    </div>
  </div>
  
   

  );
};

export default Login;
