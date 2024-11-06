import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guia_Entrada } from '../models/guia_entrada.model';

@Injectable({
  providedIn: 'root'
})
export class GuiaEntradaService {
  private baseUrl = 'http://localhost:8080/guias-entrada'; 

  constructor(private http: HttpClient) { }

  save(guiaEntrada: Guia_Entrada, produtoId: number, fornecedorId: number, funcionarioId: number): Observable<Guia_Entrada> {
    const params = { produtoId: produtoId.toString(), fornecedorId: fornecedorId.toString(), funcionarioId: funcionarioId.toString() };
    return this.http.post<Guia_Entrada>(`${this.baseUrl}`, guiaEntrada, { params });
  }

  findById(id: number): Observable<Guia_Entrada> {
    return this.http.get<Guia_Entrada>(`${this.baseUrl}/${id}`);
  }

  findAll(): Observable<Guia_Entrada[]> {
    return this.http.get<Guia_Entrada[]>(this.baseUrl);
  }

  update(guiaEntrada: Guia_Entrada): Observable<Guia_Entrada> {
    return this.http.put<Guia_Entrada>(`${this.baseUrl}/${guiaEntrada.id}`, guiaEntrada);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }
}
