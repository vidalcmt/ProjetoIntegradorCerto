import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fornecedor } from '../../models/fornecedor.model';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewportScroller } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FornecedorService } from '../../services/fornecedor.service';
import { Produto } from '../../models/produto.model';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-fornecedores',
  standalone: true,
  imports: [SHARED_IMPORTS,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  templateUrl: './fornecedores.component.html',
  styleUrl: './fornecedores.component.scss',
  providers: [provideNgxMask()]
})
export class FornecedoresComponent implements OnInit {
  Produto: Produto[] = [];
  editMode: boolean = false;
  Fornecedores: Fornecedor[] = [];
  novoFornecedor: Fornecedor = new Fornecedor();
  fornecedorSelecionado: Fornecedor | null = null;


  formCreate!: FormGroup;
  formEdit!: FormGroup;
  index!: number;

  private navigationSubscription!: Subscription;
  private modalService = inject(NgbModal);

  constructor(
    private viewportScroller: ViewportScroller,
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private fornecedorService: FornecedorService
  ) { }

  ngOnInit(): void {
    this.carregarFornecedores();

    this.navigationSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd && event.urlAfterRedirects === '/home/fornecedor-editar') {
        this.carregarFornecedores();
      }
    });

    // VALIDAÇÃO DOS CAMPOS
    this.initFormCreate();
    this.initFormEdit();
  }

  initFormCreate() {
    this.formCreate = this.fb.group({
      nome_social: ['', Validators.required],
      cnpj: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required]
    });
  }

  initFormEdit() {
    this.formEdit = this.fb.group({
      nome_social: ['', Validators.required],
      cnpj: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required]
    });
  }


  onSubmitCreate() {
    if (this.formCreate.invalid) {
      this.formCreate.markAllAsTouched();
      return;
    }

    const fornecedorData = this.formCreate.value;
    this.salvarFornecedor(new Fornecedor(
      fornecedorData.nome_social,
      fornecedorData.cnpj,
      fornecedorData.email,
      fornecedorData.telefone,
      [], // Endereço
      []  // Produtos
    ));
  }


  onSubmitEdit() {
    if (this.formEdit.invalid) {
      this.formEdit.markAllAsTouched();
      return;
    }

    const fornecedorData = this.formEdit.value;

    if (this.fornecedorSelecionado && this.fornecedorSelecionado.id) {
      const fornecedorAtualizado: Fornecedor = {
        id: this.fornecedorSelecionado.id,
        nome_social: fornecedorData.nome_social,
        cnpj: fornecedorData.cnpj,
        email: fornecedorData.email,
        telefone: fornecedorData.telefone,
        endereco: this.fornecedorSelecionado.endereco,
        produtos: this.fornecedorSelecionado.produtos 
      };

      this.fornecedorService.AtualizarFornecedorReq(fornecedorAtualizado).subscribe(
        (data) => {
          console.log("Fornecedor atualizado com sucesso:", data);
          this.carregarFornecedores(); // Recarrega a lista de fornecedores após a atualização
        },
        (error) => {
          console.error("Erro ao atualizar fornecedor:", error);
        }
      );
    }
  }


  formatarCPF(cpf: string): string {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }

  formatarTelefone(telefone: string): string {
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
      this.fornecedorSelecionado = this.Fornecedores[index]; 
      this.setFornecedorData(); 
    }

    this.modalService.open(content, { size: 'lg' });
  }



  navegarEntrePaginas(rota: string) {
    this.router.navigate([`/${rota}`]).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  setFornecedorData() {
    if (this.fornecedorSelecionado) {
      this.formEdit.patchValue({
        nome_social: this.fornecedorSelecionado.nome_social,
        cnpj: this.fornecedorSelecionado.cnpj,
        email: this.fornecedorSelecionado.email,
        telefone: this.fornecedorSelecionado.telefone
      });
    }
  }

  // Salva o fornecedor
  salvarFornecedor(fornecedor: Fornecedor) {
    this.fornecedorService.SalvarFornecedorReq(fornecedor).subscribe(
      (data) => {
        this.novoFornecedor = data;
        this.carregarFornecedores();
        console.log("Fornecedor salvo com sucesso:", this.novoFornecedor);
      },
      (error) => {
        console.error("Erro ao salvar fornecedor:", error);
      }
    );
  }

  atualizarFornecedor(id: number, fornecedor: Fornecedor) {
    this.fornecedorService.AtualizarFornecedorReq({ ...fornecedor, id }).subscribe(
      (data) => {
        console.log("Fornecedor atualizado com sucesso:", data);
        this.carregarFornecedores();
        this.editMode = false;
        this.fornecedorSelecionado = null;
      },
      (error) => {
        console.error("Erro ao atualizar fornecedor:", error);
      }
    );
  }

  carregarFornecedores(): void {
    this.fornecedorService.BuscaFornecedorReq().subscribe(
      (data) => {
        this.Fornecedores = data;
      },
      (error) => {
        console.error('Erro ao carregar fornecedores', error);
      }
    );
  }

  deletarFornecedor(id: number | undefined) {
    if (id !== undefined) {
      this.fornecedorService.DeletarFornecedorReq(id).subscribe(
        (response) => {
          console.log("Fornecedor deletado", response);
          this.carregarFornecedores();
        },
        (error) => {
          console.error("Erro ao deletar fornecedor", error);
        }
      );
    } else {
      console.warn("ID de fornecedor inválido para exclusão");
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
