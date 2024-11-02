import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared-imports';

@Component({
  selector: 'app-scrollbar',
  standalone: true,
  imports: [
    SHARED_IMPORTS,
    PanelMenuModule
  ],
  templateUrl: './scrollbar.component.html',
  styleUrl: './scrollbar.component.scss',
})

export class ScrollbarComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(
    private router: Router,
  ) 
  {
  }

  ngOnInit() {
    this.inicializaMenu();
  }

  inicializaMenu() {
    this.items = [
      {
        label: 'Estoque',
        icon: 'pi pi-box',
        items: [
          {
            label: 'Relatório',
            icon: 'pi pi-chart-bar',
            route: '/installation'
          },
          {
            label: 'Gerenciar Estoque',
            icon: 'pi pi-database',
            route: '/configuration'
          }
        ]
      },
      {
        label: 'Clientes',
        icon: 'pi pi-users',
        items: [
          {
            label: 'Gerenciar Clientes',
            icon: 'pi pi-user-edit',
            route: '/configuration'
          },
          {
            label: 'Cadastrar',
            icon: 'pi pi-user-plus',
            route: '/configuration'
          }
        ]
      }
    ];
  }
}
