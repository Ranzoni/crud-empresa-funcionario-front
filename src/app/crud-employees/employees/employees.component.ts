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
  pageNumberPagination: number = 1;
  sizePagination: number = 5;
  totalPagination: number = 0;

  constructor(private employeeService: EmployeeService,
    private readonly router: Router) { }

  ngOnInit(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!!this.idCompany)
      this.loadEmployees();
  }

  public goToCreateEmployee(): void {
    this.router.navigateByUrl(`employees/create/idcompany/${this.idCompany}`);
  }

  public goToCreateEmployeeById(id: number): void {
    this.router.navigateByUrl(`employees/create/${id}/idcompany/${this.idCompany}`);
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
    this.loadEmployees();
  }

  public next(): void {
    this.pageNumberPagination++;
    this.loadEmployees();
  }

  public loadEmployees(): void {
      this.employeeService.getByIdCompany(this.idCompany, this.pageNumberPagination, this.sizePagination)
        .subscribe(response => {
          this.employees = [];
          if (!!response.data && response.data.length > 0) {
            this.employees = response.data;
            this.pageNumberPagination = response.page;
            this.sizePagination = response.size;
            this.totalPagination = response.total;
          }
        });
  }

}
