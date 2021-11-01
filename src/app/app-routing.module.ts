import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './crud-companies/companies/companies.component';
import { CreateCompaniesComponent } from './crud-companies/create-companies/create-companies.component';
import { CreateEmployeesComponent } from './crud-employees/create-employees/create-employees.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { MenuComponent } from './menu/menu.component';
import { AuthGuard } from './services/login.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'menu' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'companies', component: CompaniesComponent, canActivate: [AuthGuard] },
  { path: 'companies/create', component: CreateCompaniesComponent, canActivate: [AuthGuard] },
  { path: 'companies/create/:id', component: CreateCompaniesComponent, canActivate: [AuthGuard] },
  { path: 'employees/create', component: CreateEmployeesComponent, canActivate: [AuthGuard] },
  { path: 'employees/create/:id', component: CreateEmployeesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
