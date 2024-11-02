import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor
    (
      private router: Router,
      private viewportScroller: ViewportScroller
    ) {

  }

  navegarEntrePaginas(rota: string) {
    this.router.navigate([`/${rota}`]).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }
}
