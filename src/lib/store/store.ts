import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/auth-slice"
import categorySlice from "./admin/category/categorySlice"
import users from "./user/user-slice"

const store=configureStore({
    reducer:{
        auth:authSlice,
        category:categorySlice,
        user:users
    }
})

export default store
export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>