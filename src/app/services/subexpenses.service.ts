import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/subexpenses/';

export interface SubexpensesData {
  subexpenses: number;
  reasons: string;
  date: string;
}

export interface ExpensesOverTimePeriodRequest {
  chatId: number,
  category: string;
  timePeriod: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubexpensesService {

  constructor(private http: HttpClient) { }

  findAllByChatIdAndCategory(chatId: string, category: string): Observable<SubexpensesData[]> {
    let params = new HttpParams();
    params = params.append('chatId', chatId);
    params = params.append('category', category);

    return this.http.get<SubexpensesData[]>(API_URL + 'category', { params });
  }

  computeTotalExpensesOverTimePeriod(request: ExpensesOverTimePeriodRequest): Observable<number> {
    return this.http.post<number>(API_URL + 'total', request);
  }
}
