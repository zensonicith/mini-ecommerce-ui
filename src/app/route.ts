import { Routes } from "@angular/router";
import { Home } from "./home/home";
import { Details } from "./details/details";
import { Login } from "./login/login";
import { ProductAdminComponent } from "./product_table/product_table";

const routeConfig: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home page'
    },
    {
        path: 'details/:id',
        component: Details,
        title: 'Home details',
    },
    {
        path: 'login',
        component: Login,
        title: 'Login'
    },
    {
        path: 'admin',
        component: ProductAdminComponent,
        title: 'Product Admin'
    }
]

export default routeConfig