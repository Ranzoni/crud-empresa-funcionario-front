import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { User } from '../models/user';
import { CompanyService } from '../services/company.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  readonly form: FormGroup;
  public companies: Company[] = [];

  constructor(private readonly loginService: LoginService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly companyService: CompanyService) {
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        company: [0, Validators.required]
      });
    }

  ngOnInit(): void {
    if (this.loginService.isLoggedIn())
      this.router.navigateByUrl('menu');

    this.companyService.get().subscribe(companies => {
      if (!!companies && companies.length > 0)
        this.companies = companies;
    });
  }

  public login(): void {
    let user: User = {
      username: this.form.value.username,
      password: this.form.value.password,
      idCompany: this.form.value.company,
      company: null
    };
    
    this.loginService.authenticate(user).subscribe(
      success => {
        this.router.navigateByUrl('menu');
      },
      error => {
        alert("Login inválido");
        return;
      });
    }

  public registerUser(): void {
    this.router.navigateByUrl('register');
  }

}
