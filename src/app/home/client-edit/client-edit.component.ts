import { Component, inject, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente.model';
import { ViewportScroller, NgClass } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { subscribe } from 'diagnostics_channel';
import { FuncionarioService } from '../../services/funcionario.service';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';


@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [
    SHARED_IMPORTS,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss',
  providers: [provideNgxMask()]
})
export class ClientEditComponent implements OnInit {
  Clientes: Cliente[] = [];
  novoCliente: Cliente = new Cliente();
  form!: FormGroup;
  private navigationSubscription!: Subscription;
  editMode: boolean = false;
  clienteSelecionado: any = null;

  index!: number;
  private modalService = inject(NgbModal);

  constructor(
    private clienteService: ClienteService,
    private funcionarioService: FuncionarioService,
    private viewportScroller: ViewportScroller,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.carregarClientes();

    this.navigationSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/home/cliente-editar') {
        this.carregarClientes();
      }
    });

    // VALIDAÇÃO DOS CAMPOS
    this.initForm();
  }

  initForm() {
    this.form = this.fb.group({
      nomeCompleto: ['', Validators.required],
      cpf: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required]
    });
  }

  // Atualizando o onSubmit para mapear os dados corretamente
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const clienteData = this.form.value;

    // Mapeando os dados do formulário para o model Cliente
    const novoCliente = new Cliente(
      clienteData.nomeCompleto,  // Mapear nomeCompleto do formulário para nome do model
      clienteData.cpf,
      clienteData.email,
      clienteData.telefone,
      []  // guias_saidas pode ser deixado vazio por padrão
    );

    if (this.editMode) {
      this.updateCliente(novoCliente);
    } else {
      this.salvarCliente(novoCliente);
    }

    
  }

  updateCliente(cliente: any) {

    console.log("Cliente atualizado:", cliente);
  }

  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  abrirModal(content: any, index: number, action: string) {
    this.index = index;

    if (action === 'create') {
      this.editMode = false;
      this.form.reset();
    } else if (action === 'edit') {
      this.editMode = true;
      this.setClienteData(index);
    }

    // Abre o modal com o conteúdo passado e tamanho 'lg'
    this.modalService.open(content, { size: 'lg' });
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

  salvarCliente(cliente: any) {
    this.funcionarioService.SalvarClienteReq(cliente).subscribe(
      (data) => {
        this.novoCliente = data;
        this.carregarClientes();
        console.log("Cliente salvo com sucesso:", this.novoCliente);
      },
      (error) => {
        console.error("Erro ao salvar cliente:", error);
      }
    );
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
    return '';
  }
}
