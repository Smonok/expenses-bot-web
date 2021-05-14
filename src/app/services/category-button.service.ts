import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryButton } from '../response/category-button';

const API_URL = 'http://localhost:8080/api/category-buttons/';

@Injectable({
    providedIn: 'root'
})
export class CategoryButtonService {
    constructor(private http: HttpClient) { }

    findCategoriesByChatId(chatId: number): Observable<string[]> {
        return this.http.get<string[]>(API_URL + 'categories/' + chatId);
    }

    findAllByChatId(chatId: number): Observable<CategoryButton[]> {
        return this.http.get<CategoryButton[]>(API_URL + chatId);
    }

    computeSummaryExpenses(chatId: number): Observable<number> {
        return this.http.get<number>(API_URL + 'summary-expenses/' + chatId);
    }
}