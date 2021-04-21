import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  existsByChatId(chatId: number): Observable<any> {
    return this.http.get(API_URL + 'exists/' + chatId, { responseType: 'text' });
  }

  getChatIdByEmail(email: string): Observable<any> {
    return this.http.get(API_URL + email, { responseType: 'text' });
  }
}