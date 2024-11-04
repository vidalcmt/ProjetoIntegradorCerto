import { Component, inject, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { ViewportScroller } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [
    SHARED_IMPORTS,
  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent implements OnInit {
  Clientes: Cliente[] = [];
  novoCliente: Cliente = new Cliente();

  index!: number;
  private modalService = inject(NgbModal);

  constructor(
    private clienteService: ClienteService,
    private viewportScroller: ViewportScroller,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.carregarClientes();
  }

  abrirModal(content: any, index: number) {
    this.index = index;
    this.modalService.open(content, {size: 'lg'});
  }

  navegarEntrePaginas(rota: string) {
    this.router.navigate([`/${rota}`]).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  carregarClientes(): void {
    this.clienteService.BuscaClienteReq().subscribe(
      (data) => {
        this.Clientes = data;
      },
      (error) => {
        console.error('Erro ao carregar clientes', error);
      }
    );
  }
}
