import { Status } from "@/lib/global-type/type"

export interface IUserRegisterData{
    userName:string,
    userEmail:string,
    phoneNumber:string,
    address:string,
    password:string,
    confirmPassword:string
}

export interface IAuthSliceState{
    user:IUserRegisterData,
    status:Status,
    message:string | null
}