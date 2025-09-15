import { Status } from "@/lib/global-type/type"

export interface IUserData{
    id:string,
    userName:string,
    userEmail:string,
    phoneNumber:string,
    address:string,
    createdAt:string
}

export interface IUserSliceState{
    user:IUserData[],
    status:Status
}