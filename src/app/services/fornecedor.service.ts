import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fornecedor } from '../models/fornecedor.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private apiUrl = 'http://localhost:8080/fornecedor';
  private apiUrlFuncionario = 'http://localhost:8080/funcionario';

  constructor(
    private http: HttpClient
  ) { }

  SalvarFornecedorReq(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(`${this.apiUrlFuncionario}/saveFornecedor`, fornecedor);
  }

  AtualizarFornecedorReq(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.apiUrl}/update/${fornecedor.id}`, fornecedor);
  }

  BuscaFornecedorReq(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(`${this.apiUrl}/findAll`);
  }

  DeletarFornecedorReq(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }
}
