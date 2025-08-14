import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../models';
import { AuthService, ProductService } from '../../../core/services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-board',
  imports: [RouterLink],
  templateUrl: './product-board.html',
  styleUrl: './product-board.css',
  standalone: true,
})
export class ProductBoard implements OnInit {
  products: Product[] = [];
  private authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.log(err),
    })
  }

}
