import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employeeUrl = 'https://localhost:44360/api/Employee';

  constructor(private http: HttpClient) { }

  public getByIdCompany(idCompany: number, page: number, size: number): Observable<any> {
    let params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(this.employeeUrl + '/idcompany/' + idCompany, { params: params });
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
