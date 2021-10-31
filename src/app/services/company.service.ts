import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyUrl = 'https://localhost:44360/api/Company';

  constructor(private http: HttpClient) { }

  public get(): Observable<any> {
    return this.http.get<any>(this.companyUrl);
  }

  public getWithPagination(companyName: string, page: number, size: number): Observable<any> {
    let params = new HttpParams().set('name', companyName).set('page', page).set('size', size);
    return this.http.get<any>(this.companyUrl + '/pagination', { params: params });
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
