import { Routes } from '@angular/router';
import { ProductBoard } from './features/products/product-board/product-board';
import { Home } from './shared/components/home/home';
import { AboutUs } from './shared/components/about-us/about-us';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'catalog', component: ProductBoard },
    { path: 'about', component: AboutUs }
];
