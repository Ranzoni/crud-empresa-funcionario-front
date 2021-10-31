import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'https://localhost:44360/api/User/login';

  constructor(private http: HttpClient) { }

  public authenticate(user: User): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }
}
