-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-03-2026 a las 02:13:06
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `fya_creditos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `creditos`
--

CREATE TABLE `creditos` (
  `id` int(11) NOT NULL,
  `nombre_cliente` varchar(100) NOT NULL,
  `cedula` varchar(20) NOT NULL,
  `valor` decimal(15,2) NOT NULL,
  `tasa_interes` decimal(5,2) NOT NULL,
  `plazo_meses` int(11) NOT NULL,
  `comercial` varchar(100) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `creditos`
--

INSERT INTO `creditos` (`id`, `nombre_cliente`, `cedula`, `valor`, `tasa_interes`, `plazo_meses`, `comercial`, `fecha_registro`) VALUES
(1, 'Jean Perez', '1001', 7800000.00, 2.00, 10, 'Comercial Demo', '2026-03-04 01:11:48'),
(2, 'Maria Perez', '1002', 12500000.00, 2.00, 5, 'Comercial Demo', '2026-03-04 01:11:48'),
(3, 'Antonio Rodriguez', '1003', 10312673.00, 2.00, 5, 'Comercial Demo', '2026-03-04 01:11:48'),
(4, 'Giselle López', '1004', 8628510.00, 2.00, 12, 'Comercial Demo', '2026-03-04 01:11:48'),
(5, 'Martha Perez', '1005', 5889085.00, 2.00, 24, 'Comercial Demo', '2026-03-04 01:11:48'),
(6, 'Isaac Llanos', '1006', 14793565.00, 2.00, 48, 'Comercial Demo', '2026-03-04 01:11:48'),
(7, 'Teresa Gutierrez', '1007', 8072348.00, 2.00, 50, 'Comercial Demo', '2026-03-04 01:11:48'),
(8, 'Isabel Llanos', '1008', 5143860.00, 2.00, 60, 'Comercial Demo', '2026-03-04 01:11:48'),
(9, 'Paola Tao', '1009', 12881963.00, 2.00, 24, 'Comercial Demo', '2026-03-04 01:11:48'),
(10, 'Wendy Moscoso', '1010', 13484682.00, 2.00, 40, 'Comercial Demo', '2026-03-04 01:11:48');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `creditos`
--
ALTER TABLE `creditos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `creditos`
--
ALTER TABLE `creditos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
