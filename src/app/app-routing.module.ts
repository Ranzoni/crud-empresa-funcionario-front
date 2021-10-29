import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniesComponent } from './crud-companies/companies/companies.component';
import { CreateCompaniesComponent } from './crud-companies/create-companies/create-companies.component';
import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'menu' },
  { path: 'menu', component: MenuComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'companies/create', component: CreateCompaniesComponent },
  { path: 'companies/create/:id', component: CreateCompaniesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
