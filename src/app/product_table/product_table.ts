import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductInfo } from '../product';
import { ProductHttpService } from '../product-http.service';

@Component({
  selector: "app-product-admin",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./product_table.html",
  styleUrls: ["./product_table.scss"],
})
export class ProductAdminComponent implements OnInit {

  productService = inject(ProductHttpService);
  changedetectorRef = inject(ChangeDetectorRef);

  products: ProductInfo[] = [];
  previewImage: string | null = null;

  modal: "add" | "edit" | "delete" | null = null;
  selected: ProductInfo | null = null;

  form: Omit<ProductInfo, 'id'> = {
    productName: '',
    description: '',
    unit: 0,
    price: 0,
    imageUrl: "",
  };

  async ngOnInit() {
    await this.loadProducts();
  }

  async loadProducts() {
    this.products = await this.productService.getAllProducts();
    this.changedetectorRef.markForCheck();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result as string;
      this.changedetectorRef.markForCheck();
    };
    reader.readAsDataURL(file);

    // upload file
    this.productService.uploadImage(file).subscribe((res: any) => {
      this.form.imageUrl = res.imageUrl;
      this.changedetectorRef.markForCheck();
    });
  }

  openAdd() {
    this.modal = "add";
    this.previewImage = null;
    this.form = {
      productName: '',
      description: '',
      unit: 0,
      price: 0,
      imageUrl: "",
    };
  }

  openEdit(p: ProductInfo) {
    this.modal = "edit";
    this.selected = p;
    this.previewImage = p.imageUrl;
    this.form = {
      productName: p.productName,
      description: p.description,
      unit: p.unit,
      price: p.price,
      imageUrl: p.imageUrl,
    };
  }

  openDelete(p: ProductInfo) {
    this.modal = "delete";
    this.selected = p;
  }

  closeModal() {
    this.modal = null;
    this.selected = null;
  }

  async addProduct() {
    await this.productService.createProduct(this.form);
    await this.loadProducts();
    this.closeModal();
  }

  async editProduct() {
    if (!this.selected) return;

    await this.productService.updateProduct(this.selected.id, this.form);
    await this.loadProducts();
    this.closeModal();
  }

  async deleteProduct() {
    if (!this.selected) return;

    await this.productService.deleteProduct(this.selected.id);
    await this.loadProducts();
    this.closeModal();
  }

  get productName(): string {
    return this.selected?.productName ?? "";
  }
}