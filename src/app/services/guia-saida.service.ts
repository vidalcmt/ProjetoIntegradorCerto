import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Guia_Saida } from '../models/guia_saida.model';

@Injectable({
  providedIn: 'root'
})
export class GuiaSaidaService {
  private baseUrl = 'http://localhost:8080/guias-saida';

  constructor(private http: HttpClient) { }

  save(guiaSaida: Guia_Saida, produtoId: number, clienteId: number, funcionarioId: number): Observable<Guia_Saida> {
    const params = { produtoId: produtoId.toString(), clienteId: clienteId.toString(), funcionarioId: funcionarioId.toString() };
    return this.http.post<Guia_Saida>(`${this.baseUrl}`, guiaSaida, { params });
  }

  findById(id: number): Observable<Guia_Saida> {
    return this.http.get<Guia_Saida>(`${this.baseUrl}/${id}`);
  }

  findAll(): Observable<Guia_Saida[]> {
    return this.http.get<Guia_Saida[]>(this.baseUrl);
  }

  update(guiaSaida: Guia_Saida): Observable<Guia_Saida> {
    return this.http.put<Guia_Saida>(`${this.baseUrl}/${guiaSaida.id}`, guiaSaida);
  }

  delete(id: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${id}`);
  }
}
