import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: ` 
    <main>
      <header class="navbar">
        <a class="brand-link" [routerLink]="['/']">
          <div class="brand-name">
            <img class="brand-logo" src="/public/logo.svg" alt="logo" aria-hidden="true" />
          </div>
        </a>

        <div class="auth-section">
          @if (loginService.isLoggedIn()) {
            <span class="user-name">{{ loginService.currentCustomer()?.name || loginService.currentCustomer()?.userName }}</span>
            <button class="logout-btn" type="button" (click)="logout()">Logout</button>
          } @else {
            <a class="login-link" [routerLink]="['/login']">Login</a>
          }
        </div>
      </header>

      <section class="content">
        <router-outlet />
      </section>
    </main>`,
  styleUrls: ['./app.css'],
})
export class App {
  loginService = inject(LoginService);

  logout() {
    this.loginService.logout();
  }
}
