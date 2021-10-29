import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { Address } from 'src/app/models/address';
import { CompanyService } from 'src/app/services/company.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-companies',
  templateUrl: './create-companies.component.html',
  styleUrls: ['./create-companies.component.css']
})
export class CreateCompaniesComponent implements OnInit {

  readonly form: FormGroup;
  private companyForm?: Company;
  public isCreation: boolean = true;

  constructor(private readonly formBuilder: FormBuilder,
      private readonly companyService: CompanyService,
      private readonly router: Router,
      private readonly activatedRoute: ActivatedRoute) {
    let addressCompany: Address = {
      id: 0,
      street: '',
      number: '',
      address2: null,
      neighborhood: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    };

    this.companyForm = {
      id: 0,
      name: '',
      idAddress: 0,
      address: addressCompany,
      phoneNumber: ''
    };

    this.form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
      street: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
      number: ['', Validators.required],
      address2: [null],
      neighborhood: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
      city: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
      state: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
      country: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
      zipCode: ['', Validators.compose([Validators.required, Validators.maxLength(20)])],
      phoneNumber: ['', Validators.required]
    });
  }

  private get company(): Company {
    let addressCompany: Address = {
      id: Number(this.companyForm?.address.id),
      street: this.form.value.street,
      number: this.form.value.number,
      address2: !!this.form.value.address2 ? this.form.value.address2 : null,
      neighborhood: this.form.value.neighborhood,
      city: this.form.value.city,
      state: this.form.value.state,
      country: this.form.value.country,
      zipCode: this.form.value.zipCode
    };

    let companyReturn: Company = {
      id: Number(this.companyForm?.id),
      name: this.form.value.name,
      idAddress: this.form.value.idAddress,
      address: addressCompany,
      phoneNumber: this.form.value.phoneNumber
    };

    return companyReturn;
  }

  private set company(company: Company) {
    this.companyForm = company;
    
    this.form.controls['name'].setValue(company.name);
    this.form.controls['street'].setValue(company.address.street);
    this.form.controls['number'].setValue(company.address.number);
    this.form.controls['address2'].setValue(company.address.address2);
    this.form.controls['neighborhood'].setValue(company.address.neighborhood);
    this.form.controls['city'].setValue(company.address.city);
    this.form.controls['state'].setValue(company.address.state);
    this.form.controls['country'].setValue(company.address.country);
    this.form.controls['zipCode'].setValue(company.address.zipCode);
    this.form.controls['phoneNumber'].setValue(company.phoneNumber);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.isCreation = false;
        this.loadCompany(params['id']);
      }
    });
  }

  save(): void {
    if (this.isCreation)
      this.createCompany();
    else
      this.updateCompany();
  }

  public createCompany(): void {
    this.companyService.create(this.company).subscribe(ret => {
      this.router.navigateByUrl('companies');
    });
  }

  public updateCompany(): void {
    this.companyService.update(this.company).subscribe(ret => {
      this.router.navigateByUrl('companies');
    });
  }

  public deleteCompany(): void {
    this.companyService.delete(this.company.id).subscribe(ret => {
      this.router.navigateByUrl('companies');
    });
  }

  public loadCompany(id: number): void {
    this.companyService.getById(id).subscribe(company => {
      if (!!company)
        this.company = company;
    });
  }

}
