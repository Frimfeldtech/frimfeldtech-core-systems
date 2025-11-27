# Plan de Implementación: SaludCheck

Este documento detalla la hoja de ruta para construir la plataforma **SaludCheck**, una solución unificada (SaaS) para vendedores de Obras Sociales.

## 1. Arquitectura del Sistema

El sistema seguirá una arquitectura de **Monorepo** con tres componentes principales:

1.  **Backend (API & Scraper Core)**: Node.js con Express. Manejará la lógica de negocio, la "Lógica del Semáforo", y la orquestación de scrapers.
2.  **Frontend Web (CRM)**: React.js (Vite). Dashboard para administrativos, carga masiva de Excel y gestión de usuarios.
3.  **App Móvil**: React Native (Expo). Interfaz optimizada para vendedores de calle (consulta rápida).

## 2. Estructura de Base de Datos (SQL)

Se utilizará una base de datos relacional. El esquema inicial se encuentra en `database_schema.sql`.

## 3. Fases de Desarrollo

### Fase 1: Fundamentos y Backend (Día 1)
- [ ] Inicializar estructura del proyecto (Monorepo).
- [ ] Configurar servidor Node.js básico.
- [ ] Definir modelos de datos y esquema SQL.
- [ ] Implementar **Mock Scraper Service** (Simulación de AFIP/ANSES/SSSalud para desarrollo sin credenciales reales).
- [ ] Implementar lógica del "Semáforo" (Business Logic).

### Fase 2: Frontend Web - CRM (Día 1-2)
- [ ] Configurar React + Vite + TailwindCSS.
- [ ] Crear Dashboard con diseño Premium (Dark Mode/Glassmorphism).
- [ ] Implementar vista de "Consulta Individual".
- [ ] Implementar vista de "Carga Masiva" (Interfaz visual para Excel).

### Fase 3: App Móvil (Día 2)
- [ ] Configurar Expo (React Native).
- [ ] Crear pantalla de Login.
- [ ] Crear pantalla de "Consulta Rápida" (Input CUIL).
- [ ] Visualización de resultados (Tarjetas de Semáforo).

### Fase 4: Integración y Refinamiento (Día 3)
- [ ] Conectar Frontend y Móvil con el Backend.
- [ ] Refinar la UX/UI.
- [ ] Preparar documentación de despliegue.

## 4. Notas Técnicas sobre Scraping y Seguridad

- **Scraping**: Debido a las restricciones de entorno y seguridad (CAPTCHAs, Clave Fiscal real requerida), el sistema implementará una interfaz `IScraper` con una implementación `MockScraper` por defecto. Esto permite desarrollar la UI y el flujo completo sin bloquearse por servicios externos.
- **Seguridad**: Las Claves Fiscales NO se almacenarán en texto plano. Se diseñará el flujo para que la sesión sea efímera o encriptada.

## 5. Estado Actual
- Inicialización del proyecto.
