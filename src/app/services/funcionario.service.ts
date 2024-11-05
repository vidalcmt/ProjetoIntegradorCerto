import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
    providedIn: 'root'
})
export class FuncionarioService {
    private apiUrl = 'http://localhost:8080/funcionario';

    constructor(private http: HttpClient) { }

    SalvarClienteReq(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(`${this.apiUrl}/saveCliente`, cliente, {responseType: 'json'});
    }

    DeletarClienteReq(id: number): Observable<string> {
       return this.http.delete<string>(`${this.apiUrl}/delete/${id}`, { responseType: 'json'});
    }
}
