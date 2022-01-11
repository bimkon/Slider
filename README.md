# Выполнено в рамках учебного проекта
Демо страница  - https://bimkon.github.io/Slider/

Для работы слайдера необходимо подключить Jquery версии  "^3.6.0"+.
____________________________________________________
## Инициализация проекта

* Клонирование проекта ```git clone https://github.com/bimkon/Slider```
* Установка проекта ```npm i```
* Запуск production build  - ```npm run build```
* Запуск слайдера с демо страницей в режиме hot reload ```npm run dev```
* Запуск development build и выгрузка на github page - ```npm run deploy```
* Запуск тестов jest  - ```npm test```
* Показать покрытие тестов jest  - ```npm run test-coverage```
* Проверка проекта eslint - ```npm run eslint-fix```
* Проверка проекта stylelint ```npm run stylelint-fix"```
____________________________________________________
## Архитектура проекта
| Название класса | Описание класса|
|----------------|:---------:|
| EventObserver  | Реализует observer pattern для ослабление зависимостей слоев |
| Model  | Cлой управления данными. Хранит опции, методы расчета новых позиций ползунков с учетом min,max, step, методы получения и установки опций. При изменении параметров слайдера, диспатчит события.|
| SliderOptions  | Интерфейс свойств параметров слайдера |
| Presenter  | Отдельный слой для связывания Model и View . Реагирует на сообщения от View о действиях пользователей и обновляет модель, реагирует на сообщения от Model о действиях пользователей и обновляет View |
| MainView | Реализует отображение слайдера в брайзере. Принимает данные от Presenter и обновляет слайдер |
| RangePathline  | Реализует отображение полоски между ползунками |
| Scale  | Реазиует отображение шкалы слайдера |
| TipView  | Реазиует отображение значения ползунка |
| ThumbView  | Хранит инициализацию TipView, реализует перемещение ползунков и диспатчит события в SliderPath |
| SliderPath  | Хранит инициализацию RangePathLine, ThumbView. Реализует перемещение ползунков при клике на полоску слайдера и диспатчит события в Presenter |

![Diagram](https://github.com/bimkon/Slider/blob/main/UML.png)

## Как подключать слайдер:
 - Запуск production build  - ```npm run build```
Подключите стили и скрипты из папки /dist:

``<html>
    <head>
        <link href="dist/bimkonPlugin.26391c185918383bc4c0.css" rel="stylesheet" type="text/css">
        <script src="dist/bimkonPlugin.js"></script>
    </head>
</html>
``

## Пример реализации слайдера:
```JavaScript
$('.bimkon-slider-1').bimkonSlider({
  isRange: true,
  min: 0,
  max: 100,
  step: 1,
  isVertical: false,
  from: 30,
  to: 70,
  hasTip: true,
  numberOfStrokes: 3,
});
```
## Пример реализации слайдера с параметрами по умолчанию:
```JavaScript
$('.slider').bimkonSlider()
```
## Пример реализации слайдера с data атрибутами:
```html
<div class='bimkon-slider' data-min=0 data-max=100 data-step=1 data-is-range='true' data-is-vertical='true' data-from=10 data-to=100 data-has-tip='true' data-number-of-strokes='5'></div>
<script>
  $(() => {
    $('.slider').bimkonSlider()
  })

  $(() => {
    $('.slider').bimkonSlider({ min: 20, max: 150, step: 30, isRange: true, from: 25, to: 50, numberOfStrokes: 5, })
  })
</script>
```
Метод обновления параметров:
```JavaScript
$('.bimkon-slider-1').bimkonSlider('update', {
  isRange: true,
  min: 20,
  max: 333,
  step: 1,
  isVertical: true,
  from: 30,
  to: 70,
  hasTip: true,
 numberOfStrokes: 3,
 });
```
Метод который вызывается при изменении слайдера и возвращает параметры слайдера:
 ```JavaScript
 $('.bimkon-slider-1').bimkonSlider('callbackOnUpdate', (options: SliderOptions) => {
  /*
    Работа с параметрами слайдера
  */
});
```
