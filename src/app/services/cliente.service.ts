import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente.model';

@Injectable({
    providedIn: 'root'
})
export class ClienteService {
    private apiUrl = 'http://localhost:8080/cliente';

    constructor(private http: HttpClient) { }

    BuscaClienteReq(): Observable<Cliente[]> {
        return this.http.get<Cliente[]>(`${this.apiUrl}/findAll`);
    }

    SalvarClienteReq(cliente: Cliente): Observable<Cliente> {
        return this.http.post<Cliente>(`${this.apiUrl}/save`, cliente);
    }

    AtualizarClienteReq(cliente: Cliente): Observable<Cliente> {
        return this.http.put<Cliente>(`${this.apiUrl}/update`, cliente);
    }
}
