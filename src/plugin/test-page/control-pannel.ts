import '../myslider';
import bind from 'bind-decorator';
import { SliderOptions } from '../SliderOptions';

class Control {
  firstSlider: JQuery<Object>;

  secondSlider:JQuery<Object>;

  thirdSlider:JQuery<Object>;

  fourthSlider:JQuery<Object>;

  selectInputFromFirst: HTMLInputElement;

  selectInputToFirst: HTMLInputElement;

  selectInputMinFirst: HTMLInputElement;

  selectInputMaxFirst: HTMLInputElement;

  selectInputStepFirst: HTMLInputElement;

  checkBoxTipFirst: HTMLInputElement;

  checkBoxIsVerticalFirst: HTMLInputElement;

  checkBoxIsRangeFirst:HTMLInputElement;

  selectInputFromSecond: HTMLInputElement;

  selectInputToSecond: HTMLInputElement;

  selectInputMinSecond: HTMLInputElement;

  selectInputMaxSecond: HTMLInputElement;

  selectInputStepSecond: HTMLInputElement;

  checkBoxTipSecond: HTMLInputElement;

  checkBoxIsVerticalSecond: HTMLInputElement;

  checkBoxIsRangeSecond:HTMLInputElement;

  selectInputFromThird: HTMLInputElement;

  selectInputToThird: HTMLInputElement;

  selectInputMinThird: HTMLInputElement;

  selectInputMaxThird: HTMLInputElement;

  selectInputStepThird: HTMLInputElement;

  checkBoxTipThird: HTMLInputElement;

  checkBoxIsVerticalThird: HTMLInputElement;

  checkBoxIsRangeThird:HTMLInputElement;

  selectInputFromFourth: HTMLInputElement;

  selectInputToFourth: HTMLInputElement;

  selectInputMinFourth: HTMLInputElement;

  selectInputMaxFourth: HTMLInputElement;

  selectInputStepFourth: HTMLInputElement;

  checkBoxTipFourth: HTMLInputElement;

  checkBoxIsVerticalFourth: HTMLInputElement;

  checkBoxIsRangeFourth:HTMLInputElement;

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
    if (this.checkBoxTipFirst.checked) {
      this.firstSlider.bimkonSlider('update', { hasTip: true });
    } else {
      this.firstSlider.bimkonSlider('update', { hasTip: false });
    }
  }

  @bind
  changeFieldVerticalFirstSlider() {
    if (this.checkBoxIsVerticalFirst.checked) {
      this.firstSlider.bimkonSlider('update', { isVertical: true });
    } else {
      this.firstSlider.bimkonSlider('update', { isVertical: false });
    }
  }

  @bind
  changeFieldRangeFirstSlider() {
    if (this.checkBoxIsRangeFirst.checked) {
      this.firstSlider.bimkonSlider('update', { isRange: true });
    } else {
      this.firstSlider.bimkonSlider('update', { isRange: false });
    }
  }

  @bind
  changeFieldFromSecondSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.secondSlider.bimkonSlider('update', { from: Number(this.value.value) });
  }

  @bind
  changeFieldToSecondSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.secondSlider.bimkonSlider('update', { to: Number(this.value.value) });
  }

  @bind
  changeFieldMinSecondSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.secondSlider.bimkonSlider('update', { min: Number(this.value.value) });
  }

  @bind
  changeFieldMaxSecondSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.secondSlider.bimkonSlider('update', { max: Number(this.value.value) });
  }

  @bind
  changeFieldStepSecondSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.secondSlider.bimkonSlider('update', { step: Number(this.value.value) });
  }

  @bind
  changeFieldTipSecondSlider() {
    if (this.checkBoxTipSecond.checked) {
      this.secondSlider.bimkonSlider('update', { hasTip: true });
    } else {
      this.secondSlider.bimkonSlider('update', { hasTip: false });
    }
  }

  @bind
  changeFieldVerticalSecondSlider() {
    if (this.checkBoxIsVerticalSecond.checked) {
      this.secondSlider.bimkonSlider('update', { isVertical: true });
    } else {
      this.secondSlider.bimkonSlider('update', { isVertical: false });
    }
  }

  @bind
  changeFieldRangeSecondSlider() {
    if (this.checkBoxIsRangeSecond.checked) {
      this.secondSlider.bimkonSlider('update', { isRange: true });
    } else {
      this.secondSlider.bimkonSlider('update', { isRange: false });
    }
  }

  @bind
  changeFieldFromThirdSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.thirdSlider.bimkonSlider('update', { from: Number(this.value.value) });
  }

  @bind
  changeFieldToThirdSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.thirdSlider.bimkonSlider('update', { to: Number(this.value.value) });
  }

  @bind
  changeFieldMinThirdSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.thirdSlider.bimkonSlider('update', { min: Number(this.value.value) });
  }

  @bind
  changeFieldMaxThirdSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.thirdSlider.bimkonSlider('update', { max: Number(this.value.value) });
  }

  @bind
  changeFieldStepThirdSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.thirdSlider.bimkonSlider('update', { step: Number(this.value.value) });
  }

  @bind
  changeFieldTipThirdSlider() {
    if (this.checkBoxTipThird.checked) {
      this.thirdSlider.bimkonSlider('update', { hasTip: true });
    } else {
      this.thirdSlider.bimkonSlider('update', { hasTip: false });
    }
  }

  @bind
  changeFieldVerticalThirdSlider() {
    if (this.checkBoxIsVerticalThird.checked) {
      this.thirdSlider.bimkonSlider('update', { isVertical: true });
    } else {
      this.thirdSlider.bimkonSlider('update', { isVertical: false });
    }
  }

  @bind
  changeFieldRangeThirdSlider() {
    if (this.checkBoxIsRangeThird.checked) {
      this.thirdSlider.bimkonSlider('update', { isRange: true });
    } else {
      this.thirdSlider.bimkonSlider('update', { isRange: false });
    }
  }

  @bind
  changeFieldFromFourthSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.fourthSlider.bimkonSlider('update', { from: Number(this.value.value) });
  }

  @bind
  changeFieldToFourthSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.fourthSlider.bimkonSlider('update', { to: Number(this.value.value) });
  }

  @bind
  changeFieldMinFourthSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.fourthSlider.bimkonSlider('update', { min: Number(this.value.value) });
  }

  @bind
  changeFieldMaxFourthSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.fourthSlider.bimkonSlider('update', { max: Number(this.value.value) });
  }

  @bind
  changeFieldStepFourthSlider(event:MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.fourthSlider.bimkonSlider('update', { step: Number(this.value.value) });
  }

  @bind
  changeFieldTipFourthSlider() {
    if (this.checkBoxTipFourth.checked) {
      this.fourthSlider.bimkonSlider('update', { hasTip: true });
    } else {
      this.fourthSlider.bimkonSlider('update', { hasTip: false });
    }
  }

  @bind
  changeFieldVerticalFourthSlider() {
    if (this.checkBoxIsVerticalFourth.checked) {
      this.fourthSlider.bimkonSlider('update', { isVertical: true });
    } else {
      this.fourthSlider.bimkonSlider('update', { isVertical: false });
    }
  }

  @bind
  changeFieldRangeFourthSlider() {
    if (this.checkBoxIsRangeFourth.checked) {
      this.fourthSlider.bimkonSlider('update', { isRange: true });
    } else {
      this.fourthSlider.bimkonSlider('update', { isRange: false });
    }
  }

  addEventListeners() {
    this.selectInputFromFirst = document.querySelector('.slider-1__input_from');
    this.selectInputFromFirst.addEventListener('input', this.changeFieldFromFirstSlider);
    this.selectInputToFirst = document.querySelector('.slider-1__input_to');
    this.selectInputToFirst.addEventListener('input', this.changeFieldToFirstSlider);
    this.selectInputMinFirst = document.querySelector('.slider-1__input_min');
    this.selectInputMinFirst.addEventListener('input', this.changeFieldMinFirstSlider);
    this.selectInputMaxFirst = document.querySelector('.slider-1__input_max');
    this.selectInputMaxFirst.addEventListener('input', this.changeFieldMaxFirstSlider);
    this.selectInputStepFirst = document.querySelector('.slider-1__input_step');
    this.selectInputStepFirst.addEventListener('input', this.changeFieldStepFirstSlider);
    this.checkBoxTipFirst = document.querySelector('.slider-1__input_tip');
    this.checkBoxTipFirst.addEventListener('change', this.changeFieldTipFirstSlider);
    this.checkBoxIsVerticalFirst = document.querySelector('.slider-1__input_is-vertical');
    this.checkBoxIsVerticalFirst.addEventListener('change', this.changeFieldVerticalFirstSlider);
    this.checkBoxIsRangeFirst = document.querySelector('.slider-1__input_is-range');
    this.checkBoxIsRangeFirst.addEventListener('change', this.changeFieldRangeFirstSlider);

    this.selectInputFromSecond = document.querySelector('.slider-2__input_from');
    this.selectInputFromSecond.addEventListener('input', this.changeFieldFromSecondSlider);
    this.selectInputToSecond = document.querySelector('.slider-2__input_to');
    this.selectInputToSecond.addEventListener('input', this.changeFieldToSecondSlider);
    this.selectInputMinSecond = document.querySelector('.slider-2__input_min');
    this.selectInputMinSecond.addEventListener('input', this.changeFieldMinSecondSlider);
    this.selectInputMaxSecond = document.querySelector('.slider-2__input_max');
    this.selectInputMaxSecond.addEventListener('input', this.changeFieldMaxSecondSlider);
    this.selectInputStepSecond = document.querySelector('.slider-2__input_step');
    this.selectInputStepSecond.addEventListener('input', this.changeFieldStepSecondSlider);
    this.checkBoxTipSecond = document.querySelector('.slider-2__input_tip');
    this.checkBoxTipSecond.addEventListener('change', this.changeFieldTipSecondSlider);
    this.checkBoxIsVerticalSecond = document.querySelector('.slider-2__input_is-vertical');
    this.checkBoxIsVerticalSecond.addEventListener('change', this.changeFieldVerticalSecondSlider);
    this.checkBoxIsRangeSecond = document.querySelector('.slider-2__input_is-range');
    this.checkBoxIsRangeSecond.addEventListener('change', this.changeFieldRangeSecondSlider);

    this.selectInputFromThird = document.querySelector('.slider-3__input_from');
    this.selectInputFromThird.addEventListener('input', this.changeFieldFromThirdSlider);
    this.selectInputToThird = document.querySelector('.slider-3__input_to');
    this.selectInputToThird.addEventListener('input', this.changeFieldToThirdSlider);
    this.selectInputMinThird = document.querySelector('.slider-3__input_min');
    this.selectInputMinThird.addEventListener('input', this.changeFieldMinThirdSlider);
    this.selectInputMaxThird = document.querySelector('.slider-3__input_max');
    this.selectInputMaxThird.addEventListener('input', this.changeFieldMaxThirdSlider);
    this.selectInputStepThird = document.querySelector('.slider-3__input_step');
    this.selectInputStepThird.addEventListener('input', this.changeFieldStepThirdSlider);
    this.checkBoxTipThird = document.querySelector('.slider-3__input_tip');
    this.checkBoxTipThird.addEventListener('change', this.changeFieldTipThirdSlider);
    this.checkBoxIsVerticalThird = document.querySelector('.slider-3__input_is-vertical');
    this.checkBoxIsVerticalThird.addEventListener('change', this.changeFieldVerticalThirdSlider);
    this.checkBoxIsRangeThird = document.querySelector('.slider-3__input_is-range');
    this.checkBoxIsRangeThird.addEventListener('change', this.changeFieldRangeThirdSlider);

    this.selectInputFromFourth = document.querySelector('.slider-4__input_from');
    this.selectInputFromFourth.addEventListener('input', this.changeFieldFromFourthSlider);
    this.selectInputToFourth = document.querySelector('.slider-4__input_to');
    this.selectInputToFourth.addEventListener('input', this.changeFieldToFourthSlider);
    this.selectInputMinFourth = document.querySelector('.slider-4__input_min');
    this.selectInputMinFourth.addEventListener('input', this.changeFieldMinFourthSlider);
    this.selectInputMaxFourth = document.querySelector('.slider-4__input_max');
    this.selectInputMaxFourth.addEventListener('input', this.changeFieldMaxFourthSlider);
    this.selectInputStepFourth = document.querySelector('.slider-4__input_step');
    this.selectInputStepFourth.addEventListener('input', this.changeFieldStepFourthSlider);
    this.checkBoxTipFourth = document.querySelector('.slider-4__input_tip');
    this.checkBoxTipFourth.addEventListener('change', this.changeFieldTipFourthSlider);
    this.checkBoxIsVerticalFourth = document.querySelector('.slider-4__input_is-vertical');
    this.checkBoxIsVerticalFourth.addEventListener('change', this.changeFieldVerticalFourthSlider);
    this.checkBoxIsRangeFourth = document.querySelector('.slider-4__input_is-range');
    this.checkBoxIsRangeFourth.addEventListener('change', this.changeFieldRangeFourthSlider);
  }

  @bind
  updateInputOnChangeFirstSlider(options:SliderOptions) {
    const {
      from, to, min, max, step, isRange, isVertical, hasTip,
    } = options;

    this.selectInputFromFirst.valueAsNumber = from;
    this.selectInputToFirst.valueAsNumber = to;
    this.selectInputMinFirst.valueAsNumber = min;
    this.selectInputMaxFirst.valueAsNumber = max;
    this.selectInputStepFirst.valueAsNumber = step;
    this.selectInputStepFirst.checked = hasTip;
    this.selectInputStepFirst.checked = isVertical;
    this.selectInputStepFirst.checked = isRange;
  }

  @bind
  updateInputOnChangeSecondSlider(options:SliderOptions) {
    const {
      from, to, min, max, step, isRange, isVertical, hasTip,
    } = options;

    this.selectInputFromSecond.valueAsNumber = from;
    this.selectInputToSecond.valueAsNumber = to;
    this.selectInputMinSecond.valueAsNumber = min;
    this.selectInputMaxSecond.valueAsNumber = max;
    this.selectInputStepSecond.valueAsNumber = step;
    this.selectInputStepSecond.checked = hasTip;
    this.selectInputStepSecond.checked = isVertical;
    this.selectInputStepSecond.checked = isRange;
  }

  @bind
  updateInputOnChangeThirdSlider(options:SliderOptions) {
    const {
      from, to, min, max, step, isRange, isVertical, hasTip,
    } = options;

    this.selectInputFromThird.valueAsNumber = from;
    this.selectInputToThird.valueAsNumber = to;
    this.selectInputMinThird.valueAsNumber = min;
    this.selectInputMaxThird.valueAsNumber = max;
    this.selectInputStepThird.valueAsNumber = step;
    this.selectInputStepThird.checked = hasTip;
    this.selectInputStepThird.checked = isVertical;
    this.selectInputStepThird.checked = isRange;
  }

  @bind
  updateInputOnChangeFourthSlider(options:SliderOptions) {
    const {
      from, to, min, max, step, isRange, isVertical, hasTip,
    } = options;

    this.selectInputFromFourth.valueAsNumber = from;
    this.selectInputToFourth.valueAsNumber = to;
    this.selectInputMinFourth.valueAsNumber = min;
    this.selectInputMaxFourth.valueAsNumber = max;
    this.selectInputStepFourth.valueAsNumber = step;
    this.selectInputStepFourth.checked = hasTip;
    this.selectInputStepFourth.checked = isVertical;
    this.selectInputStepFourth.checked = isRange;
  }

  callBackOnChange() {
    this.firstSlider.bimkonSlider('callbackOnUpdate', this.updateInputOnChangeFirstSlider);
    this.secondSlider.bimkonSlider('callbackOnUpdate', this.updateInputOnChangeSecondSlider);
    this.thirdSlider.bimkonSlider('callbackOnUpdate', this.updateInputOnChangeThirdSlider);
    this.fourthSlider.bimkonSlider('callbackOnUpdate', this.updateInputOnChangeFourthSlider);
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

    this.secondSlider.bimkonSlider('update', {
      isRange: false,
      min: 0,
      max: 100,
      step: 1,
      isVertical: true,
      from: 30,
      to: 70,
      hasTip: true,

    });
    this.thirdSlider.bimkonSlider('update', {
      isRange: true,
      min: 200,
      max: 300,
      step: 1,
      isVertical: false,
      from: 220,
      to: 300,
      hasTip: true,

    });

    this.fourthSlider.bimkonSlider('update', {
      isRange: true,
      min: 20,
      max: 333,
      step: 1,
      isVertical: true,
      from: 30,
      to: 70,
      hasTip: false,

    });
  }
}
export { Control };
export default { Control };
