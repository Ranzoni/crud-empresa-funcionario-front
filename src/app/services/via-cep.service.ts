import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ViaCepService {

  private viaCepUrl = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) { }

  public getAddressByZipCode(zipCode: string): Observable<any> {
    return this.http.get<any>(this.viaCepUrl + `/${zipCode}/json`);
  }
  
}
