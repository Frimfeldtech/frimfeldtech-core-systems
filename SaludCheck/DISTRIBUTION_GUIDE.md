# Guía de Instalación y Distribución - SaludCheck CRM

## 1. Instalación del Software (Windows)

El sistema ha sido empaquetado como un instalador profesional de Windows (`.exe`).

### Ubicación del Instalador

El archivo generado se encuentra en:
`e:/Proyectos de apps webs y juegos/SaludCheck/web/release/SaludCheck CRM Setup 0.0.0.exe`

### Pasos para el Cliente

1. Entregar el archivo `.exe` al cliente (vía USB, Drive, o descarga directa).
2. El cliente hace doble clic en el instalador.
3. El programa se instalará automáticamente y creará un acceso directo en el escritorio.
4. Al abrirlo, verá la pantalla de **Activación y Pagos**.

## 2. Gestión de Licencias

Actualmente, el sistema tiene un "Modo Demo" donde el botón de activación es simulado.
Para un control real, se recomienda:

1. Crear una base de datos en la nube (Firebase/Supabase) para validar licencias.
2. Cuando el cliente pague, generas un código único.
3. El cliente ingresa ese código en la app para desbloquear el Dashboard.

## 3. Actualizaciones

Para lanzar una nueva versión:

1. Incrementar la versión en `package.json`.
2. Ejecutar `npm run electron:build`.
3. Enviar el nuevo instalador a los clientes.

## 4. Soporte Técnico

Canales oficiales configurados en la app:

- **WhatsApp**: +54 9 11 7066-5067
- **Email**: <imfeldfabrizio7@gmail.com>
