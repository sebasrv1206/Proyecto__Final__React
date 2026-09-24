# React705

Aplicación desarrollada con React, Vite y Tailwind CSS como Reto Final de formación (SENA - ADSO).

## Instalación

```
npm install
npm run dev
```

## Funcionalidades

- Catálogo de personajes (Rick and Morty API) con paginación.
- Carrito de productos con Context API + LocalStorage (subtotal, IVA, total, confirmación de pedido).
- Formulario de contacto con react-hook-form, react-dropzone y Formspree.
- Modo oscuro / claro persistente.
- Login con perfil de usuario y cierre de sesión con confirmación.
- Alertas con react-hot-toast.

## Despliegue

El proyecto ya incluye la configuración necesaria para desplegarse como SPA (rutas de React Router funcionando incluso al recargar la página):

- **Vercel**: importa el repositorio desde [vercel.com/new](https://vercel.com/new); detecta Vite automáticamente. Ya incluye `vercel.json` con el rewrite necesario.
- **Netlify**: importa el repositorio desde [app.netlify.com](https://app.netlify.com); build command `npm run build`, publish directory `dist`. Ya incluye `public/_redirects`.

Antes de desplegar, configura la variable de entorno `VITE_FORMSPREE_ENDPOINT` (ver `.env`) en el panel del hosting elegido.
