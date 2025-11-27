# Diagrama de Flujo de Autenticación y Scraping

## 1. Flujo de Consulta Simple (Solo CUIL)

Este flujo se usa para una pre-calificación rápida sin pedir datos sensibles al cliente.

```mermaid
sequenceDiagram
    participant Vendedor (App/Web)
    participant Backend API
    participant SSSalud (Público)
    participant DB

    Vendedor->>Backend API: POST /check/simple { cuil }
    Backend API->>SSSalud: Request (Buscador Público)
    SSSalud-->>Backend API: HTML Response
    Backend API->>Backend API: Parsear Obra Social Actual
    Backend API->>DB: Guardar/Actualizar Prospecto
    Backend API->>Backend API: Calcular Semáforo (Lógica Parcial)
    Note over Backend API: Si es Monotributista o tiene OS bloqueada -> ROJO
    Backend API-->>Vendedor: JSON { color, os_actual, warning: "Requiere Clave Fiscal para precisión" }
```

## 2. Flujo de Consulta Completa (Con Clave Fiscal)

Este flujo confirma los aportes y la fecha exacta de traspaso.

```mermaid
sequenceDiagram
    participant Vendedor
    participant Backend API
    participant Scraper Service
    participant AFIP/ANSES

    Vendedor->>Backend API: POST /check/full { cuil, clave_fiscal }
    Note right of Vendedor: Clave enviada vía HTTPS (TLS 1.3)
    Backend API->>Scraper Service: Iniciar Job (Queue)
    Scraper Service->>AFIP: Login con Clave Fiscal
    alt Captcha Detectado
        Scraper Service->>2Captcha: Resolver Captcha
        2Captcha-->>Scraper Service: Token Solución
    end
    Scraper Service->>AFIP: Navegar a "Aportes en Línea"
    AFIP-->>Scraper Service: Data de Aportes (12 meses)
    Scraper Service->>ANSES: Consultar CODEM (si es necesario)
    Scraper Service-->>Backend API: Datos Crudos Unificados
    Backend API->>Backend API: Aplicar Lógica de Negocio (Semáforo Final)
    Backend API->>DB: Guardar Historial
    Backend API-->>Vendedor: Reporte Completo (PDF/JSON)
```

## 3. Lógica del Semáforo (Business Logic)

| Estado | Condición | Acción Sugerida |
| :--- | :--- | :--- |
| **VERDE** | Activo, Aportes al día, Último cambio > 12 meses | **VENDER** |
| **AMARILLO** | Cambio hace 11 meses OR Aportes irregulares | **AGENDAR ALERTA** |
| **ROJO** | Cambio < 11 meses, Desempleado, Monotributo Social | **DESCARTAR** |
