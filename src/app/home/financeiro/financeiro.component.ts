import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../shared/shared-imports';

@Component({
  selector: 'app-financeiro',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './financeiro.component.html',
  styleUrl: './financeiro.component.scss'
})
export class FinanceiroComponent {

  produtos = [
    { nome: 'Maquina Agrícola', quantidade: 10, dataSaida: '28/12/2024', preco: 100.00 },
    { nome: 'Trator', quantidade: 20, dataSaida: '22/12/2024', preco: 200.00 },
    { nome: 'Motor Lamborghini', quantidade: 30, dataSaida: '30/12/2024', preco: 300.00 }
  ];
}
