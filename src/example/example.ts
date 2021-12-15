/* eslint-disable fsd/jq-use-js-prefix-in-selector */
import '../plugin/jsBimkonSlider';
import Control from '../control/control';

$(() => {
  const arrayOfSliders : HTMLElement[] = [];
  const firstSlider = document.querySelector('.example__first');
  if (firstSlider instanceof HTMLElement) {
    arrayOfSliders.push(firstSlider);
  }
  const secondSlider = document.querySelector('.example__second');
  if (secondSlider instanceof HTMLElement) {
    arrayOfSliders.push(secondSlider);
  }
  const thirdSlider = document.querySelector('.example__third');
  if (thirdSlider instanceof HTMLElement) {
    arrayOfSliders.push(thirdSlider);
  }
  const fourthSlider = document.querySelector('.example__fourth');
  if (fourthSlider instanceof HTMLElement) {
    arrayOfSliders.push(fourthSlider);
  }
  const fiveSlider = document.querySelector('.example__five');
  if (fiveSlider instanceof HTMLElement) {
    arrayOfSliders.push(fiveSlider);
  }

  arrayOfSliders.forEach((item: HTMLElement) => {
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
  isVertical: false,
  from: 10,
  to: 70,
  hasTip: true,
  numberOfStrokes: 5,
});
$('.bimkon-slider-2').bimkonSlider({
  isRange: false,
  min: 0,
  max: 111,
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
