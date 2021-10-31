import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  readonly form: FormGroup;

  constructor(private readonly loginService: LoginService,
    private readonly formBuilder: FormBuilder) {
      this.form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

  public login(): void {
    let user: User = {
      username: this.form.value.username,
      password: this.form.value.password
    };
    
    this.loginService.authenticate(user).subscribe(response => {
      if (response.status == 400) {
        alert("Login inválido");
        return;
      }

      console.log(1);
    });
  }

}
