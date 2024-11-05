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

  // onLogin() {
  //   this.authService.login(this.nome, this.senha).subscribe(
  //     (isAuthenticated) => {
  //       if (isAuthenticated) {
  //         const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
  //         this.router.navigateByUrl(returnUrl);
  //         this.onLoginSuccess();
  //       } else {
  //         this.showErrorToast = true;
  //         this.errorMessage = 'Usuário ou senha incorretos.';
  //         this.escondeMensagemToast();
  //       }
  //     },
  //     (error) => {
  //       this.showErrorToast = true;
  //       this.errorMessage = 'Erro de conexão com o servidor. Tente novamente mais tarde.';
  //       this.escondeMensagemToast();
  //     }
  //   );
  // }

  onLogin() {
    this.authService.login(this.nome, this.senha).subscribe(
      (isAuthenticated) => {
        if (isAuthenticated) {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
          this.router.navigateByUrl(returnUrl);
          this.onLoginSuccess();
        }
      },
      (error) => {
        this.showErrorToast = true;
        if (error.status === 400) {
          this.errorMessage = 'Usuário ou senha incorretos.';
        } else if (error.status === 500) {
          this.errorMessage = 'Erro de servidor. Tente novamente mais tarde.';
        } else {
          this.errorMessage = 'Ocorreu um erro inesperado. Tente novamente.';
        }

        this.hideToastAfterDelay();
      }
    );
  }


  escondeMensagemToast() {

  }

  onLoginSuccess() {
    this.navegarEntrePaginas('home');
  }

  navegarEntrePaginas(rota: string) {
    this.router.navigate([`/${rota}`]).then(() => {
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  hideToastAfterDelay() {
    setTimeout(() => {
      this.showErrorToast = false;
    }, 5000);
  }
}
