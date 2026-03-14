import { Component, inject } from '@angular/core';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent {
  // Inyectamos el servicio para que el HTML pueda leer el signal
  toastService = inject(ToastService);
}
