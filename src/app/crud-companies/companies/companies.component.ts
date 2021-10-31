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
  pageNumberPagination: number = 1;
  sizePagination: number = 5;
  totalPagination: number = 0;

  constructor(private companyService: CompanyService,
    private readonly router: Router) { }

  ngOnInit(): void {
    this.loadCompanies();
  }

  public goToCreateCompany(): void {
    this.router.navigateByUrl('companies/create');
  }

  public goToCreateCompanyById(id: number): void {
    this.router.navigateByUrl(`companies/create/${id}`);
  }

  public showButtonPrevious(): boolean {
    return this.pageNumberPagination > 1;
  }

  public showButtonNext(): boolean {
    if (this.totalPagination === 0)
      return false;

    return this.totalPagination / this.sizePagination > this.pageNumberPagination;
  }

  public previous(): void {
    this.pageNumberPagination--;
    this.loadCompanies();
  }

  public next(): void {
    this.pageNumberPagination++;
    this.loadCompanies();
  }

  public loadCompanies(): void {
    this.companyService
      .getWithPagination(this.pageNumberPagination, this.sizePagination)
      .subscribe(response => {
        this.companies = response.data;
        this.pageNumberPagination = response.page;
        this.sizePagination = response.size;
        this.totalPagination = response.total;
      });
  }

}
