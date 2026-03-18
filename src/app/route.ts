import { Routes } from "@angular/router";
import { Home } from "./home/home";
import { Details } from "./details/details";
import { Login } from "./login/login";
import { Register } from "./register/register";
import { ProductAdminComponent } from "./product_table/product_table";
import { authGuard } from "./auth.guard";

const routeConfig: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home page',
        canActivate: [authGuard]
    },
    {
        path: 'details/:id',
        component: Details,
        title: 'Home details',
        canActivate: [authGuard]
    },
    {
        path: 'register',
        component: Register,
        title: 'Register'
    },
    {
        path: 'login',
        component: Login,
        title: 'Login'
    },
    {
        path: 'admin',
        component: ProductAdminComponent,
        title: 'Product Admin',
        canActivate: [authGuard]
    },
    {
        path: 'checkout/success',
        loadComponent: () =>
            import('./checkout/success/checkout-success.component')
                .then(m => m.CheckoutSuccessComponent)
    },
    {
        path: 'checkout/cancel',
        loadComponent: () =>
            import('./checkout/cancel/checkout-cancel.component')
                .then(m => m.CheckoutCancelComponent)
    }
]

export default routeConfig