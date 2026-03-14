import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../core/auth/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private authService = inject(AuthService);

  // Estados
  isNotificationsOpen = signal(false);

  notifications = signal([
    {
      id: 1,
      title: 'Nuevo empleado',
      message: 'Ana García se unió al equipo de IT.',
      time: 'Hace 5 min',
      unread: true,
    },
    {
      id: 2,
      title: 'Mantenimiento',
      message: 'El servidor se reiniciará a la medianoche.',
      time: 'Hace 2 horas',
      unread: false,
    },
  ]);

  // Evaluamos si hay alguna notificación sin leer
  hasUnread = computed(() => this.notifications().some((n) => n.unread));

  // Acciones
  toggleNotifications() {
    this.isNotificationsOpen.update((val) => !val);
  }

  markAllAsRead() {
    this.notifications.update((notes) =>
      notes.map((n) => ({ ...n, unread: false })),
    );
  }

  onLogout() {
    this.authService.logout();
  }
}
