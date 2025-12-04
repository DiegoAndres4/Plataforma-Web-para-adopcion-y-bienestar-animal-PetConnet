-- ============================================================================
-- SCRIPT DE BASE DE DATOS - PETCONNECT
-- Plataforma Web para Adopción y Bienestar Animal
-- ============================================================================
-- Base de datos: petconnect
-- Gestor: PostgreSQL
-- Fecha: 3 de diciembre de 2025
-- ============================================================================

-- Crear base de datos
CREATE DATABASE petconnect
    WITH
    ENCODING 'UTF8'
    LC_COLLATE 'es_ES.UTF-8'
    LC_CTYPE 'es_ES.UTF-8';

-- Conectarse a la base de datos
-- \c petconnect;

-- ============================================================================
-- TABLA: USUARIOS
-- Descripción: Almacena información de usuarios (adoptantes, refugios, etc.)
-- ============================================================================
CREATE TABLE usuarios (
    id_usuario SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    tipo_usuario VARCHAR(50) NOT NULL CHECK (tipo_usuario IN ('adoptante', 'refugio', 'admin')),
    telefono VARCHAR(20),
    ubicacion VARCHAR(255),
    descripcion TEXT,
    foto_perfil VARCHAR(255),
    verificado BOOLEAN DEFAULT FALSE,
    activo BOOLEAN DEFAULT TRUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: MASCOTAS
-- Descripción: Registro de mascotas disponibles para adopción
-- ============================================================================
CREATE TABLE mascotas (
    id_mascota SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    nombre VARCHAR(100) NOT NULL,
    especie VARCHAR(50) NOT NULL CHECK (especie IN ('perro', 'gato', 'ave', 'conejo', 'otro')),
    raza VARCHAR(100),
    edad_categoria VARCHAR(50) CHECK (edad_categoria IN ('cachorro', 'joven', 'adulto', 'senior')),
    edad_anios INT,
    sexo VARCHAR(20) CHECK (sexo IN ('macho', 'hembra', 'desconocido')),
    tamaño VARCHAR(50) CHECK (tamaño IN ('pequeño', 'mediano', 'grande')),
    color VARCHAR(100),
    descripcion TEXT,
    estado_salud VARCHAR(255),
    vacunado BOOLEAN DEFAULT FALSE,
    desparasitado BOOLEAN DEFAULT FALSE,
    esterilizado BOOLEAN DEFAULT FALSE,
    microchip BOOLEAN DEFAULT FALSE,
    bueno_ninos BOOLEAN DEFAULT FALSE,
    bueno_mascotas BOOLEAN DEFAULT FALSE,
    necesidades_especiales BOOLEAN DEFAULT FALSE,
    entrenado BOOLEAN DEFAULT FALSE,
    requisitos TEXT,
    estado VARCHAR(50) NOT NULL DEFAULT 'disponible' CHECK (estado IN ('disponible', 'adoptado', 'en_proceso', 'no_disponible')),
    ciudad VARCHAR(100),
    colonia VARCHAR(100),
    ubicacion VARCHAR(255),
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: FOTOS_MASCOTA
-- Descripción: Almacena las fotos de cada mascota (hasta 5 por mascota)
-- ============================================================================
CREATE TABLE fotos_mascota (
    id_foto SERIAL PRIMARY KEY,
    id_mascota INT NOT NULL REFERENCES mascotas(id_mascota) ON DELETE CASCADE,
    ruta_foto VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    fecha_carga TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: SOLICITUDES_ADOPCION
-- Descripción: Registro de solicitudes de adopción de usuarios
-- ============================================================================
CREATE TABLE solicitudes_adopcion (
    id_solicitud SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_mascota INT NOT NULL REFERENCES mascotas(id_mascota) ON DELETE CASCADE,
    estado VARCHAR(50) NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'aceptada', 'rechazada', 'completada')),
    mensaje VARCHAR(500),
    fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: DENUNCIAS
-- Descripción: Registro de denuncias de maltrato o casos de animales
-- ============================================================================
CREATE TABLE denuncias (
    id_denuncia SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    titulo VARCHAR(255) NOT NULL,
    tipo_denuncia VARCHAR(100) NOT NULL CHECK (tipo_denuncia IN ('maltrato_animal', 'abandono', 'falta_cuidado', 'otro')),
    descripcion TEXT NOT NULL,
    ubicacion VARCHAR(255) NOT NULL,
    estado VARCHAR(50) NOT NULL DEFAULT 'en_revision' CHECK (estado IN ('en_revision', 'investigacion', 'resuelto', 'cerrado')),
    prioridad VARCHAR(50) DEFAULT 'normal' CHECK (prioridad IN ('baja', 'normal', 'alta', 'urgente')),
    fecha_denuncia TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: FOTOS_DENUNCIA
-- Descripción: Fotos adjuntas a las denuncias
-- ============================================================================
CREATE TABLE fotos_denuncia (
    id_foto SERIAL PRIMARY KEY,
    id_denuncia INT NOT NULL REFERENCES denuncias(id_denuncia) ON DELETE CASCADE,
    ruta_foto VARCHAR(255) NOT NULL,
    descripcion VARCHAR(255),
    fecha_carga TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: COMENTARIOS_DENUNCIA
-- Descripción: Comentarios de seguimiento en denuncias
-- ============================================================================
CREATE TABLE comentarios_denuncia (
    id_comentario SERIAL PRIMARY KEY,
    id_denuncia INT NOT NULL REFERENCES denuncias(id_denuncia) ON DELETE CASCADE,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    comentario TEXT NOT NULL,
    fecha_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: FAVORITOS
-- Descripción: Mascotas agregadas a favoritos por usuarios
-- ============================================================================
CREATE TABLE favoritos (
    id_favorito SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE CASCADE,
    id_mascota INT NOT NULL REFERENCES mascotas(id_mascota) ON DELETE CASCADE,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(id_usuario, id_mascota)
);

-- ============================================================================
-- TABLA: CONTACTOS
-- Descripción: Mensajes de contacto enviados desde la página de contacto
-- ============================================================================
CREATE TABLE contactos (
    id_contacto SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    asunto VARCHAR(255) NOT NULL,
    mensaje TEXT NOT NULL,
    estado VARCHAR(50) DEFAULT 'no_leido' CHECK (estado IN ('no_leido', 'leido', 'respondido')),
    fecha_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- TABLA: HISTORIAL_ADOPCIONES
-- Descripción: Registro histórico de adopciones completadas
-- ============================================================================
CREATE TABLE historial_adopciones (
    id_historial SERIAL PRIMARY KEY,
    id_usuario INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    id_mascota INT NOT NULL REFERENCES mascotas(id_mascota) ON DELETE SET NULL,
    id_refugio INT NOT NULL REFERENCES usuarios(id_usuario) ON DELETE SET NULL,
    fecha_adopcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notas TEXT
);

-- ============================================================================
-- ÍNDICES
-- Descripción: Indices para optimizar búsquedas frecuentes
-- ============================================================================

-- Índices en usuarios
CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_tipo ON usuarios(tipo_usuario);
CREATE INDEX idx_usuarios_ubicacion ON usuarios(ubicacion);

-- Índices en mascotas
CREATE INDEX idx_mascotas_id_usuario ON mascotas(id_usuario);
CREATE INDEX idx_mascotas_especie ON mascotas(especie);
CREATE INDEX idx_mascotas_estado ON mascotas(estado);
CREATE INDEX idx_mascotas_ubicacion ON mascotas(ubicacion);
CREATE INDEX idx_mascotas_fecha ON mascotas(fecha_publicacion);

-- Índices en solicitudes
CREATE INDEX idx_solicitudes_id_usuario ON solicitudes_adopcion(id_usuario);
CREATE INDEX idx_solicitudes_id_mascota ON solicitudes_adopcion(id_mascota);
CREATE INDEX idx_solicitudes_estado ON solicitudes_adopcion(estado);

-- Índices en denuncias
CREATE INDEX idx_denuncias_id_usuario ON denuncias(id_usuario);
CREATE INDEX idx_denuncias_tipo ON denuncias(tipo_denuncia);
CREATE INDEX idx_denuncias_estado ON denuncias(estado);
CREATE INDEX idx_denuncias_ubicacion ON denuncias(ubicacion);
CREATE INDEX idx_denuncias_fecha ON denuncias(fecha_denuncia);

-- ============================================================================
-- DATOS DE PRUEBA
-- Descripción: Datos iniciales para pruebas
-- ============================================================================

-- Insertar usuario administrador
INSERT INTO usuarios (nombre, apellido, email, contrasena, tipo_usuario, telefono, verificado, activo)
VALUES ('Admin', 'PetConnect', 'admin@petconnect.com', 'admin123', 'admin', '3165000000', TRUE, TRUE);

-- Insertar refugio de ejemplo
INSERT INTO usuarios (nombre, apellido, email, contrasena, tipo_usuario, telefono, ubicacion, descripcion, verificado, activo)
VALUES ('Refugio Patitas', 'Felices', 'refugio@patitas.com', 'refugio123', 'refugio', '3165001111', 'Cúcuta, Colombia', 'Refugio dedicado al cuidado de animales abandonados', TRUE, TRUE);

-- Insertar adoptante de ejemplo
INSERT INTO usuarios (nombre, apellido, email, contrasena, tipo_usuario, telefono, ubicacion, verificado, activo)
VALUES ('Juan', 'Pérez', 'juan@email.com', 'user123', 'adoptante', '3165002222', 'Cúcuta, Colombia', NULL, TRUE, TRUE);

-- Insertar mascotas de ejemplo
INSERT INTO mascotas (id_usuario, nombre, especie, raza, edad_categoria, edad_anios, sexo, tamaño, color, descripcion, estado_salud, vacunado, desparasitado, esterilizado, microchip, bueno_ninos, bueno_mascotas, necesidades_especiales, entrenado, estado, ciudad, colonia)
VALUES 
(2, 'Nebula', 'gato', 'Persa', 'adulto', 2, 'hembra', 'pequeño', 'Gris', 'Un hermoso gato en busca de un hogar amoroso.', 'Excelente', TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE, 'disponible', 'Cúcuta', 'Centro'),
(2, 'Garfield', 'perro', 'Labrador', 'adulto', 3, 'macho', 'grande', 'Marrón', 'Un perro cariñoso en busca de un hogar.', 'Excelente', TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, 'disponible', 'Cúcuta', 'Norte'),
(2, 'Luna', 'gato', 'Siamés', 'joven', 1, 'hembra', 'pequeño', 'Blanco y marrón', 'Gatita joven y juguetona.', 'Excelente', TRUE, TRUE, FALSE, FALSE, FALSE, TRUE, FALSE, FALSE, 'disponible', 'Cúcuta', 'Sur');

-- ============================================================================
-- VISTAS ÚTILES
-- Descripción: Vistas para consultas frecuentes
-- ============================================================================

-- Vista: Mascotas disponibles con información del usuario
CREATE VIEW v_mascotas_disponibles AS
SELECT 
    m.id_mascota,
    m.nombre,
    m.especie,
    m.raza,
    m.edad_categoria,
    m.edad_anios,
    m.sexo,
    m.tamaño,
    m.color,
    m.descripcion,
    m.vacunado,
    m.desparasitado,
    m.esterilizado,
    m.microchip,
    m.bueno_ninos,
    m.bueno_mascotas,
    m.necesidades_especiales,
    m.entrenado,
    m.ciudad,
    m.colonia,
    u.nombre as nombre_refugio,
    u.apellido as apellido_refugio,
    u.email as email_refugio,
    u.telefono as telefono_refugio,
    m.fecha_publicacion
FROM mascotas m
JOIN usuarios u ON m.id_usuario = u.id_usuario
WHERE m.estado = 'disponible'
ORDER BY m.fecha_publicacion DESC;

-- Vista: Denuncias activas
CREATE VIEW v_denuncias_activas AS
SELECT 
    d.id_denuncia,
    d.titulo,
    d.tipo_denuncia,
    d.descripcion,
    d.ubicacion,
    d.estado,
    d.prioridad,
    u.nombre as reportado_por,
    u.email as email_usuario,
    d.fecha_denuncia
FROM denuncias d
LEFT JOIN usuarios u ON d.id_usuario = u.id_usuario
WHERE d.estado IN ('en_revision', 'investigacion')
ORDER BY d.prioridad DESC, d.fecha_denuncia DESC;

-- ============================================================================
-- FUNCIONES Y TRIGGERS
-- ============================================================================

-- Función para validar máximo 5 fotos por mascota
CREATE OR REPLACE FUNCTION validar_limite_fotos()
RETURNS TRIGGER AS $$
BEGIN
    IF (SELECT COUNT(*) FROM fotos_mascota WHERE id_mascota = NEW.id_mascota) > 5 THEN
        RAISE EXCEPTION 'No se pueden agregar más de 5 fotos por mascota';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para validar límite de fotos
CREATE TRIGGER trigger_validar_limite_fotos
BEFORE INSERT ON fotos_mascota
FOR EACH ROW
EXECUTE FUNCTION validar_limite_fotos();

-- Función para actualizar fecha_actualizacion automáticamente
CREATE OR REPLACE FUNCTION actualizar_fecha_actualizacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para usuarios
CREATE TRIGGER trigger_actualizar_usuarios
BEFORE UPDATE ON usuarios
FOR EACH ROW
EXECUTE FUNCTION actualizar_fecha_actualizacion();

-- Trigger para mascotas
CREATE TRIGGER trigger_actualizar_mascotas
BEFORE UPDATE ON mascotas
FOR EACH ROW
EXECUTE FUNCTION actualizar_fecha_actualizacion();

-- Trigger para solicitudes
CREATE TRIGGER trigger_actualizar_solicitudes
BEFORE UPDATE ON solicitudes_adopcion
FOR EACH ROW
EXECUTE FUNCTION actualizar_fecha_actualizacion();

-- Trigger para denuncias
CREATE TRIGGER trigger_actualizar_denuncias
BEFORE UPDATE ON denuncias
FOR EACH ROW
EXECUTE FUNCTION actualizar_fecha_actualizacion();

-- ============================================================================
-- FIN DEL SCRIPT
-- ============================================================================
