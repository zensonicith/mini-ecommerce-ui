import { Component, input } from '@angular/core';
import { ProductInfo } from '../product';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-product',
  imports: [RouterLink],
  template: `
    <section class="listing">
      <img
        class="listing-photo"
        [src]="product().photo"
        alt="Exterior photo of {{ product().name }}"
        crossorigin
      />
      <h2 class="listing-heading">{{ product().name }}</h2>
      <p class="listing-location">{{ product().city }}, {{ product().state }}</p>
      <a [routerLink]="['/details', product().id]">Learn More</a>
    </section>
  `,
  styleUrls: ['./product.css'],
})
export class Product {
  product = input.required<ProductInfo>();
}
