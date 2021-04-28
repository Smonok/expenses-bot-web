import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubexpensesData } from '../model/subexpenses-data';

const API_URL = 'http://localhost:8080/api/subexpenses/';

export interface MonthSubexpensesData {
  allMonths: boolean,
  monthYear: string,
  sum: number,
  subexpensesDto: SubexpensesData[]
}

export interface ExpensesOverTimePeriodRequest {
  chatId: number,
  category: string,
  timePeriod: string
}

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

  findAllOverTimePeriodWithMonths(request: ExpensesOverTimePeriodRequest): Observable<MonthSubexpensesData[]> {
    return this.http.post<MonthSubexpensesData[]>(API_URL + 'months', request);
  }
}
