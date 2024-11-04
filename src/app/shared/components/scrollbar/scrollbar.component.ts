import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { PanelMenuModule } from 'primeng/panelmenu';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared-imports';
import { ViewportScroller } from '@angular/common';

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
    private viewportScroller: ViewportScroller
  ) {
  }

  ngOnInit() {

  }

  navegarEntrePaginas(rota: string) {
    this.router.navigate([`/home/${rota}`]).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }
}
