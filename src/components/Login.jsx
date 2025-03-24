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
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="card bg-base-100 image-full w-full max-w-md shadow-xl p-5 md:p-4">
        <figure>
          <img
            className="opacity-30"
            src="https://cdn.pixabay.com/photo/2022/12/10/13/46/attack-7647136_1280.png"
            alt="login"
          />
        </figure>
        <div className="card-body text-center">
          <h2 className="card-title font-bold text-2xl md:text-3xl mb-4">
            {isLoginForm ? "Login" : "Sign Up"}
          </h2>
          <div className="space-y-4 text-left">
            {!isLoginForm && (
              <>
                <label className="form-control w-full">
                  <span className="label-text font-semibold text-lg">First Name</span>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </label>
                <label className="form-control w-full">
                  <span className="label-text font-semibold text-lg">Last Name</span>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="input input-bordered w-full"
                  />
                </label>
              </>
            )}
            <label className="form-control w-full">
              <span className="label-text font-semibold text-lg">Email ID</span>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text font-semibold text-lg">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered w-full"
              />
            </label>
          </div>
          <p className="text-red-600 font-semibold text-sm mt-2">{error}</p>
          <div className="card-actions justify-center p-2">
            <button
              className="btn btn-primary w-full text-white font-semibold text-lg"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Sign Up"}
            </button>
          </div>
          <p
            className="font-bold cursor-pointer mt-3 text-sm md:text-base"
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
