import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  idCompany: number = 0;

  constructor(private readonly router: Router,
    private readonly loginService: LoginService) { }

  ngOnInit(): void {
    this.idCompany = this.loginService.idCompany;
  }

  goToCompanies(): void {
    this.router.navigateByUrl('companies');
  }

}
