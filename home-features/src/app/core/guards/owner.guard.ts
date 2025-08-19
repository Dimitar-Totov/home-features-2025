import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService, ProductService } from '../services';

export function ownerGuard(route: ActivatedRouteSnapshot) {
    const productService = inject(ProductService);
    const authService = inject(AuthService);
    const router = inject(Router);

    const productId = route.paramMap.get('productId');
    const currentUserId = authService.currentUser()?.id;

    productService.getProduct(productId!).subscribe({
        next: (data) => {
            if (data.ownerId !== currentUserId) {
                router.navigate(['/']);
            }
        },
        error: (err) => console.log(err),
    });
}