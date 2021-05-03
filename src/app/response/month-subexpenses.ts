import { SubexpensesData } from "../model/subexpenses-data";

export interface MonthSubexpensesResponse {
  allMonths: boolean,
  monthYear: string,
  sum: number,
  subexpensesDto: SubexpensesData[]
}