import { Status } from "@/lib/global-type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMenuData, IMenuSliceState } from "./menu-slice-type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWithToken";

const initialState:IMenuSliceState={
    menu:[],
    status:Status.IDLE
}

const menuSlice=createSlice({
    name:"menu",
    initialState,
    reducers:{
        setMenu(state:IMenuSliceState,action:PayloadAction<IMenuData[]>){
            state.menu=action.payload
        },

        setStatus(state:IMenuSliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const{setMenu,setStatus}=menuSlice.actions
export default menuSlice.reducer

//fetch menu
export function fetchMenu(){
    return async function fetchMenuThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get("menu")
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setMenu(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
    } catch (error) {
        console.log(error)
        dispatch(setStatus(Status.ERROR))
    }
    }
    
}

//add menu
export function addMenu(menuData:IMenuData){
    return async function addMenuThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.post("menu",menuData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            if(response.status===200 || response.status==201){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchMenu())
            }else{
                dispatch(setStatus(Status.ERROR))
            }
    } catch (error) {
        console.log(error)
        dispatch(setStatus(Status.ERROR))
    }
    }
    
}

//edit menu
export function editMenu(editMenuData:IMenuData,id:number){
    return async function editMenuThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.patch("menu/"+id,editMenuData,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            if(response.status===200 || response.status==201){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchMenu())
            }else{
                dispatch(setStatus(Status.ERROR))
            }
    } catch (error) {
        console.log(error)
        dispatch(setStatus(Status.ERROR))
    }
    }
    
}

//delete menu
export function deleteMenu(id:number){
    return async function deleteMenuThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.delete("menu/"+id)
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchMenu())
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}