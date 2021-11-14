/* eslint-disable fsd/jq-use-js-prefix-in-selector */
import '../plugin/MySlider';
import Control from '../control/control';

$(() => {
  const firstSlider = $('.bimkon-slider-1');
  const secondSlider = $('.bimkon-slider-2');
  const thirdSlider = $('.bimkon-slider-3');
  const fourthSlider = $('.bimkon-slider-4');
  const fiveSlider = $('.bimkon-slider-5');
  const arrayOfSliders = [
    firstSlider,
    secondSlider,
    thirdSlider,
    fourthSlider,
    fiveSlider,
  ];
  arrayOfSliders.forEach((item: JQuery<object>, index) => {
    new Control(item, index);
  });
});

$('.bimkon-slider-1').bimkonSlider({
  isRange: true,
  min: 0,
  max: 100,
  step: 1,
  isVertical: true,
  from: 10,
  to: 70,
  hasTip: true,
  numberOfStrokes: 5,
});
$('.bimkon-slider-2').bimkonSlider({
  isRange: true,
  min: 0,
  max: 100,
  step: 1,
  isVertical: true,
  from: 30,
  to: 70,
  hasTip: true,
  numberOfStrokes: 6,
});
$('.bimkon-slider-3').bimkonSlider({
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
$('.bimkon-slider-4').bimkonSlider({
  isRange: true,
  min: 0,
  max: 100,
  step: 1,
  isVertical: false,
  from: 30,
  to: 70,
  hasTip: false,
  numberOfStrokes: 7,
});
$('.bimkon-slider-5').bimkonSlider();
