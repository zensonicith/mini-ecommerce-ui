import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  loginService = inject(LoginService);

  logout() {
    this.loginService.logout();
  }

  getCurrentCustomer() {
    return this.loginService.getCurrentCustomer();
  }

  logged() {
    return this.loginService.logged();
  }

  isAdmin() {
    return this.loginService.getCustomerRole() === 'ADMIN';
  }
}
