import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [
    SHARED_IMPORTS,
  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent {
  clientes: Cliente[] = []; // Armazena a lista de clientes

  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.carregarClientes();
  }

  carregarClientes(): void {
    this.clienteService.findAll().subscribe(
      (data) => {
        this.clientes = data;
        console.log('Clientes carregados:', this.clientes);
      },
      (error) => {
        console.error('Erro ao carregar clientes', error);
      }
    );
  }
}
