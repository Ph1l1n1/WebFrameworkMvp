## Введение

Тестовый проект с использованием таких инструментов как:

-   Mocha - для запуска тестов (mocha и mocha-parallel-tests)
-   Testdeck/mocha - возможность писать тесты в ООП стиле
-   Playwright - драйвер для работы с браузером
-   Allure - создание отчетов

### Как устроен фрейворк "Qwa"

Главная идея заключается в том, чтобы в тестах максимально содержались только бизнес логика тест кейса.
Это достигается за счет создания цепочки шагов через `steps` в которых и будет отображена вся верхнеуровневая логика как теста так и логов, что **повышает читаемость** и упрощает дальнейшую поддержку теста.
Однако это не отменяет возможность в теле теста реализовать низкоуровневый код или напрямую обратиться к драйверу через `pw.*`, такие действия рекомендуется оборачивать в `steps.createStep`

Так же благодаря использованию цепочки шагов можно удобно и быстро создавать тест кейсы за счет уже готовых шагов, который в себе аккумулируют все необходимое проверки, таймайты и т.п.
Все элементы для взаимодействия (`new QwaElement()`) описаны и хранятся либо на страницах (`*Page.ts`) либо в самих элементах - виджетах (`widget*.ts`), что позволяет переисполозовать последние во множестве других тестах.
Есть возможность запускать

### Структура проекта

│──src  

│────forTests Ресурсы для написания тестов

│──────Pages.ts Список тестируемых страниц

│──────TestPage.ts Тестируемая страница

│──────elements Элементы

│────qwaFramework Ресурсы для работы фрейворка

│──────core Сервис core - базовые сущности фреймворка

│──────playwright Сервис playwright - сущности драйвера playwright

│──────mainHooks.ts Хуки - функции запускаемые на определенных этапах исполнения теста

│──tests Тесты

│──mocha.parallel.conf.js Конфиг файл для запуска тестов


## Установка

1. Установить [Nodejs 20 версии](https://nodejs.org/en)
2. Установить [Java Runtime](https://www.java.com/en/download/manual.jsp)
3. В корне проекта выполнить команду для установки зависимостей: `npm i`
4. В корне проекта выполнить команду для установки браузеров: `npx playwright install`

## Запуск тестов

Для запуска необходимо запустить скрипт `test`

Доступны опции запуска через env переменные:

1. `SPEC` - Путь до запускаемого теста

    **Пример**: `SPEC='tests/Test1.ts' mocha-parallel-tests --config mocha.parallel.conf.js"`

    **По дефолту** в параллельном режиме будут запущены все тесты находящиеся в папке `tests`

2. `DEVICE` - Эмуляция мобильного девайса через

    **Пример**: `DEVICE='iPhone 14' mocha-parallel-tests --config mocha.parallel.conf.js"'`

    [Cписок доступных стройств](https://github.com/microsoft/playwright/blob/main/packages/playwright-core/src/server/deviceDescriptorsSource.json)

3. `HEADLESS` - Запуск браузера в безголовом режиме

    **Пример**: `HEADLESS=false  mocha-parallel-tests --config mocha.parallel.conf.js"'`

4. `LOG` - Уровень логирования в консоле

    **Пример**: `LOG=info mocha-parallel-tests --config mocha.parallel.conf.js"'`

    Список уровней: `info|warn|debug|error`

    **По дефолту** установлен: `info`

## Генерация отчета

Для запуска необходимо запустить скрипт `report`

## Что можно улучшить

-   Написать allure репортер добавляющий шаги и другую информамацию в прогон
-   Убрать `.run()` и `start()` в качестве триггеров запуска шагов, например через ловушки при вызове методов класса `QwaSteps`
-   Оптимизировать код `steps*` и декомпозировать на разные шаги: `Element steps`, `PageSteps`, `CheckSteps`
-   Сделать кастомный runner с возможностью параметризации
-   Вынести логику `mainHooks` в каждый и сервисов
-   Улучшить вывод в лог: убрать лишние и добавить префиксы для каждого из сервисов
-
