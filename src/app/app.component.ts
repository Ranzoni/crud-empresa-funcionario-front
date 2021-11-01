import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Funcionários da Empresa';

  constructor(private readonly loginService: LoginService,
    private readonly router: Router) {}

  logout(): void {
    this.loginService.logout();
  }

  isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  goToHome() {
    this.router.navigateByUrl('');
  }
}
