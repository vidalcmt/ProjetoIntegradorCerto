import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { ChartModule } from 'primeng/chart';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-general',
  standalone: true,
  imports: [
    SHARED_IMPORTS,
    ChartModule
  ],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss'
})
export class GeneralComponent {
  usuario: string = 'Felipe Vidal';

  produtos = [
    { nome: 'Produto A', quantidade: 10, preco: 100.00 },
    { nome: 'Produto B', quantidade: 20, preco: 200.00 },
    { nome: 'Produto C', quantidade: 30, preco: 300.00 }
  ];
    ngOnInit(): void {
      new Chart('myChart', {
        type: 'bar',
        data: {
          labels: ['Produto A', 'Produto B', 'Produto C'],
          datasets: [{
            label: 'Quantidade em Estoque',
            data: [10, 20, 30],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          }]
        }
      });
    }
}
