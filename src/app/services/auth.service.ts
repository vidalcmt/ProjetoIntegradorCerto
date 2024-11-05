import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/adm/login';
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) { }

  login(nome: string, senha: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl, { nome, senha }).pipe(tap((isAuthenticated) => {
      this.loggedIn.next(isAuthenticated);
    })
    );
  }

  logout() {
    this.loggedIn.next(false); 
  }
}