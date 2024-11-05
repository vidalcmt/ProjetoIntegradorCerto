import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Produto } from '../models/produto.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiURL = 'http://localhost:8080/produto';

  constructor(private http: HttpClient) { }

  findById(id: number): Observable<Produto> {
    return this.http.get<Produto>(`${this.apiURL}/findById?id=${id}`);
  }

  findAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiURL}/findAll`);
  }

  findByNome(nome: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiURL}/findByNome?nome=${nome}`);
  }

  findByFornecedorId(fornecedorId: number): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiURL}/findAllByFornecedorId?fornecedorId=${fornecedorId}`);
  }

  findByMarca(marca: string): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiURL}/findByMarca?marca=${marca}`);
  }

  findByEstoque(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.apiURL}/findByEstoque`);
  }

  relatorioEstoque(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiURL}/relatorioEstoque`);
  }
}
