# Guía Maestra de Automatización y Despliegue (Hostinger + Stores)

Esta guía conecta tu código local con la nube (Hostinger) y las tiendas de aplicaciones (Google Play y App Store) de forma automatizada.

## 1. Integración con Hostinger (Web y Backend)

Para subir tu Backend y Web CRM a Hostinger automáticamente, usaremos **Git**.

### Paso A: Preparar Hostinger

1. Entra a tu panel de Hostinger -> **Hosting** -> **Administrar**.
2. Busca la sección **GIT** (bajo "Avanzado" o "Archivos").
3. Crea un **Repositorio**:
    * Si ya subiste esto a GitHub, pon la URL de tu repo.
    * Si no, crea un repo vacío y Hostinger te dará los comandos para conectar.

### Paso B: Configurar Node.js en Hostinger

1. En el panel de Hostinger, busca **Node.js** (si tienes plan Cloud/VPS es nativo, si es Shared busca el icono de Node.js).
2. Sube la carpeta `server/` y `web/dist/` (la versión compilada).
3. Configura el "Application Startup File" como `server.js`.
4. Haz clic en **Instalar NPM** y luego **Start**.

## 2. Automatización Móvil (Google Play + App Store)

Usaremos **EAS (Expo Application Services)**, que es el estándar industrial para React Native.

### Paso A: Google Play Store (Android)

Ya tienes la cuenta de $25. Ahora vincúlala:

1. Entra a [Google Play Console](https://play.google.com/console).
2. Ve a **Configuración** -> **Acceso a API**.
3. Crea una nueva **Cuenta de Servicio**.
4. Descarga el archivo `.json` de la clave.
5. Guárdalo en la carpeta del proyecto como `google-play-key.json` (¡NO LO COMPARTAS CON NADIE!).

### Paso B: App Store (iOS)

**Importante:** Para subir a la App Store, Apple requiere su propia membresía de **$99 USD/año**.

1. Si ya la tienes, EAS te pedirá tu Apple ID y contraseña específica de aplicación.
2. Si no la tienes, no podrás subir a la tienda oficial, pero sí podrás generar el archivo `.ipa` para pruebas.

### Paso C: Comandos Mágicos

He configurado `eas.json` para que haga todo el trabajo sucio.

**Para generar y subir a Android automáticamente:**

```bash
cd mobile
eas build --platform android --auto-submit
```

*Esto compilará la App en la nube y la enviará directo a tu Google Play Console.*

**Para generar y subir a iOS automáticamente:**

```bash
cd mobile
eas build --platform ios --auto-submit
```

## 3. Resumen de Credenciales Necesarias

Para que la automatización funcione al 100%, necesitarás rellenar estos datos cuando el sistema te lo pida:

| Servicio | Requisito | Estado |
| :--- | :--- | :--- |
| **Google Play** | Archivo `google-play-key.json` | Pendiente de descarga |
| **App Store** | Apple ID + Team ID | Pendiente ($99 fee) |
| **Hostinger** | Acceso SSH/Git | Configurable en Panel |

---
**Nota de FR IMFELD TECH:**
He preparado los archivos de configuración (`eas.json` y `app.json`) con tu marca `com.frimfeldtech.saludcheck`. Solo falta que ejecutes los comandos de login.
