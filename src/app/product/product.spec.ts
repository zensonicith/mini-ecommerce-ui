import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Product } from './product';
import { ProductInfo } from '../product';
import { provideRouter } from '@angular/router';

describe('Product Component', () => {
  let component: Product;
  let fixture: ComponentFixture<Product>;

  const mockProduct: ProductInfo = {
    id: 1,
    productName: 'Test Product',
    description: 'Test Description',
    price: 100,
    unit: 10,
    imageUrl: 'test.jpg',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Product], 
      providers: [provideRouter([])],
    }).compileComponents();
    fixture = TestBed.createComponent(Product);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', mockProduct);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render product name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const title = compiled.querySelector('.listing-heading');
    expect(title?.textContent).toContain('Test Product');
  });
    it('should render correct href', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('a');
    expect(link?.getAttribute('href')).toBe('/details/1');
    });
});