import { Component, input } from "@angular/core";
import { ProductInfo } from "../product";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-product",
  imports: [RouterLink],
  templateUrl: "./product.html",
  styleUrls: ["./product.scss"],
})
export class Product {
  product = input.required<ProductInfo>();
}
