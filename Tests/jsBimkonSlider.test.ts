import $ from 'jquery';
import '../src/plugin/jsBimkonSlider';
import SliderOptions from '../src/plugin/SliderOptions';


describe('Slider / Test of initialization', () => {
  document.body.innerHTML = '<div class="bimkon-slider-1"></div>';
  const $slider = $('.bimkon-slider-1');

  $slider.bimkonSlider({
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

  it('Should init slider', () => {
    expect(document.querySelector('js-bimkon-slider__path')).toBeTruthy();
  });
});

describe('Slider / test of methods', () => {
  document.body.innerHTML = '<div class="bimkon-slider-1"></div>';
  const $slider = $('.bimkon-slider-1');

  $slider.bimkonSlider({
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

  it('Should coincide callback return', () => {

    $slider.bimkonSlider('callbackOnUpdate', (options: SliderOptions) => {
      expect(options.from).toEqual(10);
    });
  });

  it('Should update to vertical', () => {
    $slider.bimkonSlider('update', { isVertical: true})
    $slider.bimkonSlider('callbackOnUpdate', (options: SliderOptions) => {
      expect(options.isVertical).toEqual(true);
    });
  });
});
