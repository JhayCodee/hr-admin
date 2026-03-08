import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Obtenemos el usuario guardado (en el futuro esto será un Token JWT real)
  const savedUser = localStorage.getItem('hr_user');

  // 2. Si el usuario existe, clonamos la petición y le añadimos el Header
  if (savedUser) {
    // Simulamos un token (en la vida real, sacarías el token del objeto user)
    const token = 'simulated-jwt-token-12345';

    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Pasamos la petición clonada (con el header) al siguiente paso
    return next(clonedRequest);
  }

  // 3. Si no hay usuario, dejamos pasar la petición tal cual (ej: login, registro)
  return next(req);
};
