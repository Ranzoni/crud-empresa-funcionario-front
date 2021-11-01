import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompaniesComponent } from './crud-companies/companies/companies.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CreateCompaniesComponent } from './crud-companies/create-companies/create-companies.component';
import { EmployeesComponent } from './crud-employees/employees/employees.component';
import { MenuComponent } from './menu/menu.component';
import { CreateEmployeesComponent } from './crud-employees/create-employees/create-employees.component';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { AuthGuard, AuthInterceptor, LoginService } from './services/login.service';

@NgModule({
  declarations: [
    AppComponent,
    CompaniesComponent,
    CreateCompaniesComponent,
    EmployeesComponent,
    MenuComponent,
    CreateEmployeesComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
    NgxCurrencyModule
  ],
  providers: [
    LoginService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
