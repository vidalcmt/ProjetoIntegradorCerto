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
  clienteSelecionado: Cliente | null = null;

  editMode: boolean = false;

  formCreate!: FormGroup;
  formEdit!: FormGroup;
  index!: number;

  private navigationSubscription!: Subscription;
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
    this.initFormCreate();
    this.initFormEdit();
  }

  initFormCreate() {
    this.formCreate = this.fb.group({
      nomeCompleto: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required]
    });
  }

  initFormEdit() {
    this.formEdit = this.fb.group({
      nomeCompleto: ['', Validators.required],
      cpf: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required]
    });
  }

  onSubmitCreate() {
    if (this.formCreate.invalid) {
      this.formCreate.markAllAsTouched();
      return;
    }

    const clienteData = this.formCreate.value;
    this.salvarCliente(new Cliente(
      clienteData.nomeCompleto,
      clienteData.cpf,
      clienteData.email,
      clienteData.telefone,
      []
    ));
  }

  onSubmitEdit() {
    if (this.formEdit.invalid) {
      this.formEdit.markAllAsTouched();
      return;
    }

    const clienteData = this.formEdit.value;

    if (this.clienteSelecionado && this.clienteSelecionado.id) {
      const clienteAtualizado: Cliente = {
        id: this.clienteSelecionado.id,
        nome: clienteData.nomeCompleto,
        cpf: this.formatarCPF(clienteData.cpf),
        email: clienteData.email,
        telefone: this.formatarTelefone(clienteData.telefone),
        guias_saidas: this.clienteSelecionado.guias_saidas // Inclua qualquer outro campo necessário
      };

      this.clienteService.AtualizarClienteReq(clienteAtualizado).subscribe(
        (data) => {
          console.log("Cliente atualizado com sucesso:", data);
          this.carregarClientes(); // Recarrega a lista de clientes após a atualização
        },
        (error) => {
          console.error("Erro ao atualizar cliente:", error);
        }
      );
    }
  }

  // Função para garantir que o CPF esteja formatado corretamente
  formatarCPF(cpf: string): string {
    // Garante que o CPF esteja no formato 000.000.000-00
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  // Função para garantir que o telefone esteja formatado corretamente
  formatarTelefone(telefone: string): string {
    // Garante que o telefone esteja no formato (00)00000-0000
    return telefone.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3');
  }


  ngOnDestroy(): void {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  abrirModal(content: any, action: string, index?: number) {
    if (action === 'create') {
      this.editMode = false;
      this.formCreate.reset(); // Reseta o formulário de criação
    } else if (action === 'edit' && index !== undefined) {
      this.editMode = true;
      this.clienteSelecionado = this.Clientes[index]; // Define o cliente a ser editado
      this.setClienteData(); // Preenche o formulário de edição com os dados do cliente selecionado
    }

    this.modalService.open(content, { size: 'lg' });
  }



  navegarEntrePaginas(rota: string) {
    this.router.navigate([`/${rota}`]).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  setClienteData() {
    if (this.clienteSelecionado) {
      this.formEdit.patchValue({
        nomeCompleto: this.clienteSelecionado.nome,
        cpf: this.clienteSelecionado.cpf,
        email: this.clienteSelecionado.email,
        telefone: this.clienteSelecionado.telefone
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

  atualizarCliente(id: number, cliente: Cliente) {
    this.clienteService.AtualizarClienteReq({ ...cliente, id }).subscribe(
      (data) => {
        console.log("Cliente atualizado com sucesso:", data);
        this.carregarClientes();
        this.editMode = false;
        this.clienteSelecionado = null;
      },
      (error) => {
        console.error("Erro ao atualizar cliente:", error);
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

  deletarCliente(id: number | undefined) {
    if (id !== undefined) {
      this.funcionarioService.DeletarClienteReq(id).subscribe(
        (response) => {
          console.log("Cliente deletado", response);
          this.carregarClientes();
        },
        (error) => {
          console.error("Erro ao deletar", error);
        }
      );
    } else {
      console.warn("ID de cliente inválido para exclusão");
    }
  }

  isFieldInvalid(form: FormGroup, fieldName: string): boolean {
    const field = form.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  getErrorMessage(form: FormGroup, fieldName: string): string {
    const field = form.get(fieldName);
    if (field?.hasError('required')) {
      return 'Este campo é obrigatório.';
    }
    return '';
  }
}

