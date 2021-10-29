import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  companies: Company[] = [];
  selectedCompany?: Company;

  constructor(private companyService: CompanyService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.companyService.get().subscribe(companies => this.companies = companies);
  }

  goToCreateCompany(): void {
    this.router.navigateByUrl('companies/create');
  }

  goToCreateCompanyById(id: number): void {
    this.router.navigateByUrl(`companies/create/${id}`);
  }

}
