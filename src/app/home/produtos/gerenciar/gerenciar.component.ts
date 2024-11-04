import { Component, inject, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../shared/shared-imports';


@Component({
  selector: 'app-gerenciar',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './gerenciar.component.html',
  styleUrl: './gerenciar.component.scss'
})
export class GerenciarComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}
