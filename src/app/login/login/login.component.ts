import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { ViewportScroller } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SHARED_IMPORTS,
    PasswordModule,
    FloatLabelModule,
    InputTextModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
  value: string = '';

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
