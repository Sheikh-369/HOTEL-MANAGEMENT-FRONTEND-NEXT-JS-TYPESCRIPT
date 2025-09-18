import { Status } from "@/lib/global-type/type"

export interface IReservationData{
    id?:number,
    userId?:string,
    userName:string,
    tableId?:number,
    tableNumber:number,
    numberOfGuests:number,
    reservationTime:string, 
    reservationStatus:"RESERVED" | "AVAILABLE"

}

export interface IReservationSliceStatus{
    reservation:IReservationData[],
    status:Status
}