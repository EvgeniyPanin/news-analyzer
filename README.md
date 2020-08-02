# [Анализатор новостей](https://github.com/EvgeniyPanin/news-analyzer)

---

Версия 1.0.0

---

Работа выполнена в рамках курса "Фронтенд-разработчик" в Яндекс.Практикум, использованы технологии:
HTML, CSS, БЭМ, Webpack, Babel

---

Для того, чтобы клонировать проект себе на компьютер, выполните в командной строке

```
git clone https://github.com/EvgeniyPanin/news-analyzer.git
```
Сборка проекта работает на платформе NPM, поэтому для работы вам необходимо установить NodeJS

---
После скачивания проекта установите все необходимые пакеты командой
```
npm -i
```
Чтобы собрать версию проекта для разработки, выполните команду
```
npm run dev
```
При этом запустится локальный сервер и страница с проектом автоматически откроется в браузере,
если автоматического запуска в браузере не произошло, вы можете самостоятельно открыть его по адресу

```
http://localhost:8080/
```
Для того чтобы получить локально готовую production версию проекта, необходимо выполнить команду

```
npm run build
```
После выполнения команды в корневой директории будет создана папка dist, в которую будет помещен собранный проект,
который можно опубликовать на GitHub с помощью команды

```
npm run deploy
```
Предварительно необходимо вписать адрес репозитория, куда будет опубликован проект в ключе homepage файла package.json
