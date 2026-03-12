import { Injectable } from "@angular/core";
import { ProductInfo } from "./product";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  url = "http://localhost:5291/api/products";
  async getAllProducts(): Promise<ProductInfo[]> {
    const data = await fetch(this.url);
    return (await data.json()) ?? [];
  }

  async getProductById(
    id: number,
  ): Promise<ProductInfo | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    const locationJson = await data.json();
    return locationJson ?? {};
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(
      `Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`,
    );
  }
  async createProduct(product: Omit<ProductInfo, "id">): Promise<ProductInfo> {
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    return await response.json();
  }

  async updateProduct(
    id: number,
    product: Omit<ProductInfo, "id">
  ): Promise<boolean> {
    const response = await fetch(`${this.url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    return response.ok;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const response = await fetch(`${this.url}/${id}`, {
      method: "DELETE",
    });

    return response.ok;
  }

}
