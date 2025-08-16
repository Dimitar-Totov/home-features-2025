import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true,
})
export class Login {
  showLoginPassword: boolean = false;
  private authService = inject(AuthService);
  private router = inject(Router);
  private formBuilder = inject(FormBuilder);

  loginForm: FormGroup;

  constructor() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email]],
      password: ['', [Validators.minLength(5)]],
    })
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  get emailError(): boolean {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false;
  }

  get emailErrorMessage(): string {
    if (this.email?.errors?.['email']) {
      return 'Email is not valid!';
    }

    return '';
  }

  get passwordError(): boolean {
    return this.password?.invalid && (this.password?.dirty || this.password?.touched) || false;
  }

  get passwordErrorMessage(): string {
    if (this.password?.errors?.['minlength']) {
      return 'Password must be at least 5 characters!';
    }

    return '';
  }

  isFormValid(): boolean {
    return this.loginForm.valid;
  }

  toggleLoginPassword(): void {
    this.showLoginPassword = !this.showLoginPassword;
  }

  onSubmit(): void {

    if (this.isFormValid()) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.markFormGroupTouched();
        }
      }); 
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAllAsTouched();
    })
  }
}
