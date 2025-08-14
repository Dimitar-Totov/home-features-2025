import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services';
import { AbstractControl, FormGroup, FormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RegisterFormService } from '../forms/register.form';

@Component({
  selector: 'app-register',
  imports: [RouterLink, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
})
export class Register {
  showPassword: boolean = false;
  private authService = inject(AuthService);
  private router = inject(Router);
  private registerFormService = inject(RegisterFormService);

  registerForm: FormGroup;

  constructor() {
    this.registerForm = this.registerFormService.createForm();
  }

  get username(): AbstractControl<any, any> | null {
    return this.registerForm.get('username');
  }

  get email(): AbstractControl<any, any> | null {
    return this.registerForm.get('email');
  }

  get passwords(): FormGroup<any> {
    return this.registerForm.get('passwords') as FormGroup;
  }

  get password(): AbstractControl<any, any> | null {
    return this.passwords.get('password');
  }

  get rePassword(): AbstractControl<any, any> | null {
    return this.passwords.get('rePassword');
  }

  get isUsernameValid(): boolean {
    return this.username?.invalid && (this.username?.dirty || this.username?.touched) || false;
  }

  get usernameErrorMessage(): string {
    if (this.username?.errors?.['minlength']) {
      return 'Username must be at least 5 characters!';
    }

    return '';
  }

  get isEmailValid(): boolean {
    return this.email?.invalid && (this.email?.dirty || this.email?.touched) || false;
  }

  get emailErrorMessage(): string {
    if (this.email?.errors?.['email']) {
      return 'Email is not valid!';
    }

    if (this.email?.errors?.['minlength']) {
      return 'Email must be at least 5 characters!';
    }

    return '';
  }

  get isPasswordsValid(): boolean {
    return this.passwords?.invalid && (this.passwords?.dirty || this.passwords?.touched) || false;
  }

  get passwordErrorMessage(): string {
    if (this.password?.errors?.['minlength']) {
      return 'Password must be at least 5 characters!';
    }

    if (this.password?.errors?.['pattern']) {
      return 'Password is not valid!';
    }

    if (this.password?.errors?.['passwordMismatch']) {
      return 'Passwords do not match!';
    }

    return '';
  }

  get rePasswordErrorMessage(): string {
    if (this.password?.errors?.['passwordMismatch']) {
      return 'Passwords do not match!';
    }

    return '';
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  showRePassword: boolean = false;

  toggleRePassword(): void {
    this.showRePassword = !this.showRePassword;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const { username, email } = this.registerForm.value;
      const { password, rePassword } = this.registerForm.value.passwords;
      const response = this.authService.register(username, email, password, rePassword);

      if (response === true) {
        this.router.navigate(['/']);
      } else {
        this.markFormGroupTouched();
      }

    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      if (control instanceof FormGroup) {
        Object.keys(control.controls).forEach(nestedKey => {
          const nestedControl = control.get(nestedKey);
          nestedControl?.markAllAsTouched();
        })
      } else {
        control?.markAllAsTouched();
      }
    })
  }

  private passwordMatchValidator(passwordsControl: AbstractControl): ValidationErrors | null {
    const password = passwordsControl.get('password');
    const rePassword = passwordsControl.get('rePassword');

    if (password && rePassword && password.value !== rePassword.value) {
      return { passwordMismatch: true }
    }

    return null;
  }
}
