import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AuthService, ProductService } from '../../../core/services';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Product } from '../../../models';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css'
})
export class ProductDetails implements OnInit {
  product: Product = { name: '', category: '', price: '', description: '', dimensions: '', imageUrl: '', color: '', _id: 0, ownerId: '', likes: [] };
  productId!: string;
  isOwner: boolean = false;
  alreadyLiked: string = '';

  private router = inject(Router);

  private authService = inject(AuthService);
  readonly currentUser = this.authService.currentUser();
  readonly isLoggedIn = this.authService.isLoggedIn();

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId')!;
    this.productService.getProduct(this.productId).subscribe({
      next: (data) => {
        this.product = data;
        this.isOwner = this.currentUser?.id === this.product.ownerId;
      },
      error: (err) => console.log(err),
    });

  }

  deleteButton(): void {
    const confirmed = confirm('Are you sure you want to delete this product ?');
    if (confirmed) {
      this.productService.deleteProduct(this.productId).subscribe({
        next: () => this.router.navigate(['/catalog']),
        error: (err) => console.log(err),
      })
    }
  }

  likeButton(): void {
    this.productService.likeProduct(this.productId, this.currentUser?.id!).subscribe({
      next: (updatedLikes: any) => {
        this.product.likes = updatedLikes;
      },
      error: (err: HttpErrorResponse) => {
        if(err.status === 409){
          this.alreadyLiked = 'You have already liked this Product!';
          setTimeout(() => this.alreadyLiked = '', 5000);
        }
      }
    })
  }
}
