import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ProductAdminComponent } from './product_table';
import { ProductHttpService } from '../product-http.service';
import { ChangeDetectorRef } from '@angular/core';
import { ProductInfo } from '../product';
import { of } from 'rxjs';

describe('ProductAdminComponent', () => {
  let component: ProductAdminComponent;
  let fixture: ComponentFixture<ProductAdminComponent>;

  const mockProductService = {
    getAllProducts: jest.fn(),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
    uploadImage: jest.fn(),
  };

  const mockProducts: ProductInfo[] = [
    { id: 1, productName: 'P1', description: 'D1', price: 100, unit: 10, imageUrl: 'img1.jpg' },
    { id: 2, productName: 'P2', description: 'D2', price: 200, unit: 20, imageUrl: 'img2.jpg' },
  ];

  const emptyForm = {
    productName: '',
    description: '',
    unit: 0,
    price: 0,
    imageUrl: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAdminComponent],
      providers: [
        { provide: ProductHttpService, useValue: mockProductService },
        { provide: ChangeDetectorRef, useValue: { markForCheck: jest.fn() } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAdminComponent);
    component = fixture.componentInstance;

    jest.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize default state', () => {
      expect(component).toBeTruthy();
      expect(component.products).toEqual([]);
      expect(component.form).toEqual(emptyForm);
    });
    it('should load products on init', async () => {
      mockProductService.getAllProducts.mockResolvedValue(mockProducts);
      await component.ngOnInit();
      expect(mockProductService.getAllProducts).toHaveBeenCalled();
      expect(component.products).toEqual(mockProducts);
    });
  });

  describe('Modal Logic', () => {
    it('should open add modal and reset form', () => {
      component.form.productName = 'test';
      component.openAdd();
      expect(component.modal).toBe('add');
      expect(component.previewImage).toBeNull();
      expect(component.form).toEqual(emptyForm);
    });
    it('should populate form when editing', () => {
      component.openEdit(mockProducts[0]);
      expect(component.modal).toBe('edit');
      expect(component.selected).toEqual(mockProducts[0]);
      expect(component.form.productName).toBe(mockProducts[0].productName);
    });
    it('should open delete modal', () => {
      component.openDelete(mockProducts[0]);
      expect(component.modal).toBe('delete');
      expect(component.selected).toEqual(mockProducts[0]);
    });
    it('should close modal and clear state', () => {
      component.modal = 'delete';
      component.selected = mockProducts[0];
      component.closeModal();
      expect(component.modal).toBeNull();
      expect(component.selected).toBeNull();
    });
  });

  describe('File Handling', () => {
    it('should ignore when no file selected', () => {
      component.onFileSelected({ target: { files: [] } });
      expect(mockProductService.uploadImage).not.toHaveBeenCalled();
    });
    it('should upload image and set imageUrl', fakeAsync(() => {
      const mockUrl = 'https://example.com/uploaded.jpg';
      mockProductService.uploadImage.mockReturnValue(
        of({ imageUrl: mockUrl })
      );
      const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
      const event = { target: { files: [file] } };
      component.onFileSelected(event);
      tick();
      expect(mockProductService.uploadImage).toHaveBeenCalledWith(file);
      expect(component.form.imageUrl).toBe(mockUrl);
    }));

    it('should set preview image from FileReader', () => {
      const file = new File([''], 'test.jpg', { type: 'image/jpeg' });
      const mockReader: any = {
        readAsDataURL: jest.fn(),
        result: 'data:image/jpeg;base64,test',
        onload: null,
      };
      jest
        .spyOn(window as any, 'FileReader')
        .mockImplementation(() => mockReader);
      const event = { target: { files: [file] } };
      component.onFileSelected(event);
      mockReader.onload();
      expect(component.previewImage).toBe('data:image/jpeg;base64,test');
    });
  });
  describe('CRUD Actions', () => {
    beforeEach(() => {
      mockProductService.getAllProducts.mockResolvedValue(mockProducts);
    });
    it('should add product', async () => {
      mockProductService.createProduct.mockResolvedValue(true);
      await component.addProduct();
      expect(mockProductService.createProduct).toHaveBeenCalled();
      expect(mockProductService.getAllProducts).toHaveBeenCalled();
      expect(component.modal).toBeNull();
    });
    it('should edit product', async () => {
      component.selected = mockProducts[0];
      mockProductService.updateProduct.mockResolvedValue(true);
      await component.editProduct();
      expect(mockProductService.updateProduct).toHaveBeenCalledWith(
        mockProducts[0].id,
        component.form
      );
      expect(component.modal).toBeNull();
    });

    it('should not edit when selected is null', async () => {
      component.selected = null;
      await component.editProduct();
      expect(mockProductService.updateProduct).not.toHaveBeenCalled();
    });
    it('should delete product', async () => {
      component.selected = mockProducts[1];
      mockProductService.deleteProduct.mockResolvedValue(true);
      await component.deleteProduct();
      expect(mockProductService.deleteProduct).toHaveBeenCalledWith(
        mockProducts[1].id
      );
      expect(component.modal).toBeNull();
    });

    it('should not delete when selected is null', async () => {
      component.selected = null;
      await component.deleteProduct();
      expect(mockProductService.deleteProduct).not.toHaveBeenCalled();
    });
  });
  describe('Accessors', () => {
    it('should return productName from getter', () => {
      component.selected = mockProducts[0];
      expect(component.productName).toBe('P1');
      component.selected = null;
      expect(component.productName).toBe('');
    });
  });
});