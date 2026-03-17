import { Component, inject } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ProductHttpService } from "../product-http.service";
import { CommonModule } from "@angular/common";
import { filter, map, switchMap } from "rxjs";

@Component({
  selector: "app-details",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./details.html",
  styleUrls: ["./details.scss"],
})
export class Details {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductHttpService);

  readonly product$ = this.route.paramMap.pipe(
    map((params) => params.get("id")),
    filter((id): id is string => !!id),
    map((id) => Number(id)),
    switchMap((id) => this.productService.getProductById(id)),
  );
}
