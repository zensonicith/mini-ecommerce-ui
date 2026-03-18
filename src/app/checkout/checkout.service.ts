import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderResponse } from './order';

@Injectable({
    providedIn: 'root'
})
export class CheckoutService {

    private http = inject(HttpClient);

    verifySession(sessionId: string): Observable<OrderResponse> {
        return this.http.get<OrderResponse>(
            `api/payment/verify-session?sessionId=${sessionId}`
        );
    }
}