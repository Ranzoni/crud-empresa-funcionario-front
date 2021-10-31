import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Company } from 'src/app/models/company';
import { Address } from 'src/app/models/address';
import { CompanyService } from 'src/app/services/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViaCepService } from 'src/app/services/via-cep.service';
import { Functions } from 'src/app/shared/functions';

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
      private readonly activatedRoute: ActivatedRoute,
      private readonly viaCepService: ViaCepService) {
    let addressCompany: Address = {
      id: 0,
      street: '',
      number: '',
      address2: null,
      neighborhood: '',
      city: '',
      state: '',
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
      name: ['', Validators.required],
      street: ['', Validators.required],
      number: ['', Validators.required],
      address2: [null],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      phoneNumber: [null]
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
      zipCode: Functions.onlyNumbers(this.form.value.zipCode)
    };

    let phoneNumber = Functions.onlyNumbers(this.form.value.phoneNumber);
    let companyReturn: Company = {
      id: Number(this.companyForm?.id),
      name: this.form.value.name,
      idAddress: this.form.value.idAddress,
      address: addressCompany,
      phoneNumber: !!phoneNumber ? phoneNumber : null
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
    if (!!this.form.invalid) {
      this.validator();
      return;
    }

    if (this.isCreation)
      this.createCompany();
    else
      this.updateCompany();
  }

  private validator(): void {
    if (this.form.get('name')?.errors?.required) {
      alert('O nome é obrigatório');
      return;
    }

    if (this.form.get('street')?.errors?.required)  {
      alert('A rua é obrigatória');
      return;
    }

    if (this.form.get('número')?.errors?.required) {
      alert('O número é obrigatório');
      return;
    }

    if (this.form.get('neighborhood')?.errors?.required) {
      alert('O bairro é obrigatório');
      return;
    }

    if (this.form.get('city')?.errors?.required) {
      alert('A cidade é obrigatória');
      return;
    }

    if (this.form.get('state')?.errors?.required) {
      alert('O estado é obrigatório');
      return;
    }

    if (this.form.get('zipCode')?.errors?.required) {
      alert('O CEP é obrigatório');
      return;
    }

    if (!!this.form.get('phoneNumber')) {
      if (this.form.get('phoneNumber')?.errors?.required) {
        alert('O telefone é obrigatório');
        return;
      }
    }
  }

  public createCompany(): void {
    this.companyService.create(this.company).subscribe(ret => {
      this.router.navigateByUrl('companies');
    });
  }

  public updateCompany(): void {
    console.log(this.company);
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

  public getAddressByZipCode(zipCode: string): void {
    this.viaCepService.getAddressByZipCode(zipCode).subscribe(address => {
      this.form.controls['street'].setValue(address.logradouro);
      this.form.controls['neighborhood'].setValue(address.bairro);
      this.form.controls['city'].setValue(address.localidade);
      this.form.controls['state'].setValue(address.uf);
      this.form.controls['zipCode'].setValue(address.cep);
    });
  }

  public validatePhoneNumber(event: any): void {
    let phoneNumber = Functions.onlyNumbers(event.target.value);
    if (!phoneNumber)
      return;

    if (phoneNumber.length > 11 || phoneNumber.length < 10) {
      event.target.value = '';
      alert('O número de telefone inforamdo é inválido. Ele deve conter o DDD mais o número.');
    }
  }

}
