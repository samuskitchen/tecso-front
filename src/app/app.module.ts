import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { AccountDetailsComponent } from './account/account-details/account-details.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth-interceptor';
import { AuthGuard } from './auth/login.auth.guard';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbSidebarService, NbMenuModule } from '@nebular/theme';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

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
    NbMenuModule.forRoot(),
  ],
  providers: [
    AuthInterceptor, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,
    NbSidebarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
