import { Routes } from '@angular/router';
import { ProductBoard } from './features/products/product-board/product-board';
import { Home } from './shared/components/home/home';
import { AboutUs } from './shared/components/about-us/about-us';
import { Register } from './shared/components/register/register';
import { Login } from './shared/components/login/login';
import { ProductCreate } from './features/products/product-create/product-create';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'catalog', component: ProductBoard },
    { path: 'about', component: AboutUs },
    { path: 'register', component: Register },
    { path: 'login', component: Login },
    { path: 'create', component: ProductCreate },
];
