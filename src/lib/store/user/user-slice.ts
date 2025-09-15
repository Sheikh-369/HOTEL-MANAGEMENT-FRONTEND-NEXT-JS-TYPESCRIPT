import { Status } from "@/lib/global-type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserData, IUserSliceState } from "./user-slice-type";
import { AppDispatch } from "../store";
import APIWITHTOKEN from "@/lib/http/APIWithToken";

const initialState:IUserSliceState={
    user:[],
    status:Status.IDLE
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        setUsers(state:IUserSliceState,action:PayloadAction<IUserData[]>){
            state.user=action.payload
        },

        setStatus(state:IUserSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const{setUsers,setStatus}=userSlice.actions
export default userSlice.reducer

//fetch users
export function fetchUsers(){
    return async function fetchUsersThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get("auth/users")
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setUsers(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}