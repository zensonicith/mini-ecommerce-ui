import { Component, input } from "@angular/core";
import { ProductInfo } from "../product";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-product",
  imports: [RouterLink],
  template: `
    <section class="listing">
      <h2 class="listing-heading">{{ product().productName }}</h2>
      <a [routerLink]="['/details', product().id]">Details</a>
    </section>
  `,
  styleUrls: ["./product.css"],
})
export class Product {
  product = input.required<ProductInfo>();
}
