import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { CheckoutService } from '../checkout.service';
import { OrderResponse } from '../order';

@Component({
    standalone: true,
    selector: 'app-checkout-success',
    imports: [NgIf],
    templateUrl: './checkout-success.component.html',
    styleUrl: './checkout-success.component.scss'
})
export class CheckoutSuccessComponent implements OnInit {

    private route = inject(ActivatedRoute);
    private service = inject(CheckoutService);
    private router = inject(Router);

    order?: OrderResponse;
    loading = true;

    ngOnInit(): void {

        const sessionId =
            this.route.snapshot.queryParamMap.get('session_id');

        if (!sessionId) {
            this.router.navigate(['/']);
            return;
        }

        this.service.verifySession(sessionId).subscribe({
            next: (res: any) => {
                this.order = res;
                this.loading = false;
            },
            error: () => {
                this.router.navigate(['/checkout/cancel']);
            }
        });
    }

    goHome() {
        this.router.navigate(['/']);
    }
}