import { computed, inject, Injectable, signal } from '@angular/core';
import { AuthResponse, CustomerInfo } from './user';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = 'api/auth/login';
  isLoggedIn = signal<boolean>(false);
  errorMessage = signal<string | null>(null);
  private readonly httpClient = inject(HttpClient);
  constructor() { }

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
      this.errorMessage.set(null);
      localStorage.setItem('token', response.token);
      this.isLoggedIn.set(true);
      return true;
    } catch {
      this.isLoggedIn.set(false);
      this.errorMessage.set('Login failed. Please check your credentials and try again.');
      return false;
    }
  }

  logged() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    this.isLoggedIn.set(false);
    localStorage.removeItem('token');
  }
}
