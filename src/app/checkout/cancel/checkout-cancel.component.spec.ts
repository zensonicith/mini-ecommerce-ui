import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CheckoutCancelComponent } from './checkout-cancel.component';
import { Router } from '@angular/router';

describe('CheckoutCancelComponent', () => {

    let fixture: ComponentFixture<CheckoutCancelComponent>;
    let component: CheckoutCancelComponent;

    const routerMock = {
        navigate: jest.fn()
    };

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [CheckoutCancelComponent],
            providers: [
                { provide: Router, useValue: routerMock }
            ]
        });

        fixture = TestBed.createComponent(CheckoutCancelComponent);
        component = fixture.componentInstance;

        jest.clearAllMocks();
    });

    it('should navigate home when backHome is called', () => {

        component.backHome();

        expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    });

});