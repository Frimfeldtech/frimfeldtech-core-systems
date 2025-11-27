-- Esquema de Base de Datos para SaludCheck
-- Motor sugerido: PostgreSQL (Producción) / SQLite (Desarrollo)

-- Tabla de Usuarios (Vendedores/Administrativos)
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100),
    role VARCHAR(20) CHECK (role IN ('admin', 'agency', 'seller')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Tabla de Prospectos (Personas consultadas)
CREATE TABLE prospects (
    id SERIAL PRIMARY KEY,
    cuil VARCHAR(11) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    last_checked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status_color VARCHAR(10) CHECK (status_color IN ('GREEN', 'YELLOW', 'RED')),
    current_obra_social VARCHAR(255),
    last_transfer_date DATE,
    notes TEXT
);

-- Tabla de Consultas (Historial)
CREATE TABLE query_logs (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    prospect_id INTEGER REFERENCES prospects(id),
    queried_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    result_json TEXT, -- Respuesta completa del scraper en JSON
    ip_address VARCHAR(45)
);

-- Tabla de Alertas (Para notificaciones Push)
CREATE TABLE alerts (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    prospect_id INTEGER REFERENCES prospects(id),
    alert_date DATE NOT NULL, -- Fecha en la que se debe notificar (ej. cuando se cumplen 11 meses)
    message VARCHAR(255),
    is_sent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para optimización
CREATE INDEX idx_prospects_cuil ON prospects(cuil);
CREATE INDEX idx_query_logs_user ON query_logs(user_id);
