import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm = new FormGroup({
    username: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
    name: new FormControl('', { nonNullable: true }),
    address: new FormControl('', { nonNullable: true }),
    city: new FormControl('', { nonNullable: true }),
  });

  authService = inject(AuthService);
  router = inject(Router);

  async submitRegister() {
    const formValue = this.registerForm.getRawValue();
    const success = await this.authService.register(formValue);
    if (success) {
      this.router.navigate(['/login']);
    }
  }

  getErrorMessage() {
    return this.authService.errorMessage();
  }
}
