

# 🏢 HR-Admin Pro (Angular 18+)

Un panel administrativo moderno y escalable construido con **Angular 18**, enfocado en buenas prácticas, arquitectura Frontend y experiencia de usuario.

🔴 **EN VIVO:** [HR - ADMIN](https://hr-admin-sandy.vercel.app/auth/login)

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![RxJS](https://img.shields.io/badge/rxjs-%23B7178C.svg?style=for-the-badge&logo=reactivex&logoColor=white)

## ⚠️ Nota Importante sobre el Proyecto (Frontend Focus)

Este proyecto fue desarrollado exclusivamente con fines de aprendizaje y demostración de habilidades **puramente Frontend**. Por lo tanto, cuenta con las siguientes consideraciones para su evaluación:

1. **Autenticación Simulada:** No existe un sistema de usuarios real. **El login permite el acceso con cualquier combinación de correo y contraseña** para que puedas evaluar el Dashboard y la interfaz directamente.
2. **Sin Base de Datos Real:** El sistema no está conectado a un backend productivo. El CRUD de empleados (Crear, Leer, Actualizar, Eliminar) interactúa con una **Mock API** (MockAPI.io en producción y `json-server` en desarrollo) para simular la latencia y el flujo de datos real.

## 🚀 Características Técnicas Destacadas

- **Arquitectura Moderna:** Uso exclusivo de *Standalone Components*.
- **Reactividad:** Gestión de estado derivada con *Signals* (`computed`, `effect`) y flujo unidireccional.
- **Seguridad Frontend:** Rutas protegidas mediante *Guards Funcionales* e *Interceptores HTTP*.
- **Smart/Dumb Pattern:** Separación clara entre componentes contenedores (lógica) y presentacionales (UI).
- **UX/UI:** Diseño responsivo con Tailwind CSS, retroalimentación visual (Toasts, Spinners) e integración de *Chart.js*.

## 🛠️ Ejecución Local

1. Clona el repositorio:
```bash
 git clone https://github.com/JhayCodee/hr-admin

```

2. Instala las dependencias:
```bash
 npm install

```


3. Inicia el servidor local (Mock Backend de desarrollo):
```bash
npm run backend

```


4. Inicia Angular:
```bash
 ng serve

```



