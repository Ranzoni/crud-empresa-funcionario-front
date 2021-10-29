import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  @Input() idCompany: number = 0;
  employees: Employee[] = [];
  selectedEmployee?: Employee;

  constructor(private employeeService: EmployeeService,
    private readonly router: Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!!this.idCompany)
      this.employeeService.getByIdCompany(this.idCompany).subscribe(employees => {
        this.employees = [];
        if (!!employees && employees.length > 0)
          this.employees = employees;
      });
  }

  goToCreateEmployee(): void {
    this.router.navigateByUrl(`employees/create/idcompany/${this.idCompany}`);
  }

  goToCreateEmployeeById(id: number): void {
    this.router.navigateByUrl(`employees/create/${id}/idcompany/${this.idCompany}`);
  }

}
