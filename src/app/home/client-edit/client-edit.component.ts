import { Component, inject, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { ViewportScroller, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [
    SHARED_IMPORTS,
    ReactiveFormsModule
  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss'
})
export class ClientEditComponent implements OnInit {
  Clientes: Cliente[] = [];
  novoCliente: Cliente = new Cliente();
  form!: FormGroup;

  index!: number;
  private modalService = inject(NgbModal);

  constructor(
    private clienteService: ClienteService,
    private viewportScroller: ViewportScroller,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.carregarClientes();

    // VALIDAÇÃO DOS CAMPOS
    this.form = this.fb.group({
      nomeCompleto: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      email: ['', Validators.required],
      telefone: ['', Validators.required],
    });
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

  setClienteData(index: number) {
    if (this.Clientes[index]) {
      this.form.patchValue({
        nomeCompleto: this.Clientes[index].nome,
        cpf: this.Clientes[index].cpf,
        email: this.Clientes[index].email,
        telefone: this.Clientes[index].telefone
      });
    }
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

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getErrorMessage(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo é obrigatório.';
    }
    if (field?.hasError('pattern') && fieldName === 'cpf') {
      return 'O CPF deve conter 11 dígitos numéricos.';
    }
    return '';
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); 
      return;
    }
  }
}
