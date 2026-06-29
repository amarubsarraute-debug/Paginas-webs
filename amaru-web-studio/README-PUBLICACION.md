# Amaru Web Studio - checklist de publicacion

## 1. Mapa del sitio

- `index.html`
  - Inicio / Hero
  - Problema
  - Solucion
  - Servicios + portfolio
  - Beneficios
  - Proceso
  - Testimonios
  - Confianza
  - CTA intermedio
  - FAQ
  - Contacto
  - Footer

## 2. Wireframe por secciones

1. Header sticky: logo, navegacion, CTA.
2. Hero: badge, H1, subtitulo, dos CTAs, beneficios rapidos, mockup visual.
3. Dolor: lista de problemas concretos y puente hacia la solucion.
4. Solucion: tres bloques de diagnostico, solucion y acompanamiento.
5. Servicios: cuatro cards comerciales y portfolio visual.
6. Beneficios: grilla de seis diferenciales.
7. Proceso: cuatro pasos con microcopy tranquilizador.
8. Testimonios: tres testimonios placeholder creibles.
9. Autoridad: metricas editables y compromiso local.
10. CTA: bloque destacado con WhatsApp.
11. FAQ: acordeon con ocho preguntas.
12. Contacto: formulario, WhatsApp, horarios y ubicacion.
13. Footer: descripcion, enlaces, servicios, contacto y legales.

## 3. Design system

- Fondo principal: `--color-bg`
- Superficie: `--color-surface`
- Texto: `--color-text`
- Texto secundario: `--color-muted`
- CTA: `--color-primary`
- Hover CTA: `--color-primary-hover`
- Acento: `--color-accent`
- Bordes: `--color-border`
- Success/error: `--color-success`, `--color-error`
- Tipografia: DM Serif Display para titulares e Inter para interfaz/cuerpo.
- Radius: 12px a 18px.
- Animaciones: reveal suave, hover elevate, blur sticky, FAQ transition.

## 4. SEO implementado

- Title menor a 60 caracteres.
- Meta description menor a 155 caracteres.
- Un solo H1.
- Open Graph y Twitter card.
- Schema `LocalBusiness`, `Service` y `FAQPage`.
- SEO local para Maldonado, Uruguay.
- ALT en imagenes principales.

## 5. Accesibilidad

- Skip link.
- Focus visible.
- Labels en todos los campos.
- Estados `aria-expanded` en FAQ y menu mobile.
- Mensajes de formulario con `aria-live`.
- Contraste alto en texto y botones.

## 6. Checklist antes de subir

- Cambiar `https://amaruwebstudio.uy/` por el dominio final si es distinto.
- Reemplazar datos marcados como editables si hay metricas reales.
- Actualizar enlaces de Instagram, LinkedIn, privacidad y terminos.
- Subir toda la carpeta `amaru-web-studio/` a Hostinger.
- Mantener `.htaccess` en la raiz del sitio.
- Si se cambia CSS o JS, actualizar `?v=20260627` por la fecha del nuevo deploy.
