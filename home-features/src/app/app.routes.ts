import { Routes } from '@angular/router';
import { authGuard, guestGuard } from './core/guards';
import { ownerGuard } from './core/guards/owner.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./features/home/home').then(c => c.Home) },
    { path: 'catalog', loadComponent: () => import('./features/products/product-board/product-board').then(c => c.ProductBoard) },
    { path: 'catalog/:productId/details', loadComponent: () => import('./features/products/product-details/product-details').then(c => c.ProductDetails) },
    { path: 'catalog/:productId/edit', loadComponent: () => import('./features/products/product-edit/product-edit').then(c => c.ProductEdit), canActivate: [ownerGuard,authGuard] },
    { path: 'about', loadComponent: () => import('./features/about-us/about-us').then(c => c.AboutUs) },
    { path: 'register', loadComponent: () => import('./features/auth/register/register').then(c => c.Register), canActivate: [guestGuard] },
    { path: 'login', loadComponent: () => import('./features/auth/login/login').then(c => c.Login), canActivate: [guestGuard] },
    { path: 'create', loadComponent: () => import('./features/products/product-create/product-create').then(c => c.ProductCreate), canActivate: [authGuard] },
    { path: '**', loadComponent: () => import('./shared/components/not-found/not-found').then(c => c.NotFound) },
];
