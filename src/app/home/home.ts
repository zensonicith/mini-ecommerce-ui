import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { Product } from "../product/product";
import { ProductInfo } from "../product";
import { ProductHttpService } from "../product-http.service";
@Component({
  selector: "app-home",
  imports: [Product],
  templateUrl: "./home.html",
  styleUrls: ["./home.scss"],
})
export class Home {
  productList: ProductInfo[] = [];
  filteredList: ProductInfo[] = [];
  productService: ProductHttpService = inject(ProductHttpService);
  changeDetectorRef = inject(ChangeDetectorRef);
  constructor() {
    this.loadProducts();
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

  loadProducts(): void {
    this.productService.getAllProducts().then((productList: ProductInfo[] | null) => {
      this.productList = productList ?? [];
      this.filteredList = this.productList;
      this.changeDetectorRef.markForCheck();
    });
  }
}
