import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductInfo } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product_table.html',
  styleUrls: ['./product_table.css']
})
export class ProductAdminComponent implements OnInit {
  productService = inject(ProductService);
  products: ProductInfo[] = [];
  modal: 'add' | 'edit' | 'delete' | null = null;
  selected: ProductInfo | null = null;
  form: Omit<ProductInfo, 'id'> = {
    url: '',
    productName: '',
    unit: 0,
    price: 0
  };
  toast: { msg: string, type: string } | null = null;
  async ngOnInit() {
    await this.loadProducts();
  }
  async loadProducts() {
    this.products = await this.productService.getAllProducts();
  }
  showToast(msg: string, type = 'success') {
    this.toast = { msg, type };
    setTimeout(() => this.toast = null, 2800);
  }
  openAdd() {
    this.modal = 'add';
    this.form = {
      url: '',
      productName: '',
      unit: 0,
      price: 0
    };
  }
  openEdit(p: ProductInfo) {
    this.modal = 'edit';
    this.selected = p;

    this.form = {
      url: p.url,
      productName: p.productName,
      unit: p.unit,
      price: p.price
    };
  }
  openDelete(p: ProductInfo) {
    this.modal = 'delete';
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
    this.showToast('Product added');
  }

  async editProduct() {
    if (!this.selected) return;
    await this.productService.updateProduct(
      this.selected.id,
      this.form
    );
    await this.loadProducts();
    this.closeModal();
    this.showToast('Product updated');
  }


  async deleteProduct() {
    if (!this.selected) return;
    await this.productService.deleteProduct(this.selected.id);
    await this.loadProducts();
    this.closeModal();
    this.showToast('Product deleted', 'danger');
  }
}