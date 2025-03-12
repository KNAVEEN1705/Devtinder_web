import axios from "axios"
import React, { useEffect } from "react"
import { BASE_URL } from "../utils/constant"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice"
import { useNavigate } from "react-router-dom"
import UserCard from "./UserCard"

const Feed = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
const feed = useSelector((store) => store.feed);

const fetchUser = async () => {
  if (feed) return;
  try {
    const res = await axios.get(`${BASE_URL}/feed`, {
      withCredentials: true, 
    });
    dispatch(addFeed(res.data));
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

  return feed && (
    <div className="flex justify-center my-10 ">
      <UserCard user={feed[0]}/>
    </div>
  )
}

export default Feed