import { createSlice } from "@reduxjs/toolkit";
import { remove } from "dom/lib/mutation";

const useSlice = createSlice({
    name:"user",
    initialState: null,
    reducers:{
        addUser:(state,action)=>{
            return action.payload;
        },
        removeUser:(state,action)=>{
            return null;
        }
    }
})

export const{addUser,removeUser}=useSlice.actions
export default useSlice.reducer;