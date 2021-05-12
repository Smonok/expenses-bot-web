import { SubexpensesData } from "../model/subexpenses-data";

export interface TotalSubexpensesResponse {
    totalExpenses: number;
    subexpensesDto: SubexpensesData[];
}