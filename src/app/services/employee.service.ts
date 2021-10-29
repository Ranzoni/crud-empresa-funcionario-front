import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeUrl = 'https://localhost:44360/api/Employee';

  constructor(private http: HttpClient) { }

  public getByIdCompany(idCompany: number): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.employeeUrl + '/idcompany/' + idCompany);
  }

  public getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.employeeUrl + '/' + id);
  }

  public create(company: Employee): Observable<any> {
    return this.http.post<Employee>(this.employeeUrl, company);
  }

  public update(company: Employee): Observable<any> {
    return this.http.put<Employee>(this.employeeUrl, company);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<Employee>(this.employeeUrl + '/' + id);
  }

}
