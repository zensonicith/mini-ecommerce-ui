import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from './login.service';
import { CustomerService } from './customer.service';
import { CustomerInfo } from './user';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  loginService = inject(LoginService);
  router = inject(Router)
  customerService = inject(CustomerService);
  customer = signal<CustomerInfo | null>(null);
  constructor() {
    effect(() => {
      if (this.loginService.isLoggedIn() || this.logged()) {
        this.updateCustomerInfo();
      }
      else{
        this.router.navigate(['/login']); 
      }
    });
  }
  
  async updateCustomerInfo() {
    const customerInfo = await this.customerService.getCustomerInfo();
    this.customer.set(customerInfo);
  }

  logout() {
    this.customer.set(null);
    this.loginService.logout();
    this.router.navigate(['/login']);
  }

  getCurrentCustomer() {
    return this.customer();
  }
  logged() {
    return this.loginService.logged();
  }
  isAdmin() {
    return this.customer()?.role === 'ADMIN';
  }
}
