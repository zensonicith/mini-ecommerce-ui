import { Component, inject, OnInit, signal } from '@angular/core';
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
export class App implements OnInit {
  loginService = inject(LoginService);
  router = inject(Router)
  customerService = inject(CustomerService);
  customer = signal<CustomerInfo | null>(null);
  async ngOnInit() {
    const customerInfo = await this.customerService.getCustomerInfo();
    this.customer.set(customerInfo);
  }
  logout() {
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
