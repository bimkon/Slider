import '../myslider';
import bind from 'bind-decorator';
import SliderOptions from '../SliderOptions';

class Control {
  selectedInputFrom: HTMLInputElement;

  selectedInputTo: HTMLInputElement;

  selectedInputMin: HTMLInputElement;

  selectedInputMax: HTMLInputElement;

  selectedInputStep: HTMLInputElement;

  checkBoxTip: HTMLInputElement;

  checkBoxIsVertical: HTMLInputElement;

  checkBoxIsRange: HTMLInputElement;

  value: HTMLInputElement;

  slider: JQuery<object>;

  controlPannel: NodeListOf<Element>;

  constructor(sliderRootContainer: JQuery<Object>, index: number) {
    this.slider = sliderRootContainer;
    this.addEventListeners(index);
    this.callBackOnChange();
    this.initSlider();
  }

  @bind
  changeFieldFromFirstSlider(event: MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.slider.bimkonSlider('update', { from: Number(this.value.value) });
  }

  @bind
  changeFieldToFirstSlider(event: MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.slider.bimkonSlider('update', { to: Number(this.value.value) });
  }

  @bind
  changeFieldMinFirstSlider(event: MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.slider.bimkonSlider('update', { min: Number(this.value.value) });
  }

  @bind
  changeFieldMaxFirstSlider(event: MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.slider.bimkonSlider('update', { max: Number(this.value.value) });
  }

  @bind
  changeFieldStepFirstSlider(event: MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.slider.bimkonSlider('update', { step: Number(this.value.value) });
  }

  @bind
  changeFieldTipFirstSlider() {
    if (this.checkBoxTip.checked) {
      this.slider.bimkonSlider('update', { hasTip: true });
    } else {
      this.slider.bimkonSlider('update', { hasTip: false });
    }
  }

  @bind
  changeFieldVerticalFirstSlider() {
    if (this.checkBoxIsVertical.checked) {
      this.slider.bimkonSlider('update', { isVertical: true });
    } else {
      this.slider.bimkonSlider('update', { isVertical: false });
    }
  }

  @bind
  changeFieldRangeFirstSlider() {
    if (this.checkBoxIsRange.checked) {
      this.slider.bimkonSlider('update', { isRange: true });
    } else {
      this.slider.bimkonSlider('update', { isRange: false });
    }
  }

  addEventListeners(index: number) {
    this.controlPannel = document.querySelectorAll('.control-panel');
    this.selectedInputFrom = this.controlPannel[index].querySelector(
      '.slider__input_from'
    );
    this.selectedInputFrom.addEventListener(
      'input',
      this.changeFieldFromFirstSlider
    );
    this.selectedInputTo = this.controlPannel[index].querySelector(
      '.slider__input_to'
    );
    this.selectedInputTo.addEventListener(
      'input',
      this.changeFieldToFirstSlider
    );
    this.selectedInputMin = this.controlPannel[index].querySelector(
      '.slider__input_min'
    );
    this.selectedInputMin.addEventListener(
      'input',
      this.changeFieldMinFirstSlider
    );
    this.selectedInputMax = this.controlPannel[index].querySelector(
      '.slider__input_max'
    );
    this.selectedInputMax.addEventListener(
      'input',
      this.changeFieldMaxFirstSlider
    );
    this.selectedInputStep = this.controlPannel[index].querySelector(
      '.slider__input_step'
    );
    this.selectedInputStep.addEventListener(
      'input',
      this.changeFieldStepFirstSlider
    );
    this.checkBoxTip = this.controlPannel[index].querySelector(
      '.slider__input_tip'
    );
    this.checkBoxTip.addEventListener('change', this.changeFieldTipFirstSlider);
    this.checkBoxIsVertical = this.controlPannel[index].querySelector(
      '.slider__input_is-vertical'
    );
    this.checkBoxIsVertical.addEventListener(
      'change',
      this.changeFieldVerticalFirstSlider
    );
    this.checkBoxIsRange = this.controlPannel[index].querySelector(
      '.slider__input_is-range'
    );
    this.checkBoxIsRange.addEventListener(
      'change',
      this.changeFieldRangeFirstSlider
    );
  }

  @bind
  updateInputOnChange(options: SliderOptions) {
    const { from, to, min, max, step, isRange, isVertical, hasTip } = options;

    this.selectedInputFrom.valueAsNumber = from;
    this.selectedInputTo.valueAsNumber = to;
    this.selectedInputMin.valueAsNumber = min;
    this.selectedInputMax.valueAsNumber = max;
    this.selectedInputStep.valueAsNumber = step;
    this.checkBoxTip.checked = hasTip;
    this.checkBoxIsVertical.checked = isVertical;
    this.checkBoxIsRange.checked = isRange;
  }

  callBackOnChange() {
    this.slider.bimkonSlider('callbackOnUpdate', this.updateInputOnChange);
  }

  initSlider() {
    this.slider.bimkonSlider('update', {});
  }
}
export default Control;
