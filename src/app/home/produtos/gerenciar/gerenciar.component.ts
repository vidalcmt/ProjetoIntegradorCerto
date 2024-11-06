import { Component, inject, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../models/produto.model';
import { GuiaEntradaService } from '../../../services/guia-entrada.service';
import { Guia_Entrada } from '../../../models/guia_entrada.model';


@Component({
  selector: 'app-gerenciar',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './gerenciar.component.html',
  styleUrl: './gerenciar.component.scss'
})
export class GerenciarComponent implements OnInit {

  novoProduto: Produto = new Produto();

  constructor(
    private produtoService: ProdutoService,
    private guiaEntradaService: GuiaEntradaService
  ) { }

  ngOnInit(): void { }

  lancarGuiaEntrada(produtoId: number, fornecedorId: number) {
    const guiaEntrada = new Guia_Entrada();
    this.guiaEntradaService.save(guiaEntrada, produtoId, fornecedorId).subscribe(
      (guiaSalva) => {
        console.log('Guia de entrada lançada com sucesso:', guiaSalva);
      },
      (error) => {
        console.error('Erro ao lançar guia de entrada:', error);
      }
    );
  }


}

