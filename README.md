# Выполнено в рамках учебного проекта
Демо страница  - https://bimkon.github.io/Slider/
____________________________________________________
## Инициализация проекта

* Клонирование проекта git clone https://github.com/bimkon/Slider
* Установка проекта npm i
* Запуска production build  - npm run build
* Запуск проекта npm start
* Выгрузка на github page - npm run deploy
* Запуск тестов jest  - npm test
* Проверка проекта eslint - npm run eslint-fix
____________________________________________________
## Архитектура проекта
| Название класса | Описание класса| 
|----------------|:---------:|
| EventObserver  | Реализует observer pattern для ослабление зависимостей слоев |
| Model  | Cлой управления данными. Хранит опции, методы расчета новых позиций ползунков с учетом min,max, step, методы получения и установки опций. При изменении параметров слайдера, диспатчит события.|
| EventObserver  | Реализует observer pattern для ослабление зависимостей слоев |
| EventObserver  | Реализует observer pattern для ослабление зависимостей слоев |
| EventObserver  | Реализует observer pattern для ослабление зависимостей слоев |
| EventObserver  | Реализует observer pattern для ослабление зависимостей слоев |
| EventObserver  | Реализует observer pattern для ослабление зависимостей слоев |


