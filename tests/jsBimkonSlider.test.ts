import $ from 'jquery';
import '../src/plugin/jsBimkonSlider';
import { SliderOptions } from '../src/plugin/types';

describe('Slider / Test of initialization', () => {
  document.body.innerHTML = '<div class="bimkon-slider-1"></div><div class="bimkon-slider2"></div>';
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
    to: 60,
    hasTip: true,
    numberOfStrokes: 5,
  });

  it('method callBackOnUpdate should callback slider options after slider got changed ', () => {
    $slider.bimkonSlider('callbackOnUpdate', (options: SliderOptions) => {
      expect(options.from).toEqual(5);
      expect(options).toMatchObject({
        isRange: expect.any(Boolean),
        isVertical: expect.any(Boolean),
        hasTip: expect.any(Boolean),
        min: expect.any(Number),
        max: expect.any(Number),
        step: expect.any(Number),
        from: expect.any(Number),
        to: expect.any(Number),
        numberOfStrokes: expect.any(Number),
      });
    });
    $slider.bimkonSlider('update', { from: 5 });
  });

  it('method update should update slider options', () => {
    $slider.bimkonSlider('callbackOnUpdate', (options: SliderOptions) => {
      expect(options.min).toEqual(1);
      expect(options.to).toEqual(30);
      expect(options.max).toEqual(100);
      expect($('js-bimkon-slider_vertical')).toBeTruthy();
    });
    $slider.bimkonSlider('update', {
      max: 100,
      min: 1,
      to: 30,
      isVertical: true,
    });
  });

  it('should throw error if method doesnt exist', () => {
    expect(() => {
      $slider.bimkonSlider('updata', { isVertical: true });
    }).toThrow();
  });
});
