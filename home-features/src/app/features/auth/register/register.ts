import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services';
import { AbstractControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors } from '@angular/forms';
import { RegisterFormService } from '../forms/register.form';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
  standalone: true,
})
export class Register {
  showPassword: boolean = false;
  private authService = inject(AuthService);
  private router = inject(Router);
  private registerFormService = inject(RegisterFormService);

  usernameErrorMessage: string = '';
  passwordErrorMessage: string = '';
  emailErrorMessage: string = '';
  httpError: string = '';

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
      this.authService.register(username, email, password, rePassword).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          if (err.status === 409) {
            this.httpError = 'This email is already registered.\n Please use a different one!';
          } else {
            this.httpError = 'An unexpected error occurred.\n Please try again later!';
          }
          setTimeout(() => this.httpError = '', 5000);
          this.markFormGroupTouched();
        }
      });
    } else {
      const usernameError = this.registerForm.get('username');
      const emailError = this.registerForm.get('email');
      const passwordInput = this.registerForm.get('passwords.password');
      const rePasswordInput = this.registerForm.get('passwords.rePassword');

      if (usernameError?.hasError('minlength')) {
        this.usernameErrorMessage = 'Username must be\n at least 5 characters!';
      }
      if(usernameError?.hasError('required')){
        this.usernameErrorMessage = 'Username field is empty!'
      }

      if (emailError?.errors?.['pattern']) {
        this.emailErrorMessage = 'Please enter a valid Gmail address\n (at least 6 characters, starts\n with a letter, and ends with\n @gmail.com or @gmail.bg)!'
      }
      if(emailError?.hasError('required')){
        this.emailErrorMessage = 'Email field is empty!'
      }

      if (passwordInput?.errors?.['pattern']) {
        this.passwordErrorMessage = "Password must be at least\n 6 characters long and contain\n at least one special character!";
      }
      if(passwordInput?.hasError('required')){
        this.passwordErrorMessage = 'Fill password fields!'
      }

      if (rePasswordInput?.value !== passwordInput?.value) {
        this.passwordErrorMessage = 'Passwords do not match!'
      }

      setTimeout(() => {
        this.usernameErrorMessage = '';
        this.passwordErrorMessage = '';
        this.emailErrorMessage = '';
      }, 5000);

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
}
