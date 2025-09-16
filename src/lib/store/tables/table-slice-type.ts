import { Status } from "@/lib/global-type/type";

export interface ITableData {
  id?: number;
  tableNumber: string;
  seats: number;
  tableStatus: "available" | "reserved"; // union type for safety
}

export interface ITableInitialStatus{
    table:ITableData[],
    status:Status
}
