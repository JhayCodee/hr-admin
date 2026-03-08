import { Injectable, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);

  // 🔥 ESTADO REACTIVO: signal guarda el usuario actual. Inicia en null.
  private currentUserSignal = signal<{ email: string } | null>(null);

  // 🔥 ESTADO DERIVADO: computed evalúa si hay un usuario. Si currentUserSignal cambia, esto se actualiza solo.
  isLoggedIn = computed(() => this.currentUserSignal() !== null);

  constructor() {
    // Al recargar la página, Angular destruye la memoria.
    // Revisamos el localStorage para ver si ya había una sesión abierta.
    const savedUser = localStorage.getItem('hr_user');
    if (savedUser) {
      this.currentUserSignal.set(JSON.parse(savedUser));
    }
  }

  login(email: string) {
    // Simulamos que fuimos al backend y nos devolvió los datos del usuario
    const mockUser = { email };

    // Actualizamos el estado global
    this.currentUserSignal.set(mockUser);

    // Persistimos en localStorage para que no se pierda al darle F5
    localStorage.setItem('hr_user', JSON.stringify(mockUser));

    // Redirigimos
    this.router.navigate(['/dashboard']);
  }

  logout() {
    // Limpiamos el estado y la memoria
    this.currentUserSignal.set(null);
    localStorage.removeItem('hr_user');

    // Lo mandamos a la calle
    this.router.navigate(['/auth/login']);
  }
}
