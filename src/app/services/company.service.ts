import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyUrl = 'https://localhost:44360/api/Company';

  constructor(private http: HttpClient) { }

  public get(): Observable<Company[]> {
    return this.http.get<Company[]>(this.companyUrl);
  }

  public getById(id: number): Observable<Company> {
    return this.http.get<Company>(this.companyUrl + '/' + id);
  }

  public create(company: Company): Observable<any> {
    return this.http.post<Company>(this.companyUrl, company);
  }

  public update(company: Company): Observable<any> {
    return this.http.put<Company>(this.companyUrl, company);
  }

  public delete(id: number): Observable<any> {
    return this.http.delete<Company>(this.companyUrl + '/' + id);
  }

}
