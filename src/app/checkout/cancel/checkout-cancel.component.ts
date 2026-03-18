import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    standalone: true,
    selector: 'app-checkout-cancel',
    templateUrl: './checkout-cancel.component.html',
    styleUrl: './checkout-cancel.component.scss'
})
export class CheckoutCancelComponent {

    private router = inject(Router);

    backHome() {
        this.router.navigate(['/']);
    }
}