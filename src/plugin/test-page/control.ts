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

  controlPanel: NodeListOf<Element>;

  constructor(sliderRootContainer: JQuery<Object>, index: number) {
    this.slider = sliderRootContainer;
    this.addEventListenersToInputs(index);
    this.callBackOnChange();
    this.initSlider();
  }

  @bind
  handleSliderInputFromChange(event: MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.slider.bimkonSlider('update', { from: Number(this.value.value) });
  }

  @bind
  handleSliderInputToChange(event: MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.slider.bimkonSlider('update', { to: Number(this.value.value) });
  }

  @bind
  handleSliderInputMinChange(event: MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.slider.bimkonSlider('update', { min: Number(this.value.value) });
  }

  @bind
  handleSliderInputMaxChange(event: MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.slider.bimkonSlider('update', { max: Number(this.value.value) });
  }

  @bind
  handleSliderInputStepChange(event: MouseEvent) {
    this.value = event.target as HTMLInputElement;
    this.slider.bimkonSlider('update', { step: Number(this.value.value) });
  }

  @bind
  handleSliderInputTipChange() {
    if (this.checkBoxTip.checked) {
      this.slider.bimkonSlider('update', { hasTip: true });
    } else {
      this.slider.bimkonSlider('update', { hasTip: false });
    }
  }

  @bind
  handleSliderInputVerticalChange() {
    if (this.checkBoxIsVertical.checked) {
      this.slider.bimkonSlider('update', { isVertical: true });
    } else {
      this.slider.bimkonSlider('update', { isVertical: false });
    }
  }

  @bind
  handleSliderInputRangeChange() {
    if (this.checkBoxIsRange.checked) {
      this.slider.bimkonSlider('update', { isRange: true });
    } else {
      this.slider.bimkonSlider('update', { isRange: false });
    }
  }

  addEventListenersToInputs(index: number) {
    this.controlPanel = document.querySelectorAll('.control-panel');
    this.selectedInputFrom = this.controlPanel[index].querySelector(
      '.slider__input_from',
    );
    this.selectedInputFrom.addEventListener(
      'input',
      this.handleSliderInputFromChange,
    );
    this.selectedInputTo = this.controlPanel[index].querySelector(
      '.slider__input_to',
    );
    this.selectedInputTo.addEventListener(
      'input',
      this.handleSliderInputToChange,
    );
    this.selectedInputMin = this.controlPanel[index].querySelector(
      '.slider__input_min',
    );
    this.selectedInputMin.addEventListener(
      'input',
      this.handleSliderInputMinChange,
    );
    this.selectedInputMax = this.controlPanel[index].querySelector(
      '.slider__input_max',
    );
    this.selectedInputMax.addEventListener(
      'input',
      this.handleSliderInputMaxChange,
    );
    this.selectedInputStep = this.controlPanel[index].querySelector(
      '.slider__input_step',
    );
    this.selectedInputStep.addEventListener(
      'input',
      this.handleSliderInputStepChange,
    );
    this.checkBoxTip = this.controlPanel[index].querySelector(
      '.slider__input_tip',
    );
    this.checkBoxTip.addEventListener('change', this.handleSliderInputTipChange);
    this.checkBoxIsVertical = this.controlPanel[index].querySelector(
      '.slider__input_is-vertical',
    );
    this.checkBoxIsVertical.addEventListener(
      'change',
      this.handleSliderInputVerticalChange,
    );
    this.checkBoxIsRange = this.controlPanel[index].querySelector(
      '.slider__input_is-range',
    );
    this.checkBoxIsRange.addEventListener(
      'change',
      this.handleSliderInputRangeChange,
    );
  }

  @bind
  handleInputsUpdateChange(options: SliderOptions) {
    const {
      from, to, min, max, step, isRange, isVertical, hasTip,
    } = options;

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
    this.slider.bimkonSlider('callbackOnUpdate', this.handleInputsUpdateChange);
  }

  initSlider() {
    this.slider.bimkonSlider('update', {});
  }
}
export default Control;
