import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductHttpService } from "../product-http.service";
import { CommonModule } from "@angular/common";
import { switchMap } from "rxjs";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./details.html",
  styleUrls: ["./details.css"],
})
export class Details {

  private route = inject(ActivatedRoute);
  private productService = inject(ProductHttpService);

  product$ = this.route.paramMap.pipe(
    switchMap(params => {
      const id = Number(params.get("id"));
      return this.productService.getProductById(id);
    })
  );

}