import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountDialogComponent } from './components/account/account-dialog/account-dialog.component';
import { CreateAccountComponent } from './components/account/create-account/create-account.component';
import { AccountListComponent } from './components/account/account-list/account-list.component';
import { DeviceDetectorModule } from 'ngx-device-detector';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthInterceptor } from './components/auth/auth-interceptor';
import { AuthGuard } from './components/auth/login.auth.guard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbColumnsService } from '@nebular/theme/components/tree-grid/tree-grid-columns.service';
import * as Nebular from '@nebular/theme';
import { NbAuthModule } from '@nebular/auth';
import { NbTableModule } from '@nebular/theme/components/cdk/table';
import * as Material from "@angular/material";
import { CreateMovementComponent } from './components/movement/create-movement/create-movement.component';
import { MovementListComponent } from './components/movement/movement-list/movement-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateAccountComponent,
    AccountListComponent,
    AccountDialogComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CreateMovementComponent,
    MovementListComponent,
    
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    DeviceDetectorModule.forRoot(),
    BrowserAnimationsModule,
    ReactiveFormsModule,

    //Nebular Modules
    Nebular.NbThemeModule.forRoot({ name: 'corporate' }),
    Nebular.NbLayoutModule,
    Nebular.NbSidebarModule,
    Nebular.NbMenuModule,
    Nebular.NbAlertModule,
    Nebular.NbButtonModule,
    Nebular.NbCheckboxModule,
    Nebular.NbInputModule,
    Nebular.NbToastrModule,
    Nebular.NbUserModule,
    Nebular.NbActionsModule,
    Nebular.NbCardModule,
    NbAuthModule.forRoot(),
    NbTableModule,
    Nebular.NbRouteTabsetModule,
    Nebular.NbSelectModule,
    Nebular.NbRadioModule,

    //Material Angular
    Material.MatToolbarModule,
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatButtonModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule,
    Material.MatDialogModule,
    Material.MatTooltipModule,
  ],
  
  entryComponents: [
    AccountDialogComponent,
    CreateMovementComponent,
    MovementListComponent,
  ],

  providers: [
    AuthInterceptor, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthGuard,

    //Nebular Service
    Nebular.NbSidebarService,
    Nebular.NbThemeService,
    NbColumnsService,
    Nebular.NbMediaBreakpointsService,
    NbColumnsService,
    Nebular.NbLayoutRulerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
