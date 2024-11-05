import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// export class AuthService {
//   private apiUrl = 'http://localhost:8080/adm/login';
//   private loggedIn = new BehaviorSubject<boolean>(false);

//   get isLoggedIn() {
//     return this.loggedIn.asObservable();
//   }

//   constructor(private http: HttpClient) { }

//   login(nome: string, senha: string): Observable<boolean> {
//     let params = new HttpParams()
//       .set('nome', nome)
//       .set('senha', senha);

//     return this.http.post<boolean>(this.apiUrl, {}, { params }).pipe(
//       tap((isAuthenticated: boolean) => {
//         this.loggedIn.next(isAuthenticated);
//       })
//     );
//   }

//   logout() {
//     this.loggedIn.next(false); 
//   }
// }

export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(this.checkLocalStorage());
  private apiUrl = 'http://localhost:8080/adm/login';
  isLoggedIn = this.loggedIn.asObservable();

  constructor(private http: HttpClient) { }

  private checkLocalStorage(): boolean {
    if (typeof window !== 'undefined' && localStorage.getItem('isAuthenticated') === 'true') {
      return true;
    }
    return false;
  }


  login(nome: string, senha: string): Observable<boolean> {
    let params = new HttpParams().set('nome', nome).set('senha', senha);

    return this.http.post<boolean>(this.apiUrl, {}, { params }).pipe(
      tap((isAuthenticated: boolean) => {
        this.loggedIn.next(isAuthenticated);
        if (isAuthenticated && typeof window !== 'undefined') {
          localStorage.setItem('isAuthenticated', 'true');
        }
      })
    );
  }

  logout() {
    this.loggedIn.next(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated');
    }
  }
}