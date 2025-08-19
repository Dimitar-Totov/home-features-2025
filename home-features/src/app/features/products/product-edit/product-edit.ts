import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services';
import { Product } from '../../../models';

@Component({
  selector: 'app-product-edit',
  imports: [FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css'
})
export class ProductEdit implements OnInit {
  productFormGroup: FormGroup;
  productId!: string;
  product: Product = { name: '', category: '', price: '', description: '', dimensions: '', imageUrl: '', color: '', _id: 0, ownerId: '', likes: [] };

  // private authService = inject(AuthService); 
  private productService = inject(ProductService);
  private router = inject(Router);

  imageurlErrorMessage: string = '';
  nameErrorMessage: string = '';
  categoryErrorMessage: string = '';
  priceErrorMessage: string = '';
  colorErrorMessage: string = '';
  dimensionsErrorMessage: string = '';
  descriptionErrorMessage: string = '';

  constructor(private route: ActivatedRoute) {
    this.productFormGroup = new FormGroup({
      name: new FormControl(this.product.name, [Validators.pattern(/^[A-Za-z]{5,}$/), Validators.required]),
      category: new FormControl(this.product.category, [Validators.pattern(/^[A-Za-z]{3,}$/)]),
      price: new FormControl(this.product.price, [Validators.pattern(/^[1-9]\d*[$£]$/)]),
      color: new FormControl(this.product.color, [Validators.pattern(/^[A-Za-z]{3,}$/)]),
      dimensions: new FormControl(this.product.dimensions, [Validators.pattern(/^[A-Za-z0-9]{1,15}$/)]),
      description: new FormControl(this.product.description, [Validators.pattern(/^[A-Za-z0-9.!]{10,}$/)]),
      imageUrl: new FormControl('', [Validators.pattern(/^(https?:\/\/)[A-Za-z]{5,}.*$/), Validators.required]),
    })
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('productId')!;
    this.productService.getProduct(this.productId).subscribe({
      next: (data) => {
        this.productFormGroup.patchValue({
          name: data.name,
          _id: data._id,
          category: data.category,
          price: data.price,
          color: data.color,
          dimensions: data.dimensions,
          description: data.description,
          imageUrl: data.imageUrl
        })
      },
      error: (err) => console.log(err),
    })

  }

  onSubmit(): void {
    if (this.productFormGroup.valid) {
      const productData = this.productFormGroup.value;

      this.productService.editProduct(productData, this.productId).subscribe({
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
