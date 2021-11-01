import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { CompanyService } from 'src/app/services/company.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  readonly form: FormGroup;
  public companies: Company[] = [];

  constructor(private readonly formBuilder: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly companyService: CompanyService) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      company: [0, Validators.required]
    });
  }

  ngOnInit(): void {
    this.companyService.get().subscribe(companies => {
      if (!!companies && companies.length > 0)
        this.companies = companies;
    });
  }

  public register(): void {
    if (!this.form.valid || this.form.value.company === 0) {
      alert('É necessário preencher todos os campos');
      return;
    }

    let user: User = {
      username: this.form.value.username,
      password: this.form.value.password,
      idCompany: this.form.value.company,
      company: null
    };

    this.loginService.create(user).subscribe(ret => {
      this.router.navigateByUrl('');
    });
  }

}
