import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { Position } from 'src/app/models/position';
import { CompanyService } from 'src/app/services/company.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { PositionService } from 'src/app/services/position.service';

@Component({
  selector: 'app-create-employees',
  templateUrl: './create-employees.component.html',
  styleUrls: ['./create-employees.component.css']
})
export class CreateEmployeesComponent implements OnInit {

  private idCompany: number = 0;
  companyName: string = '';
  readonly form: FormGroup;
  private employeeForm?: Employee;
  public isCreation: boolean = true;
  positions: Position[] = [];

  constructor(private readonly formBuilder: FormBuilder,
      private readonly employeeService: EmployeeService,
      private readonly companyService: CompanyService,
      private readonly router: Router,
      private readonly activatedRoute: ActivatedRoute,
      private readonly positionService: PositionService) {
    this.employeeForm = {
      id: 0,
      name: '',
      idPosition: 0,
      salary: 0,
      idCompany: 0
    };

    this.form = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(200)])],
      position: [0, Validators.required],
      salary: [0, Validators.required]
    });
  }

  private get employee(): Employee {
    let employeeReturn: Employee = {
      id: Number(this.employeeForm?.id),
      name: this.form.value.name,
      idPosition: this.form.value.position,
      salary: this.form.value.salary,
      idCompany: this.idCompany
    };

    return employeeReturn;
  }

  private set employee(employee: Employee) {
    this.employeeForm = employee;
    
    this.form.controls['name'].setValue(employee.name);
    this.form.controls['position'].setValue(employee.idPosition);
    this.form.controls['salary'].setValue(employee.salary);
  }

  ngOnInit(): void {
    this.positionService.get().subscribe(positions => {
      if (!!positions && positions.length > 0)
        this.positions = positions;
    });

    this.activatedRoute.params.subscribe(params => {
      if (params['idcompany']) {
        this.idCompany = params['idcompany'];
        this.companyService.getById(this.idCompany).subscribe(company => {
          if (!!company)
            this.companyName = company.name;
        });
      }
      
      if (params['id']) {
        this.isCreation = false;
        this.loadEmployee(params['id']);
      }
    });
  }

  save(): void {
    if (this.isCreation)
      this.createEmployee();
    else
      this.updateEmployee();
  }

  public createEmployee(): void {
    this.employeeService.create(this.employee).subscribe(ret => {
      this.router.navigateByUrl('menu');
    });
  }

  public updateEmployee(): void {
    this.employeeService.update(this.employee).subscribe(ret => {
      this.router.navigateByUrl('menu');
    });
  }

  public deleteEmployee(): void {
    this.employeeService.delete(this.employee.id).subscribe(ret => {
      this.router.navigateByUrl('menu');
    });
  }

  public loadEmployee(id: number): void {
    this.employeeService.getById(id).subscribe(employee => {
      if (!!employee)
        this.employee = employee;
    });
  }
}
