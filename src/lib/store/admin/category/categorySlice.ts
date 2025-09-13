import { Status } from "@/lib/global-type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategoryData, ICategorySliceState } from "./category-slice-type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWithToken";

const initialState:ICategorySliceState={
    category:[],
    status:Status.IDLE
}

const categorySlice=createSlice({
    name:"categorySlice",
    initialState,
    reducers:{
        setCategory(state:ICategorySliceState,action:PayloadAction<ICategoryData[]>){
            state.category=action.payload
        },

        setStatus(state:ICategorySliceState,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const {setCategory,setStatus}=categorySlice.actions
export default categorySlice.reducer

//fetchCategory
export function fetchCategory(){
    return async function fetchCategoryThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.get("category")
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setCategory(response.data.data))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
        
    }
}

//createCategory
export function createCategory(categoryData:ICategoryData){
    return async function createCategoryThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.post("category",categoryData)
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchCategory())
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}


// updateCategory
export function updateCategory({ id, categoryData }: { id: string; categoryData: ICategoryData }) {
  return async function updateCategoryThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.IDLE))
    try {
      const response = await APIWITHTOKEN.patch("category/"+id, categoryData);
      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(fetchCategory()); // Refresh data
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//deleteCategpry
export function deleteCategory(id:string){
    return async function deleteCategoryThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response=await APIWITHTOKEN.delete("category/"+id)
            if(response.status===200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(fetchCategory())
            }else{
                dispatch(setStatus(Status.ERROR))
            }
        } catch (error) {
            console.log(error)
            dispatch(setStatus(Status.ERROR))
        }
    }
}