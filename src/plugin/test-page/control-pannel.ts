import '../myslider';
import { SliderOptions } from '../SliderOptions';

class Control {
  slider: JQuery<Object>;
  selectInputFrom: HTMLInputElement;
  selectInputTo: HTMLInputElement;
  selectInputMin: HTMLInputElement;
  selectInputMax: HTMLInputElement;
  selectInputStep: HTMLInputElement;

  constructor() {
    this.slider = $('.bimkon-slider-1')
    this.addEventListeners();
    this.callBackOnChange();
  }
  addEventListeners() {
    this.selectInputFrom = document.querySelector('.slider-1__input_from');
    this.selectInputFrom.addEventListener('input', (event:any) => {
      const value = (event.target.value);
      this.slider.bimkonSlider('update', {from:value})
      });
    this.selectInputTo = document.querySelector('.slider-1__input_to');
    this.selectInputTo.addEventListener('input', (event:any) => {
      const value = (event.target.value);
      this.slider.bimkonSlider('update', {to:value})
      });
    this.selectInputMin = document.querySelector('.slider-1__input_min');
    this.selectInputMin.addEventListener('input', (event:any) => {
      const value = (event.target.value);
      this.slider.bimkonSlider('update', {min:value})
      });
    this.selectInputMax = document.querySelector('.slider-1__input_max');
    this.selectInputMax.addEventListener('input', (event:any) => {
      const value = (event.target.value);
      this.slider.bimkonSlider('update', {max:value})
      });
    this.selectInputStep = document.querySelector('.slider-1__input_step');
    this.selectInputStep.addEventListener('input', (event:any) => {
      const value = (event.target.value);
      this.slider.bimkonSlider('update', {step:value})
      });
  } 
  callBackOnChange() {
    this.slider.bimkonSlider('callbackOnUpdate', (options: SliderOptions) => {
      const {from, to, min, max, step} = options;
      this.selectInputFrom = document.querySelector('.slider-1__input_from');
      this.selectInputFrom.value = String(from);

      this.selectInputTo = document.querySelector('.slider-1__input_to');
      this.selectInputTo.value = String(to);

      this.selectInputMin = document.querySelector('.slider-1__input_min');
      this.selectInputMin.value = String(min);

      this.selectInputMax = document.querySelector('.slider-1__input_max');
      this.selectInputMax.value = String(max);

      this.selectInputStep = document.querySelector('.slider-1__input_step');
      this.selectInputStep.value = String(step);
    }
  }
  


}



export {Control};
