import { inject, Injectable } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";

@Injectable({ providedIn: 'root' })

export class RegisterFormService {
    private formBuilder = inject(FormBuilder);

    createForm(): FormGroup {
        return this.formBuilder.group({
            username: ['', [Validators.minLength(5)]],
            email: ['', [Validators.pattern(/^(?=.{6,})[a-zA-Z][a-zA-Z0-9._-]*@gmail\.(com|bg)$/)]],
            passwords: this.formBuilder.group({
                password: ['', [Validators.pattern(/^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/)]],
                rePassword: [''],
            }),
        })
    }

    getUsername(form: FormGroup): AbstractControl<any, any> | null {
        return form.get('username');
    }

    getEmail(form: FormGroup): AbstractControl<any, any> | null {
        return form.get('email');
    }
}