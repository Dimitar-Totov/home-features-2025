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
      name: new FormControl('', [Validators.pattern(/^[A-Za-z]{5,}$/), Validators.required]),
      category: new FormControl('', [Validators.pattern(/^[A-Za-z]{3,}$/)]),
      price: new FormControl('', [Validators.pattern(/^[1-9]\d*[$£]$/)]),
      color: new FormControl('', [Validators.pattern(/^[A-Za-z]{3,}$/)]),
      dimensions: new FormControl('', [Validators.pattern(/^[A-Za-z0-9]{1,15}$/)]),
      description: new FormControl('', [Validators.pattern(/^[A-Za-z0-9.!?]{10,}$/)]),
      imageUrl: new FormControl('', [Validators.pattern(/^(https?:\/\/)[A-Za-z]{5,}.*$/), Validators.required]),
    })
  }

  private authService = inject(AuthService);
  private productService = inject(ProductService);
  private router = inject(Router);

  readonly isLoggedIn = this.authService.isLoggedIn();
  readonly currentUser = this.authService.currentUser();

  imageurlErrorMessage: string = '';
  nameErrorMessage: string = '';
  categoryErrorMessage: string = '';
  priceErrorMessage: string = '';
  colorErrorMessage: string = '';
  dimensionsErrorMessage: string = '';
  descriptionErrorMessage: string = '';

  onCancel(): void {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.productFormGroup.valid) {
      const productData = this.productFormGroup.value;
      productData.likes = [];
      const ownerId = this.currentUser?.id;
      this.productService.createProduct(productData, ownerId!).subscribe({
        next: () => {
          this.router.navigate(['/catalog'])
        },
        error: (err) => {
          console.log(err);
        }
      })
    } else {
      const imageurlError = this.productFormGroup.get('imageUrl');
      const nameError = this.productFormGroup.get('name');
      const categoryError = this.productFormGroup.get('category');
      const priceError = this.productFormGroup.get('price');
      const colorError = this.productFormGroup.get('color');
      const dimensionsError = this.productFormGroup.get('dimensions');
      const descriptionError = this.productFormGroup.get('description');

      if (imageurlError?.errors?.['pattern']) {
        this.imageurlErrorMessage = 'Invalid url address!';
      }
      if (imageurlError?.hasError('required')) {
        this.imageurlErrorMessage = 'URL Address is empty!'
      }

      if (nameError?.errors?.['pattern']) {
        this.nameErrorMessage = 'The name of the product must contain only letters and be at least 5 characters long!';
      }
      if (nameError?.hasError('required')) {
        this.nameErrorMessage = 'Name field is empty!';
      }

      if (categoryError?.errors?.['pattern']) {
        this.categoryErrorMessage = 'The category of the product must contain only letters and be at least 3 characters long!';
      }
      if (categoryError?.hasError('required')) {
        this.categoryErrorMessage = 'Category field is empty!';
      }

      if (priceError?.errors?.['pattern']) {
        this.priceErrorMessage = 'The price of the product must contain only numbers and have at least 2 digits which end with £ or $!';
      }
      if (priceError?.hasError('required')) {
        this.priceErrorMessage = 'Price field is empty!';
      }

      if (colorError?.errors?.['pattern']) {
        this.colorErrorMessage = 'The color of the product must contain only letters and be at least 3 characters long!';
      }
      if (colorError?.hasError('required')) {
        this.colorErrorMessage = 'Color field is empty!';
      }

      if (dimensionsError?.errors?.['pattern']) {
        this.dimensionsErrorMessage = 'The dimensions of the product can contain only letters and numbers, and must be at most 15 characters long!';
      }
      if (dimensionsError?.hasError('required')) {
        this.dimensionsErrorMessage = 'Dimensions field is empty!';
      }

      if (descriptionError?.errors?.['pattern']) {
        this.descriptionErrorMessage = 'The description of the product can contain letters, numbers, . and !, and must be at most 15 characters long!';
      }
      if (descriptionError?.hasError('required')) {
        this.descriptionErrorMessage = 'Description field is empty!';
      }

      setTimeout(() => {
        this.imageurlErrorMessage = '';
        this.nameErrorMessage = '';
        this.categoryErrorMessage = '';
        this.priceErrorMessage = '';
        this.colorErrorMessage = '';
        this.dimensionsErrorMessage = '';
        this.descriptionErrorMessage = '';
      }, 5000)
    }
  }
}
