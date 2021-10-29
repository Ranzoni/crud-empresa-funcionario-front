import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './crud-companies/companies/companies.component';
import { CreateCompaniesComponent } from './crud-companies/create-companies/create-companies.component';
import { CreateEmployeesComponent } from './crud-employees/create-employees/create-employees.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'menu' },
  { path: 'menu', component: MenuComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'companies/create', component: CreateCompaniesComponent },
  { path: 'companies/create/:id', component: CreateCompaniesComponent },
  { path: 'employees/create/idcompany/:idcompany', component: CreateEmployeesComponent },
  { path: 'employees/create/:id/idcompany/:idcompany', component: CreateEmployeesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
