import { SubexpensesData } from "../model/subexpenses-data";

export interface MonthSubexpensesResponse {
  monthYear: string,
  totalExpenses: number,
  subexpensesDto: SubexpensesData[]
}