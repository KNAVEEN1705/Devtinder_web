import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {

  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const userData= useSelector((store)=>store.user)
  // const fetchUser = async () => {
  //   if(userData) return ;
  //   try {
  //     const res = await axios.get(`${BASE_URL}/profile/view`, {
  //       withCredentials: true, 
  //     });
  //     dispatch(addUser(res.data));
  //   } catch (err) {
  //     if(err.status===401){
  //     navigate("/login")}
  //     console.error("Fetch User Error:", err);
  //   }
  // };
  
  // useEffect(()=>{
   
  //   fetchUser();
  // },[])
  const dispatch = useDispatch();
const navigate = useNavigate();
const userData = useSelector((store) => store.user);

const fetchUser = async () => {
  if (userData && Object.keys(userData).length > 0) return;
  try {
    const res = await axios.get(`${BASE_URL}/profile/view`, {
      withCredentials: true, 
    });
    dispatch(addUser(res.data));
  } catch (err) {
    if (err.response && err.response.status === 401) {
      navigate("/login");
    }
    console.error("Fetch User Error:", err);
  }
};

useEffect(() => {
  fetchUser();
}, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
