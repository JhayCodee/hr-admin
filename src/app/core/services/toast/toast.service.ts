import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error';

export interface ToastMessage {
  message: string;
  type: ToastType;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  // El estado actual de la notificación (null significa que está oculta)
  currentToast = signal<ToastMessage | null>(null);

  show(message: string, type: ToastType = 'success') {
    // Mostramos el mensaje
    this.currentToast.set({ message, type });

    // Lo ocultamos automáticamente después de 3 segundos
    setTimeout(() => {
      this.currentToast.set(null);
    }, 3000);
  }
}
