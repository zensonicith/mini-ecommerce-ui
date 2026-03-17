import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  loginForm = new FormGroup({
    username: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });
  loginService = inject(AuthService);
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
