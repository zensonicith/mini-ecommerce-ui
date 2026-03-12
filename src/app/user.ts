export interface CustomerInfo {
    id: number;
    name: string;
    address: string;
    userName: string;
    city: string;
    role: string;
}

export interface AuthResponse {
    token: string;
    customer: CustomerInfo;
}