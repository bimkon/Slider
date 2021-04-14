import '../myslider';
import { SliderOptions } from '../SliderOptions';

class Control {
  slider: JQuery<Object>;
  selectInputFrom: HTMLInputElement;
  selectInputTo: HTMLInputElement;
  selectInputMin: HTMLInputElement;
  selectInputMax: HTMLInputElement;
  selectInputStep: HTMLInputElement;
  checkBoxTip: HTMLInputElement;
  checkBoxIsVertical: HTMLInputElement;
  checkBoxIsRange:HTMLInputElement;


  constructor() {
    this.slider = $('.bimkon-slider-1')
    this.addEventListeners();
    this.callBackOnChange();
    this.initSlider()
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
    this.checkBoxTip = document.querySelector('.slider-1__input_tip');
    this.checkBoxTip.addEventListener('change', (event:any) => {
      if (this.checkBoxTip.checked) {
        this.slider.bimkonSlider('update', {hasTip:true})
      } else {
        this.slider.bimkonSlider('update', {hasTip:false})
      }
      });
    this.checkBoxIsVertical = document.querySelector('.slider-1__input_is-vertical');
    this.checkBoxIsVertical.addEventListener('change', (event:any) => {
      if (this.checkBoxIsVertical.checked) {
        this.slider.bimkonSlider('update', {isVertical:true})
      } else {
        this.slider.bimkonSlider('update', {isVertical:false})
      }
      });
      this.checkBoxIsRange = document.querySelector('.slider-1__input_is-range');
      this.checkBoxIsRange.addEventListener('change', (event:any) => {
        if (this.checkBoxIsRange.checked) {
          this.slider.bimkonSlider('update', {isRange:true})
        } else {
          this.slider.bimkonSlider('update', {isRange:false})
        }
        });
  } 
  callBackOnChange() {
    this.slider.bimkonSlider('callbackOnUpdate', (options: SliderOptions) => {
      const {from, to, min, max, step, isRange, isVertical, hasTip} = options;
      this.selectInputFrom = document.querySelector('.slider-1__input_from');
      this.selectInputFrom.valueAsNumber = from;

      this.selectInputTo = document.querySelector('.slider-1__input_to');
      this.selectInputTo.valueAsNumber = to;

      this.selectInputMin = document.querySelector('.slider-1__input_min');
      this.selectInputMin.valueAsNumber = min;

      this.selectInputMax = document.querySelector('.slider-1__input_max');
      this.selectInputMax.valueAsNumber = max;

      this.selectInputStep = document.querySelector('.slider-1__input_step');
      this.selectInputStep.valueAsNumber = step;

      this.selectInputStep = document.querySelector('.slider-1__input_tip');
      this.selectInputStep.checked = hasTip;

      this.selectInputStep = document.querySelector('.slider-1__input_is-vertical');
      this.selectInputStep.checked = isVertical;

      this.selectInputStep = document.querySelector('.slider-1__input_is-range');
      this.selectInputStep.checked = isRange;
    })
  }
  
  initSlider() {
    this.slider.bimkonSlider('update',{
      isRange: false,
      min: 0,
      max: 100,
      step: 1,
      isVertical: false,
      from: 30,
      to: 70,
      hasTip: true,
    
    });
  }

}



export {Control};
