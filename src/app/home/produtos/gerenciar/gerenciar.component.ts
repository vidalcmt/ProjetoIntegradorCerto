import { Component, inject, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';
import { ProdutoService } from '../../../services/produto.service';
import { Produto } from '../../../models/produto.model';
import { GuiaEntradaService } from '../../../services/guia-entrada.service';
import { Guia_Entrada } from '../../../models/guia_entrada.model';
import { Chart } from 'chart.js';


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

  produtos = [
    { nome: 'Maquina Agrícola', quantidade: 10, dataSaida: '28/12/2024' , preco: 100.00 },
    { nome: 'Trator', quantidade: 20, dataSaida: '22/12/2024' ,preco: 200.00 },
    { nome: 'Motor Lamborghini', quantidade: 30, dataSaida: '30/12/2024' , preco: 300.00 }
  ];
  ngOnInit(): void {
    new Chart('myChart', {
      type: 'bar',
      data: {
        labels: ['Maquina Agrícola', 'Trator', 'Motor Lamboghini'],
        datasets: [{
          label: 'Quantidade em Estoque',
          data: [10, 20, 30],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        }]
      }
    });
  }

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

