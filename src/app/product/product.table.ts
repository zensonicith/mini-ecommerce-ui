import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product } from './product.model';

@Component({
  selector: 'app-product-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css']
})
export class ProductAdminComponent {

  products: Product[] = [
    { id: 1, productName: "Wireless Headphones", unit: 120, price: 89.99 },
    { id: 2, productName: "Mechanical Keyboard", unit: 45, price: 149.5 },
    { id: 3, productName: "USB-C Hub", unit: 200, price: 34.95 },
    { id: 4, productName: "4K Webcam", unit: 78, price: 199.0 },
  ];

  modal: 'add' | 'edit' | 'delete' | null = null;

  selected: Product | null = null;

  form = {
    productName: '',
    unit: 0,
    price: 0
  };

  search = '';

  sortKey: keyof Product = 'id';
  sortDir: 'asc' | 'desc' = 'asc';

  toast: { msg: string, type: string } | null = null;

  showToast(msg: string, type = 'success') {
    this.toast = { msg, type };
    setTimeout(() => this.toast = null, 2800);
  }

  openAdd() {
    this.modal = 'add';
    this.form = { productName: '', unit: 0, price: 0 };
  }

  openEdit(p: Product) {
    this.modal = 'edit';
    this.selected = p;
    this.form = { ...p };
  }

  openDelete(p: Product) {
    this.modal = 'delete';
    this.selected = p;
  }

  closeModal() {
    this.modal = null;
    this.selected = null;
  }

  addProduct() {
    const newId = Math.max(...this.products.map(p => p.id)) + 1;

    this.products.push({
      id: newId,
      ...this.form
    });

    this.closeModal();
    this.showToast('Product added');
  }

  editProduct() {
    if (!this.selected) return;

    const index = this.products.findIndex(p => p.id === this.selected!.id);

    this.products[index] = {
      id: this.selected.id,
      ...this.form
    };

    this.closeModal();
    this.showToast('Product updated');
  }

  deleteProduct() {
    if (!this.selected) return;

    this.products = this.products.filter(p => p.id !== this.selected!.id);

    this.closeModal();
    this.showToast('Product deleted', 'danger');
  }

  handleSort(key: keyof Product) {
    if (this.sortKey === key) {
      this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortKey = key;
      this.sortDir = 'asc';
    }
  }

  get filteredProducts() {

    let result = this.products.filter(p =>
      p.productName.toLowerCase().includes(this.search.toLowerCase())
      || p.id.toString().includes(this.search)
    );

    result.sort((a: any, b: any) => {
      const av = a[this.sortKey];
      const bv = b[this.sortKey];

      let cmp = av > bv ? 1 : -1;

      return this.sortDir === 'asc' ? cmp : -cmp;
    });

    return result;
  }

}