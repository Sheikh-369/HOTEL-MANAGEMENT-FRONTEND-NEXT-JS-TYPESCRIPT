import { Status } from "@/lib/global-type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IReservationData, IReservationSliceStatus } from "./reservation=slice-type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWithToken";

const initialState:IReservationSliceStatus={
    reservation:[],
    status:Status.IDLE
}

const reservationSlice=createSlice({
    name:"reservation",
    initialState,
    reducers:{
        setReservation(state:IReservationSliceStatus,action:PayloadAction<IReservationData[]>){
            state.reservation=action.payload
        },

        setStatus(state:IReservationSliceStatus,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const{setReservation,setStatus}=reservationSlice.actions
export default reservationSlice.reducer

//fetch reservation
export function fetchReservations(){
    return async function fetchReservationsThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get("reservation")
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setReservation(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
    } catch (error) {
        console.log(error)
        dispatch(setStatus(Status.ERROR))
    }
    }
    
}

//create reservation
export function createReservation(reservationData:IReservationData){
    return async function createReservationsThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.post("reservation",reservationData)
            if(response.status===200 || response.status===201){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchReservations())
            }else{
                dispatch(setStatus(Status.ERROR))
            }
    } catch (error) {
        console.log(error)
        dispatch(setStatus(Status.ERROR))
    }
    }
    
}

//update reservation
export function editReservations(editReservationData:IReservationData,id:number){
    return async function editReservationsThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.patch("reservation/"+id,editReservationData)
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setReservation(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
    } catch (error) {
        console.log(error)
        dispatch(setStatus(Status.ERROR))
    }
    }
    
}

//cancel reservarion
export function deleteReservations(id:number){
    return async function deleteReservationsThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.delete("reservation/"+id)
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setReservation(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
    } catch (error) {
        console.log(error)
        dispatch(setStatus(Status.ERROR))
    }
    }
    
}