import { EveryDayExpensesResponse } from "./every-day-expenses";

export interface TotalMonthExpensesResponse {
    monthYear: string;
    expenses: number;
    everyDayExpenses: EveryDayExpensesResponse[];
}