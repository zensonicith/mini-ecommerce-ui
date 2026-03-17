import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Details } from './details';
import { ProductHttpService } from '../product-http.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';

describe('Details Component', () => {
    let fixture: ComponentFixture<Details>;
    let mockService: { getProductById: jest.Mock };
    let mockGetParam: jest.Mock;

    const mockProduct = {
        id: 42,
        productName: 'Test SP',
        price: 999,
        unit: 10,
        imageUrl: '/test.jpg',
    };

    beforeEach(async () => {
        mockGetParam = jest.fn().mockReturnValue('42');

        mockService = {
            getProductById: jest.fn(),
        };

        await TestBed.configureTestingModule({
            imports: [Details, CommonModule],
            providers: [
                { provide: ProductHttpService, useValue: mockService },
                {
                    provide: ActivatedRoute,
                    useValue: { paramMap: of({ get: mockGetParam }) },
                },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(Details);
    });

    it('should create the component successfully', () => {
        expect(fixture.componentInstance).toBeTruthy();
    });

    describe('when a valid id is provided', () => {
        beforeEach(() => {
            mockService.getProductById.mockReturnValue(of(mockProduct));
        });

        it('should call the service with the correct id and display product information', async () => {
            fixture.detectChanges();
            await fixture.whenStable();

            expect(mockService.getProductById).toHaveBeenCalledWith(42);

            const el = fixture.nativeElement;
            expect(el.querySelector('.product-details__title')?.textContent?.trim()).toContain('Test SP');
            expect(el.querySelectorAll('.product-details__feature')[0]?.textContent?.trim()).toContain('999');
            expect((el.querySelector('img') as HTMLImageElement)?.alt).toContain('Test SP');
            expect((el.querySelector('img') as HTMLImageElement)?.src).toContain('/test.jpg');
        });
    });

    it('should not display anything when the product does not exist (undefined)', async () => {
        mockService.getProductById.mockReturnValue(of(undefined));

        fixture.detectChanges();
        await fixture.whenStable();

        const article = fixture.nativeElement.querySelector('article.product-details');
        expect(article).toBeNull();
    });

    it('should not call the service when the id is invalid (null)', async () => {
        mockGetParam.mockReturnValue(null);

        fixture = TestBed.createComponent(Details);

        fixture.detectChanges();
        await fixture.whenStable();

        expect(mockService.getProductById).not.toHaveBeenCalled();

        const article = fixture.nativeElement.querySelector('article.product-details');
        expect(article).toBeNull();
    });
});