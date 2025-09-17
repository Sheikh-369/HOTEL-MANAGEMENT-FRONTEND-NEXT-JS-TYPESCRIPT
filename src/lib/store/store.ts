import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-slice"
import categorySlice from "./admin/category/categorySlice"
import users from "./admin/user/user-slice"
import tables from "./admin/tables/table-slice"
import menu from "./admin/menu/menu-slice"

const store=configureStore({
    reducer:{
        auth:authSlice,
        category:categorySlice,
        user:users,
        table:tables,
        menu
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>