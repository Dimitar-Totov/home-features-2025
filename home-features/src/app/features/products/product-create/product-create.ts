import { Component, inject } from '@angular/core';
import { AuthService, ProductService } from '../../../core/services';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-create',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css',
  standalone: true,
})
export class ProductCreate {
  productFormGroup: FormGroup;

  
  constructor() {
    this.productFormGroup = new FormGroup({
      name: new FormControl('', [Validators.minLength(5)]),
      category: new FormControl(''),
      price: new FormControl(''),
      color: new FormControl(''),
      dimensions: new FormControl(''),
      description: new FormControl(''),
    })
  }
  
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  private router = inject(Router);
  
  readonly isLoggedIn = this.authService.isLoggedIn();
  readonly currentUser = this.authService.currentUser();

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    const productData = this.productFormGroup.value;
    const ownerId = this.currentUser?.id;
    this.productService.createProduct(productData,ownerId!).subscribe({
      next: () => {
        this.router.navigate(['/catalog'])
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
