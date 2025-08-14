import { inject, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";

@Injectable({ providedIn: 'root' })

export class RegisterFormService {
    private formBuilder = inject(FormBuilder);

    createForm(): FormGroup {
        return this.formBuilder.group({
            username: ['', [Validators.minLength(5)]],
            email: ['', [Validators.minLength(5), Validators.pattern(/^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/)]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.minLength(5), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
                rePassword: ['', [this.passwordMatchValidator]],
            }),
        })
    }

    getUsername(form: FormGroup): AbstractControl<any, any> | null {
        return form.get('username');
    }

    getEmail(form: FormGroup): AbstractControl<any, any> | null {
        return form.get('email');
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