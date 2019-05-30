import { AccountDetailsComponent } from './account/account-details/account-details.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountListComponent } from './account/account-list/account-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/login.auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: 'accounts', canActivate: [AuthGuard], component: AccountListComponent },
  { path: 'add', canActivate: [AuthGuard], component: CreateAccountComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'home', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
