/* eslint-disable fsd/jq-use-js-prefix-in-selector */
import '../plugin/jsBimkonSlider';
import Control from '../control/control';

$(() => {
  const firstSlider = document.querySelector('.example__first');
  const secondSlider = document.querySelector('.example__second');
  const thirdSlider = document.querySelector('.example__third');
  const fourthSlider = document.querySelector('.example__fourth');
  const fiveSlider = document.querySelector('.example__five');

  const arrayOfSliders = [
    firstSlider,
    secondSlider,
    thirdSlider,
    fourthSlider,
    fiveSlider,
  ];
  arrayOfSliders.forEach((item: Element | null) => {
    if (item !== null) {
      new Control(item);
    }
  });
});

$('.bimkon-slider-1').bimkonSlider({
  isRange: true,
  min: 0,
  max: 60,
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
