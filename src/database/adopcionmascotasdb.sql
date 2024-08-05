-- phpMyAdmin SQL Dump
-- version 5.2.1deb3
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 30-07-2024 a las 07:35:38
-- Versión del servidor: 8.0.37-0ubuntu0.24.04.1
-- Versión de PHP: 8.2.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `adopcionmascotasdb`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adopciones`
--

CREATE TABLE `adopciones` (
  `id` int NOT NULL,
  `usuario_id` int NOT NULL,
  `mascota_id` int NOT NULL,
  `fecha_adopcion` date NOT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `adopciones`
--

INSERT INTO `adopciones` (`id`, `usuario_id`, `mascota_id`, `fecha_adopcion`, `fecha_creacion`) VALUES
(1, 3, 2, '2024-07-30', '2024-07-30 06:57:31'),
(2, 3, 2, '2024-07-30', '2024-07-30 06:59:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historial`
--

CREATE TABLE `historial` (
  `id_historial` int NOT NULL,
  `mascota_id` int NOT NULL,
  `vacuna` varchar(255) DEFAULT NULL,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_visita_v` date DEFAULT NULL,
  `motivo_consulta` varchar(255) DEFAULT NULL,
  `diagnostico` varchar(255) DEFAULT NULL,
  `tratamiento` varchar(255) DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `veterinaria` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `edad` int DEFAULT NULL,
  `genero` enum('macho','hembra') DEFAULT NULL,
  `raza` varchar(255) DEFAULT NULL,
  `esterilizado` enum('si','no') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `descripcion` text,
  `imagen_url` varchar(255) DEFAULT NULL,
  `estado` enum('pendiente','disponible','adoptado') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT 'pendiente',
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `usuario_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `nombre`, `edad`, `genero`, `raza`, `esterilizado`, `descripcion`, `imagen_url`, `estado`, `fecha_creacion`, `usuario_id`) VALUES
(1, 'Lupea20', 3, 'hembra', 'crillo', 'si', 'perroo', '/uploads/1722264101644-img1.jpg', 'disponible', '2024-07-02 18:36:01', 1),
(2, 'Firulaisa', 3, 'macho', 'xasx', 'si', 'Perro muy juguetón y amigable', '/uploads/1722264101644-img1.jpg', 'disponible', '2024-07-02 18:36:01', 2),
(3, 'perro 1', 12, 'macho', 'www', 'si', 'Perro muy juguetón y amigable', '/uploads/perro3.jpg', 'pendiente', '2024-07-22 15:29:23', 1),
(4, 'perro 1', 12, 'hembra', 'asx', 'si', 'Perro muy juguetón y amigable', '/uploads/perro4.jpg', 'disponible', '2024-07-22 18:25:43', 1),
(5, 'MInnie', 1, 'hembra', 'pintsher', 'si', 'perro canso', '/uploads/1722223602867-fondo2.png', 'disponible', '2024-07-29 03:26:42', 1),
(6, 'Lupe', 3, 'hembra', 'crillo', 'si', 'perroo', '/uploads/1722225377535-fondo2.png', 'disponible', '2024-07-29 03:56:17', 1),
(7, 'admin', 12, 'macho', 'eee11', 'si', 'perrro 123', '/uploads/1722263451019-img2.jpg', 'disponible', '2024-07-29 14:30:51', 1),
(8, 'alert2', 12, 'macho', 'pintsher', 'no', 'perro demasiado fiel', '/uploads/1722264101644-img1.jpg', 'adoptado', '2024-07-29 14:41:41', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `identificacion` varchar(50) DEFAULT NULL,
  `contrasena` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `rol` enum('admin','usuario') NOT NULL DEFAULT 'usuario',
  `direccion` text,
  `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `correo`, `identificacion`, `contrasena`, `telefono`, `rol`, `direccion`, `fecha_creacion`) VALUES
(1, 'Juan Perez', 'juan.perez@ejemplo.com', '56226', '$2b$10$x8qaVvoljE5SjpLxwQrp5.ISSwS4gEZdM9yeqsd5.sCA2sresH/se', '3132113055', 'admin', '123 Calle Falsa, Ciudad Falsa', '2024-07-02 18:36:01'),
(2, 'Maria Garcia', 'maria.garcia@ejemplo.com', '555521', '$2b$10$x8qaVvoljE5SjpLxwQrp5.ISSwS4gEZdM9yeqsd5.sCA2sresH/se', '987654321', 'usuario', '456 Calle Real, Ciudad Real', '2024-07-02 18:36:01'),
(3, 'miller', 'miller@gmail.com', '1007750963', '$2b$10$x8qaVvoljE5SjpLxwQrp5.ISSwS4gEZdM9yeqsd5.sCA2sresH/se', '3208729276', 'usuario', 'cra 2 # 12', '2024-07-29 16:00:48');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adopciones`
--
ALTER TABLE `adopciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`),
  ADD KEY `mascota_id` (`mascota_id`);

--
-- Indices de la tabla `historial`
--
ALTER TABLE `historial`
  ADD KEY `mascota_id` (`mascota_id`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `correo` (`correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adopciones`
--
ALTER TABLE `adopciones`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `adopciones`
--
ALTER TABLE `adopciones`
  ADD CONSTRAINT `adopciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `adopciones_ibfk_2` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`);

--
-- Filtros para la tabla `historial`
--
ALTER TABLE `historial`
  ADD CONSTRAINT `historial_ibfk_1` FOREIGN KEY (`mascota_id`) REFERENCES `mascotas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
