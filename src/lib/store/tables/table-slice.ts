import { Status } from "@/lib/global-type/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITableData, ITableInitialStatus } from "./table-slice-type";
import { AppDispatch } from "../store";
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