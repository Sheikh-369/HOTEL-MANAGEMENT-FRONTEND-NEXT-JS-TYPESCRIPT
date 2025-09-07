import { Status } from "@/lib/global-type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthSliceState, IUserRegisterData } from "./authSliceType";
import { RegisterData } from "@/app/auth/global/register/page";
import { AppDispatch } from "../store";
import API from "@/lib/http/API";
import { ILgiinData } from "@/app/auth/global/login/page";

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
        },

        //used in redirecting after success or error(with reducers)
        resetStatus(state: IAuthSliceState) {
            state.status = Status.IDLE;
        }

    }
})

export const{setUser,setStatus,setMessage,resetStatus}=authSlice.actions
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

export function userLogin(loginData:ILgiinData) {
    return async function userLoginThunk(dispatch: AppDispatch) {
        dispatch(setStatus(Status.LOADING));
        dispatch(setMessage(null));

        try {
                const response = await API.post("auth/login",loginData);

                dispatch(setStatus(Status.SUCCESS));
                dispatch(setMessage(response.data.message)); // backend success message
            } catch (error: any) {
            dispatch(setStatus(Status.ERROR));
            dispatch(setMessage(error.response?.data?.message || "Network/servererror"));
        }
    };
}
