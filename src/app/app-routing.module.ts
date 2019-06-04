import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountListComponent } from './components/account/account-list/account-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/auth/login.auth.guard';
import { MovementListComponent } from './components/movement/movement-list/movement-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'accounts', canActivate: [AuthGuard], component: AccountListComponent },
  { path: 'add', canActivate: [AuthGuard], component: CreateAccountComponent },
  { path: 'movements', canActivate: [AuthGuard], component: MovementListComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: RegisterComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
