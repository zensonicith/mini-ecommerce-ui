import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });
  loginService = inject(LoginService);
  router = inject(Router);
  submitLogin() {
    const { username, password } = this.loginForm.getRawValue();
    console.log(username, password);
    this.loginService.login(username, password)
    .then((response) => {
      if (response) {
        this.router.navigate(['/']);
      }
    })
  }
}
