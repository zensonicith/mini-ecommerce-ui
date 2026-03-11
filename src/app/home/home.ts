import { ChangeDetectorRef, Component, inject } from "@angular/core";
import { Product } from "../product/product";
import { ProductInfo } from "../product";
import { ProductService } from "../product.service";
@Component({
  selector: "app-home",
  imports: [Product],
  template: `
    <!-- <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter />
        <button
          class="primary"
          type="button"
          (click)="filterResult(filter.value)"
        >
          Search
        </button>
      </form>
    </section> -->
    <section class="results">
      @for (product of filteredList; track $index) {
        <app-product [product]="product" />
      }
    </section>
  `,
  styleUrls: ["./home.css"],
})
export class Home {
  productList: ProductInfo[] = [];
  filteredList: ProductInfo[] = [];
  productService: ProductService = inject(ProductService);
  changeDetectorRef = inject(ChangeDetectorRef);
  constructor() {
    this.productService.getAllPoducts().then((productList: ProductInfo[]) => {
      this.productList = productList;
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
