import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CheckoutSuccessComponent } from './checkout-success.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CheckoutService } from '../checkout.service';
import { of, throwError } from 'rxjs';

describe('CheckoutSuccessComponent', () => {

    let fixture: ComponentFixture<CheckoutSuccessComponent>;
    let component: CheckoutSuccessComponent;

    let routerMock = {
        navigate: jest.fn()
    };

    let serviceMock = {
        verifySession: jest.fn()
    };

    const createComponent = (sessionId: string | null) => {

        TestBed.configureTestingModule({
            imports: [CheckoutSuccessComponent],
            providers: [
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            queryParamMap: {
                                get: jest.fn().mockReturnValue(sessionId)
                            }
                        }
                    }
                },
                { provide: Router, useValue: routerMock },
                { provide: CheckoutService, useValue: serviceMock }
            ]
        });

        fixture = TestBed.createComponent(CheckoutSuccessComponent);
        component = fixture.componentInstance;
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // ✅ case 1: no session id
    it('should navigate home if no session id', () => {

        createComponent(null);

        fixture.detectChanges();

        expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    });

    // ✅ case 2: success verify
    it('should call verifySession and set order', () => {

        const fakeOrder = { id: 1 };

        serviceMock.verifySession.mockReturnValue(of(fakeOrder));

        createComponent('abc123');

        fixture.detectChanges();

        expect(serviceMock.verifySession).toHaveBeenCalledWith('abc123');
        expect(component.order).toEqual(fakeOrder);
        expect(component.loading).toBe(false);
    });

    // ✅ case 3: error verify
    it('should navigate cancel on verify error', () => {

        serviceMock.verifySession.mockReturnValue(
            throwError(() => new Error())
        );

        createComponent('abc123');

        fixture.detectChanges();

        expect(routerMock.navigate)
            .toHaveBeenCalledWith(['/checkout/cancel']);
    });

    // ✅ case 4: goHome
    it('should navigate home when goHome called', () => {

        createComponent('abc');

        component.goHome();

        expect(routerMock.navigate).toHaveBeenCalledWith(['/']);
    });

});