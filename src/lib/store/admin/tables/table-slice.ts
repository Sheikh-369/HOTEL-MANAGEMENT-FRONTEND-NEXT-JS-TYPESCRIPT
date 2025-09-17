import { Status } from "@/lib/global-type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITableData, ITableInitialStatus } from "./table-slice-type";
import { AppDispatch } from "../../store";
import APIWITHTOKEN from "@/lib/http/APIWithToken";

const initialState:ITableInitialStatus={
    table:[],
    status:Status.IDLE
}

const tableSlice=createSlice({
    name:"table",
    initialState,
    reducers:{
        setTable(state:ITableInitialStatus,action:PayloadAction<ITableData[]>){
            state.table=action.payload
        },

        setStatus(state:ITableInitialStatus,action:PayloadAction<Status>){
            state.status=action.payload
        }
    }
})

export const {setTable,setStatus}=tableSlice.actions
export default tableSlice.reducer

//fetch tables
export function fetchTables() {
  return async function fetchTablesThunk(dispatch: AppDispatch) {
    dispatch(setStatus(Status.LOADING));
    try {
      const response = await APIWITHTOKEN.get("/restaurant-table");

      if (response.status === 200) {
        dispatch(setStatus(Status.SUCCESS));
        dispatch(setTable(response.data.data)); //action creator
      } else {
        dispatch(setStatus(Status.ERROR));
      }
    } catch (error) {
      console.error(error);
      dispatch(setStatus(Status.ERROR));
    }
  };
}

//add tables
export function addTable(tableData:ITableData){
  return async function addTableThunk(dispatch:AppDispatch){
    dispatch(setStatus(Status.LOADING))
    try {
      const response=await APIWITHTOKEN.post("restaurant-table",tableData)
      if(response.status===200 || response.status === 201){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(fetchTables())
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    } catch (error) {
      console.log(error)
      dispatch(setStatus(Status.ERROR))
    }
  }
}

//edit tables
export function editTable(id:number,tableEditData:ITableData){
  return async function editTableThunk(dispatch:AppDispatch){
    dispatch(setStatus(Status.LOADING))
    try {
      const response=await APIWITHTOKEN.patch("restaurant-table/"+id,tableEditData)
      if(response.status===200 || response.status === 201){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(fetchTables())
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    } catch (error) {
      console.log(error)
      dispatch(setStatus(Status.ERROR))
    }
  }
}

//delete tables
export function deleteTable(id:number){
  return async function deleteTableThunk(dispatch:AppDispatch){
    dispatch(setStatus(Status.LOADING))
    try {
      const response=await APIWITHTOKEN.delete("restaurant-table/"+id)
      if(response.status===200 || response.status === 201){
        dispatch(setStatus(Status.SUCCESS))
        dispatch(fetchTables())
      }else{
        dispatch(setStatus(Status.ERROR))
      }
    } catch (error) {
      console.log(error)
      dispatch(setStatus(Status.ERROR))
    }
  }
}