-- phpMyAdmin SQL Dump
-- version 4.7.3
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Окт 19 2017 г., 15:52
-- Версия сервера: 5.6.37
-- Версия PHP: 5.5.38

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `plants`
--

-- --------------------------------------------------------

--
-- Структура таблицы `cats`
--

CREATE TABLE `cats` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `ordr` tinyint(3) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `cats`
--

INSERT INTO `cats` (`id`, `name`, `ordr`) VALUES
(1, 'Розоцветные', 10),
(2, 'Магнолиевые', 7);

-- --------------------------------------------------------

--
-- Структура таблицы `comments`
--

CREATE TABLE `comments` (
  `id` int(10) UNSIGNED NOT NULL,
  `plant` int(10) UNSIGNED NOT NULL,
  `username` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `added` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hidden` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `comments`
--

INSERT INTO `comments` (`id`, `plant`, `username`, `content`, `added`, `hidden`) VALUES
(5, 2, 'Спамер', 'Суперподкормка для растений!!!!!', '2017-10-16 10:19:01', 1),
(6, 2, 'Лесоруб', 'Какое большое дерево. Это сколько же дров выйдет!', '2017-10-16 10:27:42', 0),
(8, 3, 'Селянка', 'Цветочек беленький!', '2017-10-16 10:35:25', 0),
(11, 3, 'Большой садовод', 'Простенько, но со вкусом. ;)', '2017-10-16 10:53:59', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `pics`
--

CREATE TABLE `pics` (
  `id` int(10) UNSIGNED NOT NULL,
  `plant` int(10) UNSIGNED NOT NULL,
  `picext` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `pics`
--

INSERT INTO `pics` (`id`, `plant`, `picext`) VALUES
(17, 3, 'jpg'),
(18, 3, 'jpg'),
(19, 3, 'jpg'),
(20, 3, 'jpg'),
(21, 3, 'jpg'),
(22, 1, 'jpg'),
(23, 1, 'jpg'),
(24, 1, 'jpg'),
(25, 1, 'jpg'),
(26, 2, 'jpg'),
(27, 2, 'jpg'),
(28, 2, 'jpg'),
(29, 2, 'jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `plants`
--

CREATE TABLE `plants` (
  `id` int(10) UNSIGNED NOT NULL,
  `cat` int(10) UNSIGNED NOT NULL,
  `name` varchar(30) NOT NULL,
  `short` tinytext NOT NULL,
  `lng` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `featured` tinyint(1) NOT NULL,
  `picext` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `plants`
--

INSERT INTO `plants` (`id`, `cat`, `name`, `short`, `lng`, `price`, `featured`, `picext`) VALUES
(1, 2, 'Магнолия виргинская', 'Не выносит холода!', 'Дерево с листвой, опадающей очень поздно или держащейся с изменённой окраской до развертывания новых листьев, высотой 17—23 м, со стволом диаметром до 90—105 см; иногда растёт кустообразно.', '122.00', 0, 'jpg'),
(2, 2, 'Магнолия крупноцветковая', 'Не выносит холода! До 30 м в высоту.', 'Вечнозелёное дерево высотой до 30 м с толстым, прямым стволом диаметром 120—135 см. Крона широкопирамидальная, густо олиственная. Кора серая или светло-бурая, толщиной 1—2 см.', '98.00', 1, 'jpg'),
(3, 1, 'Шиповник полевой', 'До 2м в высоту, цветы белые. Также известен как рода пашенная.', 'Кустарник с плетистыми стеблями до 2м в высоту. Шипы немногочисленные, редкие, изогнутые, примерно равные. Лепестки белые или светло-розовые.', '65.90', 1, 'jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `role` varchar(1) NOT NULL DEFAULT 'e'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `role`) VALUES
(1, 'admin', 'admin', 'a'),
(2, 'editor', 'editor', 'e');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `cats`
--
ALTER TABLE `cats`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `ordr` (`ordr`);

--
-- Индексы таблицы `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hidden` (`hidden`),
  ADD KEY `plant` (`plant`),
  ADD KEY `added` (`added`);

--
-- Индексы таблицы `pics`
--
ALTER TABLE `pics`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plant` (`plant`);

--
-- Индексы таблицы `plants`
--
ALTER TABLE `plants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `featured` (`featured`),
  ADD KEY `cat` (`cat`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `cats`
--
ALTER TABLE `cats`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT для таблицы `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT для таблицы `pics`
--
ALTER TABLE `pics`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT для таблицы `plants`
--
ALTER TABLE `plants`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`plant`) REFERENCES `plants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `pics`
--
ALTER TABLE `pics`
  ADD CONSTRAINT `pics_ibfk_1` FOREIGN KEY (`plant`) REFERENCES `plants` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `plants`
--
ALTER TABLE `plants`
  ADD CONSTRAINT `plants_ibfk_1` FOREIGN KEY (`cat`) REFERENCES `cats` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
