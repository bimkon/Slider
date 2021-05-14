import '../myslider';
import bind from 'bind-decorator';
import { SliderOptions } from '../SliderOptions';

class Control {
  firstSlider: JQuery<Object>;

  secondSlider:JQuery<Object>;

  thirdSlider:JQuery<Object>;

  fourthSlider:JQuery<Object>;

  selectInputFrom: HTMLInputElement;

  selectInputTo: HTMLInputElement;

  selectInputMin: HTMLInputElement;

  selectInputMax: HTMLInputElement;

  selectInputStep: HTMLInputElement;

  checkBoxTip: HTMLInputElement;

  checkBoxIsVertical: HTMLInputElement;

  checkBoxIsRange:HTMLInputElement;

  inputFrom: EventListenerOrEventListenerObject;

  bindedMethod:EventListenerOrEventListenerObject;

  changeFieldwithData:EventListenerOrEventListenerObject;

  value:HTMLInputElement;

  constructor() {
    this.firstSlider = $('.bimkon-slider-1');
    this.secondSlider = $('.bimkon-slider-2');
    this.thirdSlider = $('.bimkon-slider-3');
    this.fourthSlider = $('.bimkon-slider-4');
    this.addEventListeners();
    this.callBackOnChange();
    this.initSlider();
  }

  @bind
  changeFieldFromFirstSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.firstSlider.bimkonSlider('update', { from: Number(this.value.value) });
  }

  @bind
  changeFieldToFirstSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.firstSlider.bimkonSlider('update', { to: Number(this.value.value) });
  }

  @bind
  changeFieldMinFirstSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.firstSlider.bimkonSlider('update', { min: Number(this.value.value) });
  }

  @bind
  changeFieldMaxFirstSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.firstSlider.bimkonSlider('update', { max: Number(this.value.value) });
  }

  @bind
  changeFieldStepFirstSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.firstSlider.bimkonSlider('update', { step: Number(this.value.value) });
  }

  @bind
  changeFieldTipFirstSlider() {
    if (this.checkBoxTip.checked) {
      this.firstSlider.bimkonSlider('update', { hasTip: true });
    } else {
      this.firstSlider.bimkonSlider('update', { hasTip: false });
    }
  }

  @bind
  changeFieldVerticalFirstSlider() {
    if (this.checkBoxIsVertical.checked) {
      this.firstSlider.bimkonSlider('update', { isVertical: true });
    } else {
      this.firstSlider.bimkonSlider('update', { isVertical: false });
    }
  }

  @bind
  changeFieldRangeFirstSlider() {
    if (this.checkBoxIsRange.checked) {
      this.firstSlider.bimkonSlider('update', { isRange: true });
    } else {
      this.firstSlider.bimkonSlider('update', { isRange: false });
    }
  }

  addEventListeners() {
    this.selectInputFrom = document.querySelector('.slider-1__input_from');
    this.selectInputFrom.addEventListener('input', this.changeFieldFromFirstSlider);
    this.selectInputTo = document.querySelector('.slider-1__input_to');
    this.selectInputTo.addEventListener('input', this.changeFieldToFirstSlider);
    this.selectInputMin = document.querySelector('.slider-1__input_min');
    this.selectInputMin.addEventListener('input', this.changeFieldMinFirstSlider);
    this.selectInputMax = document.querySelector('.slider-1__input_max');
    this.selectInputMax.addEventListener('input', this.changeFieldMaxFirstSlider);
    this.selectInputStep = document.querySelector('.slider-1__input_step');
    this.selectInputStep.addEventListener('input', this.changeFieldStepFirstSlider);
    this.checkBoxTip = document.querySelector('.slider-1__input_tip');
    this.checkBoxTip.addEventListener('change', this.changeFieldTipFirstSlider);
    this.checkBoxIsVertical = document.querySelector('.slider-1__input_is-vertical');
    this.checkBoxIsVertical.addEventListener('change', this.changeFieldVerticalFirstSlider);
    this.checkBoxIsRange = document.querySelector('.slider-1__input_is-range');
    this.checkBoxIsRange.addEventListener('change', this.changeFieldRangeFirstSlider);
  }

  @bind
  updateInputOnChange(options:SliderOptions) {
    const {
      from, to, min, max, step, isRange, isVertical, hasTip,
    } = options;
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
  }

  callBackOnChange() {
    this.firstSlider.bimkonSlider('callbackOnUpdate', this.updateInputOnChange);
  }

  initSlider() {
    this.firstSlider.bimkonSlider('update', {
      isRange: true,
      min: 20,
      max: 333,
      step: 1,
      isVertical: true,
      from: 30,
      to: 70,
      hasTip: true,

    });
  }
}
export { Control };
export default { Control };
