import { computed, Injectable, signal } from '@angular/core';
import { CustomerInfo } from './user';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'https://localhost:7280/api/auth/login';
  currentCustomer = signal<CustomerInfo | null>(null);
  isLoggedIn = computed(() => this.currentCustomer() !== null);
  errorMessage = signal<string | null>(null);
  constructor() {}

  // Call api for login, if success, set currentCustomer and return true, else set errorMessage and return false
  async login(username: string, password: string) {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }
    const body = { username, password };
    const data = await fetch(this.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (data.ok) {
      const responseJson = await data.json();
      const customer: CustomerInfo = responseJson.customer;
      this.currentCustomer.set(customer);
      this.errorMessage.set(null);
      return true;
    }
    else{
      const errorData = await data.json();
      this.errorMessage.set(errorData.message || 'Login failed');
      return false;
    }
  }
  logout() {
    this.currentCustomer.set(null);
  }
}
