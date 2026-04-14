# 🚀 AhorraFácil: Financial Dashboard & Multiverse Explorer

**AhorraFácil** no es simplemente una herramienta de gestión; es una plataforma web de alto rendimiento fundamentada en una arquitectura modular de "Feature-First" (orientada a funcionalidades). Este enfoque arquitectónico permite un desacoplamiento total entre dominios, facilitando la escalabilidad horizontal del código y garantizando que cada módulo —desde la autenticación hasta el panel de control— sea independiente, testeable y fácil de mantener.

La aplicación logra una convergencia técnica única al integrar dos ecosistemas aparentemente opuestos:

## 💡 Motor de Inteligencia Financiera
Una herramienta avanzada de gestión de finanzas personales que utiliza el estado de React de forma intensiva para procesar flujos de caja en tiempo real. Implementa algoritmos de cálculo optimizados mediante memoización (`useMemo`), permitiendo un análisis instantáneo de ingresos, egresos y balance neto sin afectar el rendimiento.

Además, garantiza la integridad de la información mediante una capa de persistencia híbrida, asegurando que los datos del usuario sobrevivan a recargas y sesiones prolongadas.

## 🌌 Módulo de Exploración Multiversal (Rick & Morty API)
Un explorador dinámico que interactúa con APIs REST de terceros. Maneja estados de carga, errores y ciclos de vida asíncronos de forma eficiente.

La interfaz utiliza un sistema de diseño responsivo basado en Grid, adaptándose a cualquier pantalla (móvil, laptop o ultra-wide).

---

## 📂 Estructura del Proyecto

```bash
AHORRAFACIL/
├── dist/               # Build de producción
├── node_modules/       # Dependencias
├── public/             # Archivos estáticos
├── server/             # Backend (Node.js/Express)
│   ├── .env
│   ├── server.js
│   └── package.json
└── src/
    ├── assets/
    ├── context/
    ├── feature/
    │   ├── api/
    │   ├── auth/
    │   │   ├── campanents/
    │   │   ├── pages/
    │   │   └── services/
    │   ├── dashboard/
    │   │   ├── campanents/
    │   │   ├── haats/
    │   │   ├── pages/
    │   │   ├── services/
    │   │   └── Dashboard.jsx
    │   ├── layout/
    │   │   ├── campanents/
    │   └── shared/
    │       ├── campanents/
    ├── haats/
    ├── pages/
    ├── services/
    ├── theme/
    ├── App.jsx
    └── main.jsx