# AGENTS.md — Amaru Web Studio

Instrucciones para cualquier agente de IA (Codex, Antigravity, Claude, Cursor, etc.) que trabaje en este proyecto.

---

## Qué es este proyecto

Carpeta de trabajo de **Amaru Web Studio** — desarrollo de sitios web para negocios locales en Uruguay (Maldonado, Punta del Este y zona).

Cada carpeta raíz es un proyecto de cliente o herramienta interna. No hay un build global: cada proyecto se serve de forma independiente.

---

## Skills disponibles

Antes de empezar cualquier tarea, revisá si hay una skill que la cubra:

| Tarea | Skill |
|-------|-------|
| Armar propuesta/presupuesto de cierre (deck con precio) | `.agent/skills/deck-cierre/SKILL.md` |
| Refinar un sitio hecho en Lovable (React/Tailwind) | `.agent/skills/web-master-refine/SKILL.md` |
| Construir un sitio nuevo desde cero (HTML estático para Hostinger) | `.agent/skills/adrian-saenz-hostinger-premium-website/SKILL.md` |
| Editar un componente visual suelto | `.agent/skills/frontend-design/SKILL.md` |
| Cambio complejo con varias partes que puede salir mal | `.agent/skills/superpowers/SKILL.md` |

---

## Reglas generales

- **No construir de cero** si hay un template existente — copiarlo y adaptarlo.
- **No cambiar el sistema de diseño** de los decks de cierre sin pedido explícito (DM Serif Display + Inter, paleta paper/black, editorial neutro).
- **No agregar color de marca del cliente** en los decks — la paleta es de Amaru Web Studio.
- **Mobile siempre**: todo lo que se manda por WhatsApp tiene que funcionar en celular primero.
- **Verificar en navegador** después de cualquier cambio visible.

---

## Template de deck de cierre

El archivo de referencia es `deck-cierre-basil.html` en la raíz. Para un cliente nuevo:
1. Copiar ese archivo → renombrar a `deck-cierre-<cliente>.html`
2. Seguir las instrucciones de `.agent/skills/deck-cierre/SKILL.md`
