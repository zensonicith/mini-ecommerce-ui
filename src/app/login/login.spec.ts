import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Login } from '../login/login';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { signal } from '@angular/core';

describe('JestTest', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let mockLoginService: any;
  let mockRouter: any;
  beforeEach(async () => {
    mockLoginService = {
      login: jest.fn(),
      isLoggedIn: signal<boolean>(false),
      errorMessage: signal<string | null>(null),
    };
    mockRouter = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: mockLoginService },
        { provide: Router, useValue: mockRouter }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login successfully', async () => {
    mockLoginService.login.mockResolvedValue(true);
    const account = { username: 'johndoe', password: '123123' };
    component.loginForm.setValue(account);
    await component.submitLogin();
    expect(mockLoginService.login).toHaveBeenCalledWith(account.username, account.password);
    expect(mockLoginService.isLoggedIn()).toBe(true);
  });

  it('login failed', async () => {
    mockLoginService.login.mockResolvedValue(false);
    const account = { username: 'johndoe', password: 'wrongpassword' };
    component.loginForm.setValue(account);
    await component.submitLogin();
    expect(mockLoginService.login).toHaveBeenCalledWith(account.username, account.password);
    expect(mockLoginService.isLoggedIn()).toBe(false);
  });
});
