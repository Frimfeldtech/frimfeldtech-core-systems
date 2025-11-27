# SaludCheck - Sistema Unificado para Vendedores de Obras Sociales

## Descripción

SaludCheck es una plataforma SaaS diseñada para automatizar la calificación de prospectos para traspaso de Obras Sociales en Argentina. Integra un CRM Web, una App Móvil y un Backend con lógica de scraping simulada.

## Estructura del Proyecto

- **/server.js**: Backend API (Node.js/Express).
- **/web**: Frontend Web (React + Vite).
- **/mobile**: App Móvil (React Native + Expo).

## Requisitos Previos

- Node.js (v18 o superior)
- npm

## Instrucciones de Instalación

1. **Instalar dependencias del Backend:**

    ```bash
    npm install
    ```

2. **Instalar dependencias del Frontend Web:**

    ```bash
    cd web
    npm install
    ```

3. **Instalar dependencias de la App Móvil:**

    ```bash
    cd mobile
    npm install
    ```

## Cómo Ejecutar

### 1. Iniciar el Backend

En la raíz del proyecto:

```bash
node server.js
```

El servidor correrá en `http://localhost:3001`.

### 2. Iniciar el Frontend Web

En una nueva terminal:

```bash
cd web
npm run dev
```

La web estará disponible en `http://localhost:5173`.

### 3. Iniciar la App Móvil

En una nueva terminal:

```bash
cd mobile
npx expo start
```

Escanea el código QR con la app **Expo Go** en tu celular.

## Notas de Desarrollo

- **Scraping**: El sistema utiliza un `MockScraper` por defecto para evitar bloqueos de IP y CAPTCHAs durante el desarrollo.
- **Base de Datos**: Actualmente utiliza almacenamiento en memoria. Para persistencia, configurar PostgreSQL según `database_schema.sql`.
