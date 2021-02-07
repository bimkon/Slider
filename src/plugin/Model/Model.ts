import { SliderOptions } from '../SliderOptions';

class Model {
  constructor() {
  }

  initData(options:any): SliderOptions {
    return options
  }

  get template(): string {
    return `
    <div class="ice-slider__text-wrapper">
      <h3 class="ice-slider__title" data-type="is__title">Range slider</h3>
      <span class="ice-slider__value" data-type="is__current-val">15000</span></div>
    <div class="ice-slider__slider"><div class="ice-slider__point">
      </div><div class="ice-slider__range"></div>
      <div class="ice-slider__line-bg"></div>
    </div>
    `
  }
}
export { Model };

