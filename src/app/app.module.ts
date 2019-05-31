import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { AccountDetailsComponent } from './components/account/account-details/account-details.component';
import { AccountListComponent } from './components/account/account-list/account-list.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './components/auth/auth-interceptor';
import { AuthGuard } from './components/auth/login.auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbColumnsService } from '@nebular/theme/components/tree-grid/tree-grid-columns.service';
import {
  NbThemeModule, NbLayoutModule, NbSidebarModule,
  NbSidebarService, NbMenuModule, NbAlertModule,
  NbButtonModule, NbCheckboxModule, NbInputModule,
  NbToastrModule, NbUserModule, NbThemeService,
  NbActionsModule, NbMediaBreakpointsService, NbCardModule
} from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';

@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    AccountDetailsComponent,
    AccountListComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DeviceDetectorModule.forRoot(),
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'corporate' }),
    NbLayoutModule,
    NbSidebarModule,
    NbMenuModule,
    NbAlertModule,
    NbButtonModule,
    NbCheckboxModule,
    NbInputModule,
    NbToastrModule,
    NbUserModule,
    NbActionsModule,
    NbCardModule,
    NbAuthModule.forRoot(),
  ],
  providers: [
    AuthInterceptor, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    NbSidebarService,
    NbThemeService,
    NbColumnsService,
    NbMediaBreakpointsService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
