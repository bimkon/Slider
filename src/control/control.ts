import '../plugin/MySlider';
import bind from 'bind-decorator';
import SliderOptions from '../plugin/SliderOptions';

class Control {
  selectedInputFrom!: HTMLInputElement;

  selectedInputTo!: HTMLInputElement;

  selectedInputMin!: HTMLInputElement;

  selectedInputMax!: HTMLInputElement;

  selectedInputStep!: HTMLInputElement;

  checkBoxTip!: HTMLInputElement;

  checkBoxIsVertical!:HTMLInputElement;

  checkBoxIsRange!: HTMLInputElement ;

  value!: HTMLInputElement;

  slider: JQuery<object>;

  controlPanel!: NodeListOf<Element>;

  constructor(sliderRootContainer: JQuery<Object>, index: number) {
    this.slider = sliderRootContainer;
    this.addEventListenersToInputs(index);
    this.callBackOnChange();
    this.initSlider();
  }

  @bind
  handleSliderInputFromChange(event: Event) {
    this.value = event.target as HTMLInputElement;
    this.slider.bimkonSlider('update', { from: Number(this.value.value) });
  }

  @bind
  handleSliderInputToChange(event: Event) {
    this.value = event.target as HTMLInputElement;
    this.slider.bimkonSlider('update', { to: Number(this.value.value) });
  }

  @bind
  handleSliderInputMinChange(event: Event) {
    this.value = event.target as HTMLInputElement;
    this.slider.bimkonSlider('update', { min: Number(this.value.value) });
  }

  @bind
  handleSliderInputMaxChange(event: Event) {
    this.value = event.target as HTMLInputElement;
    this.slider.bimkonSlider('update', { max: Number(this.value.value) });
  }

  @bind
  handleSliderInputStepChange(event: Event) {
    this.value = event.target as HTMLInputElement;
    this.slider.bimkonSlider('update', { step: Number(this.value.value) });
  }

  @bind
  handleSliderInputTipChange() {
    if (this.checkBoxTip!.checked) {
      this.slider.bimkonSlider('update', { hasTip: true });
    } else {
      this.slider.bimkonSlider('update', { hasTip: false });
    }
  }

  @bind
  handleSliderInputVerticalChange() {
    if (this.checkBoxIsVertical!.checked) {
      this.slider.bimkonSlider('update', { isVertical: true });
    } else {
      this.slider.bimkonSlider('update', { isVertical: false });
    }
  }

  @bind
  handleSliderInputRangeChange() {
    if (this.checkBoxIsRange!.checked) {
      this.slider.bimkonSlider('update', { isRange: true });
    } else {
      this.slider.bimkonSlider('update', { isRange: false });
    }
  }

  addEventListenersToInputs(index: number) {
    this.controlPanel = document.querySelectorAll('.control');
    this.selectedInputFrom = this.controlPanel[index].querySelector(
      '.control__input-from',
    ) as HTMLInputElement;
    this.selectedInputFrom!.addEventListener(
      'input',
      this.handleSliderInputFromChange,
    );
    this.selectedInputTo = this.controlPanel[index].querySelector(
      '.control__input-to',
    ) as HTMLInputElement;
    this.selectedInputTo!.addEventListener(
      'input',
      this.handleSliderInputToChange,
    );
    this.selectedInputMin = this.controlPanel[index].querySelector(
      '.control__input-min',
    ) as HTMLInputElement;
    this.selectedInputMin!.addEventListener(
      'input',
      this.handleSliderInputMinChange,
    );
    this.selectedInputMax = this.controlPanel[index].querySelector(
      '.control__input-max',
    ) as HTMLInputElement;
    this.selectedInputMax!.addEventListener(
      'input',
      this.handleSliderInputMaxChange,
    );
    this.selectedInputStep = this.controlPanel[index].querySelector(
      '.control__input-step',
    ) as HTMLInputElement;
    this.selectedInputStep!.addEventListener(
      'input',
      this.handleSliderInputStepChange,
    );
    this.checkBoxTip = this.controlPanel[index].querySelector(
      '.control__input-tip',
    ) as HTMLInputElement;
    this.checkBoxTip!.addEventListener(
      'change',
      this.handleSliderInputTipChange,
    );
    this.checkBoxIsVertical = this.controlPanel[index].querySelector(
      '.control__input-is-vertical',
    ) as HTMLInputElement;
    this.checkBoxIsVertical!.addEventListener(
      'change',
      this.handleSliderInputVerticalChange,
    );
    this.checkBoxIsRange = this.controlPanel[index].querySelector(
      '.control__input-is-range',
    ) as HTMLInputElement;
    this.checkBoxIsRange!.addEventListener(
      'change',
      this.handleSliderInputRangeChange,
    );
  }

  @bind
  handleInputsUpdateChange(options: SliderOptions) {
    const {
      from, to, min, max, step, isRange, isVertical, hasTip,
    } = options;

    this.selectedInputFrom.valueAsNumber  = from as number;
    this.selectedInputTo.valueAsNumber = to as number;
    this.selectedInputMin.valueAsNumber = min as number;
    this.selectedInputMax.valueAsNumber = max as number;
    this.selectedInputStep.valueAsNumber = step as number;
    this.checkBoxTip.checked = hasTip as boolean;
    this.checkBoxIsVertical.checked = isVertical as boolean;
    this.checkBoxIsRange.checked = isRange as boolean;
  }

  callBackOnChange() {
    this.slider.bimkonSlider('callbackOnUpdate', this.handleInputsUpdateChange);
  }

  initSlider() {
    this.slider.bimkonSlider('update', {});
  }
}
export default Control;
