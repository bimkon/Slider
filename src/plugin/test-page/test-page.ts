import { Control } from './control-pannel';

$(() => {
  const firstSlider = $('.bimkon-slider-1');
  const secondSlider = $('.bimkon-slider-2');
  const thirdSlider = $('.bimkon-slider-3');
  const fourthSlider = $('.bimkon-slider-4');
  const arrayOfSliders = [firstSlider, secondSlider, thirdSlider, fourthSlider];
  arrayOfSliders.forEach((item:JQuery<object>, index:number) => {
    new Control(item, index);
  });
});
