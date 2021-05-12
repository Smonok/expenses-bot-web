import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SubexpensesData } from '../model/subexpenses-data';
import { ExpensesOverTimePeriodRequest } from '../request/expenses-over-time-period';
import { MonthSubexpensesResponse } from '../response/month-subexpenses';
import { EveryDayExpensesResponse } from '../response/every-day-expenses';
import { TotalMonthExpensesResponse } from '../response/total-months-expenses';
import { TotalSubexpensesResponse } from '../response/total-subexpenses';


const API_URL = 'http://localhost:8080/api/subexpenses/';

@Injectable({
  providedIn: 'root'
})
export class SubexpensesService {

  constructor(private http: HttpClient) { }

  findAllByChatIdAndCategory(request: ExpensesOverTimePeriodRequest): Observable<SubexpensesData[]> {
    return this.http.post<SubexpensesData[]>(API_URL + 'category', request);
  }

  computeTotalExpensesOverTimePeriod(request: ExpensesOverTimePeriodRequest): Observable<number> {
    return this.http.post<number>(API_URL + 'total', request);
  }

  findAllOverTimePeriodWithMonths(request: ExpensesOverTimePeriodRequest): Observable<MonthSubexpensesResponse[]> {
    return this.http.post<MonthSubexpensesResponse[]>(API_URL + 'months', request);
  }

  findAllOverTimePeriod(request: ExpensesOverTimePeriodRequest): Observable<TotalSubexpensesResponse> {
    return this.http.post<TotalSubexpensesResponse>(API_URL + 'all', request);
  }

  findEveryDayExpensesSum(request: ExpensesOverTimePeriodRequest): Observable<EveryDayExpensesResponse[]> {
    return this.http.post<EveryDayExpensesResponse[]>(API_URL + 'everyday', request);
  }

  findTotalMonthsExpenses(request: ExpensesOverTimePeriodRequest): Observable<TotalMonthExpensesResponse[]> {
    return this.http.post<TotalMonthExpensesResponse[]>(API_URL + 'total-months', request);
  }

  findMonthsExpensesForAllCategories(request: any): Observable<any> {
    return this.http.post<any>(API_URL + 'comparison', request);
  }
}
