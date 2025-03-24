import axios from "axios";
import React from "react";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constant";
const Login = () => {

        const [emailId,setEmailId]=useState("");
        const [password,setPassword]= useState("");
        const [isLoginForm, setIsLoginForm] = useState(true)
        const [firstName,setFirstName] = useState("");
        const [lastName,setLastName] = useState("");

        const navigate =useNavigate();
        const dispatch= useDispatch();

        const [error,setError]=useState("")

        const handleLogin = async () => {
          try {
            const res = await axios.post(
              `${BASE_URL}/login`,
              { emailId, password }, // Payload
              { withCredentials: true } // Important for authentication
            );
            dispatch(addUser(res.data));
            navigate("/"); 
          } catch (err) {
            setError(err.response ? err.response.data : err.message)
          }
        };

        const handleSignup = async ()=>{

          try{
            const res = await axios.post(`${BASE_URL}/signup`,
              {firstName,lastName,emailId,password},
              {withCredentials:true});
              console.log(res.data.data)
              dispatch(addUser(res.data.data));
              navigate("/profile")
          }
          catch(err){
            setError(err.response ? err.response.data : err.message)
          }
        }
        

    return (
      <div className="flex justify-center my-10 ">
        <div className="card bg-base-100 image-full w-96 shadow-xl">
          <figure>
            <img
              className="opacity-30"
              src="https://cdn.pixabay.com/photo/2022/12/10/13/46/attack-7647136_1280.png"
              alt="login"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title justify-center font-bold text-2xl">{isLoginForm ? "Login" : "Sign UP"}</h2>
            <div>
            {!isLoginForm && <><label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-semibold text-lg">FirstName</span>
                </div>
                <input 
                type="text" 
                value={firstName}
                onChange={(e)=>setFirstName (e.target.value)}
                className="input input-bordered w-full max-w-xs" />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-semibold text-lg">LastName</span>
                </div>
                <input 
                type="text" 
                value={lastName}
                onChange={(e)=>setLastName (e.target.value)}
                className="input input-bordered w-full max-w-xs" />
              </label></>}
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text font-semibold text-lg">Email ID</span>
                </div>
                <input 
                type="text" 
                value={emailId}
                onChange={(e)=>setEmailId (e.target.value)}
                className="input input-bordered w-full max-w-xs" />
              </label>
              <label className="form-control w-full max-w-xs mt-4">
                <div className="label">
                  <span className="label-text font-semibold text-lg">Password</span>
                </div>
                <input 
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                className="input input-bordered w-full max-w-xs" />
              </label>
            </div>
            <p className="font-semibold text-red-600">{error}</p>
            <div className="card-actions justify-center p-2">
              <button className="btn btn-primary text-white font-semibold text-sm"onClick={isLoginForm ? handleLogin : handleSignup}>
                {isLoginForm ?"Login" : "SignUp"}
              </button>
            </div>
            <p className="m-auto font-bold cursor-pointer"onClick={()=>setIsLoginForm(value => !value)}>
              {isLoginForm ? "New here? Sign Up" :"Already a user? Log In"}
            </p>
          </div>
        </div>
      </div>
    );
  };
  
  export default Login;
  