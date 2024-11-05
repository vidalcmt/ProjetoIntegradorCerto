import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/adm/login';

  constructor(private http: HttpClient) { }

  login(nome: string, senha: string): Observable<boolean> {
    let params = new HttpParams().set('nome', nome).set('senha', senha);

    return this.http.post<boolean>(this.apiUrl, {}, { params });
  }
}