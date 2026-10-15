# Auditoría de campo (PWA)

App web de GH Consultora para cargar una visita de auditoría ambiental **sector por sector**
(nombre, notas escritas/dictadas con el teclado, fotos de cámara o galería con selección múltiple).
Reemplaza al Atajo de iOS: todo se guarda en el teléfono mientras se escribe, cada sector se sube
al servidor apenas se termina, y al final se encola el borrador (Gemini → Doc → mail).

- Frontend: `index.html` (sin dependencias), `sw.js` (abre sin señal), `manifest.webmanifest`.
- Backend: Apps Script `gh-auditorias-backend` (`Campo.gs`). Login con Google (una vez, sesión de 30 días)
  o con mail + código de acceso.
- No contiene datos de empresas: la lista sale del backend después del login.
