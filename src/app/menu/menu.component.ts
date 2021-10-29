import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  companies: Company[] = [];
  idCompany: number = 3;

  constructor(private readonly router: Router,
    private readonly companyService: CompanyService) { }

  ngOnInit(): void {
    this.companyService.get().subscribe(companies => {
      this.companies = companies;
      this.idCompany = companies[0].id;
    });
  }

  goToCompanies(): void {
    this.router.navigateByUrl('companies');
  }

  onChange(event: any): void {
    this.idCompany = event.target.value;
  }

}
