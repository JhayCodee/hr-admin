import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  // Creamos el formulario. nonNullable asegura que los valores nunca sean null, sino su valor inicial (string vacío)
  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  // Getter para limpiar el HTML
  get controls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    // Si el formulario es inválido, forzamos a que se muestren los errores
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Aquí llamaremos al AuthService real después. Por ahora, extraemos los datos.
    const credentials = this.loginForm.getRawValue();
    console.log('Enviando a la API:', credentials);

    // Simulamos un login exitoso y navegamos al dashboard
    this.router.navigate(['/dashboard']);
  }
}
