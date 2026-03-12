import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { ProductInfo } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  // Relative path — BASE_URL interceptor will prepend the base URL
  private url = 'api/products';

  constructor(private http: HttpClient) {}

  async getAllProducts(): Promise<ProductInfo[]> {
    return firstValueFrom(this.http.get<ProductInfo[]>(this.url)).then(
      (data) => data ?? []
    );
  }

  async getProductById(id: number): Promise<ProductInfo | undefined> {
    return firstValueFrom(
      this.http.get<ProductInfo>(`${this.url}/${id}`)
    ).then((data) => data ?? undefined);
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`
    );
  }

  async createProduct(product: Omit<ProductInfo, 'id'>): Promise<ProductInfo> {
    return firstValueFrom(
      this.http.post<ProductInfo>(this.url, product)
    );
  }

  async updateProduct(
    id: number,
    product: Omit<ProductInfo, 'id'>
  ): Promise<boolean> {
    return firstValueFrom(
      this.http.put<void>(`${this.url}/${id}`, product)
    )
      .then(() => true)
      .catch(() => false);
  }

  async deleteProduct(id: number): Promise<boolean> {
    return firstValueFrom(
      this.http.delete<void>(`${this.url}/${id}`)
    )
      .then(() => true)
      .catch(() => false);
  }
}
