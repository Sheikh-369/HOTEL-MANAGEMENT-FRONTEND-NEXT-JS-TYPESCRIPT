import { Status } from "@/lib/global-type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthSliceState, IUserRegisterData } from "./authSliceType";
import { RegisterData } from "@/app/auth/global/register/page";
import { AppDispatch } from "../store";
import API from "@/lib/http/API";

const initialState:IAuthSliceState={
    user:{
        userName:"",
        userEmail:"",
        phoneNumber:"",
        password:"",
        confirmPassword:""
    },
    status:Status.IDLE,
    message:null
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUser(state:IAuthSliceState,action:PayloadAction<IUserRegisterData>){
            state.user=action.payload
        },

        setStatus(state:IAuthSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        },

        setMessage(state:IAuthSliceState,action:PayloadAction<string 
            | null>){
                state.message=action.payload
            }
    }
})

const{setUser,setStatus,setMessage}=authSlice.actions
export default authSlice.reducer

export function userRegister(registerData:RegisterData){
    return async function userRegisterThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING));
 		dispatch(setMessage(null));
        try {
            const response=await API.post("auth/register",registerData)
            if(response.status===200 || response.status === 201){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setMessage(response.data.message)); // backend success messag
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error:any) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
            dispatch(setMessage(error.response?.data?.message || "Network/servererror"));
        }
    }
}