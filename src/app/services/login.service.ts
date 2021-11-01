import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { tap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl = 'https://crud-empresa-funcionario.azurewebsites.net/api/User';

  constructor(private http: HttpClient,
    private readonly router: Router) { }

  private setSession(authResult: any) {
    localStorage.setItem('token', authResult.token);
    localStorage.setItem('company', authResult.user.idCompany);
  }

  public get idCompany(): number {
    if (!localStorage.getItem('company'))
      return 0;

    return Number(localStorage.getItem('company'));
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('company');
    this.router.navigateByUrl('login');
  }

  public isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  public authenticate(user: User): Observable<any> {
    return this.http.post<any>(this.loginUrl + '/login', user)
      .pipe(
        tap(response => this.setSession(response))
      );
  }

  public create(user: User): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token && req.url.indexOf('viacep') < 0) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer '.concat(token))
      });

      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (!this.authService.isLoggedIn()) {
      this.authService.logout();
      this.router.navigate(['login']);
    
      return false;
    }

    return true;
  }

}