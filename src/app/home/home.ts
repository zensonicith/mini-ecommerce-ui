import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { Product } from "../product/product";
import { ProductInfo } from "../product";
import { ProductService } from "../product.service";
@Component({
  selector: "app-home",
  imports: [Product],
  templateUrl: "./home.html",
  styleUrls: ["./home.css"],
})
export class Home {
  productList: ProductInfo[] = [];
  filteredList: ProductInfo[] = [];
  productService: ProductService = inject(ProductService);
  changeDetectorRef = inject(ChangeDetectorRef);
  constructor() {
    this.productService.getAllProducts().then((productList: ProductInfo[] | null) => {
        this.productList = productList ?? [];
        this.filteredList = this.productList;
        this.changeDetectorRef.markForCheck();
      });
  }
  filterResult(value: string) {
    if (!value) {
      this.filteredList = this.productList;
      return;
    }
    this.filteredList = this.productList.filter((product) =>
      product.productName.toLowerCase().includes(value.toLocaleLowerCase()),
    );
  }
}
