import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthResponse, CustomerInfo } from './user';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'api/auth/login';
  currentCustomer = signal<CustomerInfo | null>(null);
  isLoggedIn = computed(() => this.currentCustomer() !== null);
  errorMessage = signal<string | null>(null);
  private readonly httpClient = inject(HttpClient);
  constructor() {}

  // Call api for login, if success, set currentCustomer and return true, else set errorMessage and return false
  async login(username: string, password: string): Promise<boolean> {
    if (!username || !password) {
      throw new Error('Username and password are required');
    }
    const body = { username, password };

    try {
      const response = await firstValueFrom(
        this.httpClient.post<AuthResponse>(this.url, body)
      );
      this.currentCustomer.set(response.customer);
      this.errorMessage.set(null);
      localStorage.setItem('token', response.token);
      return true;
    } catch {
      this.errorMessage.set('Login failed. Please check your credentials and try again.');
      return false;
    }
  }

  logged(){
    return this.isLoggedIn();
  }

  getCurrentCustomer(){
    return this.currentCustomer();
  }

  logout() {
    this.currentCustomer.set(null);
    localStorage.removeItem('token');
  }

  getCustomerRole() : string {
    return this.currentCustomer()?.role ?? 'USER';
  }
}
