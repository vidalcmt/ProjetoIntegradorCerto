import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';
import { Funcionario } from '../models/funcionario.model';
import { Produto } from '../models/produto.model';




@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private apiUrl = 'http://localhost:8080/funcionario';

  constructor(private http: HttpClient) {}

  SalvarClienteReq(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.apiUrl}/saveCliente`, cliente, { responseType: 'json' });
  }

  DeletarClienteReq(id: number): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/delete/${id}`, { responseType: 'json' });
  }

  findById(id: number): Observable<Funcionario> {
    const params = new HttpParams().set('id', id.toString());
    return this.http.get<Funcionario>(`${this.apiUrl}/findById`, { params });
  }

  findAll(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.apiUrl}/findAll`);
  }

  update(funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiUrl}/update`, funcionario, { responseType: 'json' });
  }

//   saveFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
//     return this.http.post<Fornecedor>(`${this.apiUrl}/saveFornecedor`, fornecedor, { responseType: 'json' });
//   }

  saveProduto(produto: Produto, id: number): Observable<Produto> {
    return this.http.post<Produto>(`${this.apiUrl}/saveProduto/${id}`, produto, { responseType: 'json' });
  }

//   saveGuiaEntrada(guiaEntrada: GuiaEntrada, produto_id: number, fornecedor_id: number, funcionario_id: number): Observable<GuiaEntrada> {
//     const params = new HttpParams()
//       .set('produto_id', produto_id.toString())
//       .set('fornecedor_id', fornecedor_id.toString())
//       .set('funcionario_id', funcionario_id.toString());
//     return this.http.post<GuiaEntrada>(`${this.apiUrl}/saveGuiaEntrada`, guiaEntrada, { params });
//   }

//   saveGuiaSaida(guiaSaida: GuiaSaida, produto_id: number, cliente_id: number, funcionario_id: number): Observable<GuiaSaida> {
//     const params = new HttpParams()
//       .set('produto_id', produto_id.toString())
//       .set('cliente_id', cliente_id.toString())
//       .set('funcionario_id', funcionario_id.toString());
//     return this.http.post<GuiaSaida>(`${this.apiUrl}/saveGuiaSaida`, guiaSaida, { params });
//   }

  login(cpf: string): Observable<boolean> {
    const params = new HttpParams().set('cpf', cpf);
    return this.http.post<boolean>(`${this.apiUrl}/login`, null, { params });
  }
}
