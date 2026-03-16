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
  async submitLogin() {
    const { username, password } = this.loginForm.getRawValue();
    const success = await this.loginService.login(username, password);
    if (success) {
      this.router.navigate(['/']);
    } 
  }

  getErrorMessage() {
    return this.loginService.errorMessage();
  }
}
