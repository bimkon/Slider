import $ from 'jquery';
import '../src/plugin/jsBimkonSlider';
import {SliderOptions} from '../src/plugin/types';


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

  it('slider should be initialized', () => {
    expect($('js-bimkon-slider__path')).toBeTruthy();
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

  it('method callBackOnUpdate should callback slider options after slider got changed ', () => {
    function isEmpty(obj:Object) {
      for (let key in obj) {
        return false;
      }
      return true;
    }
    $slider.bimkonSlider('callbackOnUpdate', (options: SliderOptions) => {
      expect(isEmpty(options)).not.toBeTruthy();
      expect(options.max).toEqual(60);
      expect(options.from).toEqual(5);
    });
    $slider.bimkonSlider('update', { from: 5})


  });

  it('method update should update slider options', () => {
    $slider.bimkonSlider('update', { isVertical: true})
    expect($('js-bimkon-slider_vertical')).toBeTruthy();
  });

  it('should throw error if method doesnt exist', () => {
    expect(() => {$slider.bimkonSlider('updata', { isVertical: true})}).toThrow();
    $slider.bimkonSlider('update', { isVertical: true})
  });
});
