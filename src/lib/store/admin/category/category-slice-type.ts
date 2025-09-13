import { Status } from "@/lib/global-type/type"

export interface ICategoryData{
    id?:string | number,
    categoryName:string,
    categoryDescription:string,
    createdAt?:string
}


export interface ICategorySliceState{
    category:ICategoryData[],
    status:Status
}