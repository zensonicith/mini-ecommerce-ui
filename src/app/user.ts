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

export interface RegisterCustomerRequest {
    username: string;
    password: string;
    name: string;
    address: string;
    city: string;
}