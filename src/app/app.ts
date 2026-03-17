import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { CustomerService } from './customer.service';
import { CustomerInfo } from './user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  authService = inject(AuthService);
  router = inject(Router)
  customerService = inject(CustomerService);
  customer = signal<CustomerInfo | null>(null);
  constructor() {
    effect(() => {
      if (this.authService.isLoggedIn() || this.logged()) {
        this.updateCustomerInfo();
      }
    });
  }

  async updateCustomerInfo() {
    const customerInfo = await this.customerService.getCustomerInfo();
    this.customer.set(customerInfo);
  }

  logout() {
    this.customer.set(null);
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  getCurrentCustomer() {
    return this.customer();
  }
  logged() {
    return this.authService.logged();
  }
  isAdmin() {
    return this.customer()?.role === 'ADMIN';
  }
}
