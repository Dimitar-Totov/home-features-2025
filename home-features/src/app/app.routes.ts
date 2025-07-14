import { Routes } from '@angular/router';
import { ProductBoard } from './features/products/product-board/product-board';
import { Home } from './shared/components/home/home';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'catalog', component: ProductBoard }
];
