import { Component, CUSTOM_ELEMENTS_SCHEMA, NgModule, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SHARED_IMPORTS } from '../../shared/shared-imports';
import { ViewportScroller } from '@angular/common';
import { PasswordModule } from 'primeng/password';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SHARED_IMPORTS,
    PasswordModule,
    FloatLabelModule,
    InputTextModule,
    NgbToastModule
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
  nome: string = '';
  senha: string = '';
  showErrorToast: boolean = false;
  errorMessage: string = '';

  constructor
    (
      private router: Router,
      private viewportScroller: ViewportScroller,
      private authService: AuthService,
      private route: ActivatedRoute
    ) {

  }

  onLogin() {
    this.authService.login(this.nome, this.senha).subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
          this.router.navigateByUrl(returnUrl);
          this.onLoginSuccess();
        } else {
          console.error("Usuário ou senha incorretos");
        }
      },
      (error) => {
        console.error("Erro ao fazer login", error);
      }
    )
  }

  onLoginSuccess() {
    this.navegarEntrePaginas('home');
  }

  navegarEntrePaginas(rota: string) {
    this.router.navigate([`/${rota}`]).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }
}
