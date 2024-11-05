import { Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { HomeComponent } from './home/home/home.component';
import { GeneralComponent } from './home/general/general.component';
import { ClientEditComponent } from './home/client-edit/client-edit.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: GeneralComponent, },
            { path: 'cliente-editar', component: ClientEditComponent, runGuardsAndResolvers: 'always' },
        ]
    },
    { path: '**', redirectTo: 'login' },
];
