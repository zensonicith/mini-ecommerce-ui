import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CustomerInfo } from './user';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  httpClient = inject(HttpClient);
  constructor() {}

  async getCustomerInfo() : Promise<CustomerInfo> {
    return firstValueFrom(this.httpClient.get<CustomerInfo>('api/customers/me'));
  }
}
