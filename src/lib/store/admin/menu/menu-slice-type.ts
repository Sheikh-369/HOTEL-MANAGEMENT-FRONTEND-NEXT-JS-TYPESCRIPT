import { Status } from "@/lib/global-type/type"

export interface IMenuData{
    id?:number,
    menuName:string,
    menuDescription:string,
    menuPrice:number,
    categoryId?:number,
    categoryName:string,
    menuIngredients:string,
    menuStatus:"available" | "unavailable",
    menuType:"veg" | "non-veg",
    menuImage:File | string | null
}

export interface IMenuSliceState{
    menu:IMenuData[],
    status:Status
}