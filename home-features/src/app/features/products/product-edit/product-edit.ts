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
  product: Product = { name: '', category: '', price: '', description: '', dimensions: '', imageUrl: '', color: '', _id: 0 };

  // private authService = inject(AuthService); 
  private productService = inject(ProductService);
  private router = inject(Router);

  constructor(private route: ActivatedRoute) {
    this.productFormGroup = new FormGroup({
      name: new FormControl(this.product.name, [Validators.minLength(5)]),
      category: new FormControl(this.product.category),
      price: new FormControl(this.product.price),
      color: new FormControl(this.product.color),
      dimensions: new FormControl(this.product.dimensions),
      description: new FormControl(this.product.description),
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
    const productData = this.productFormGroup.value;

    this.productService.editProduct(productData, this.productId).subscribe({
      next: () => {
        this.router.navigate(['/catalog'])
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
