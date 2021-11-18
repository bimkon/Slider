import '../plugin/jsBimkonSlider';
import bind from 'bind-decorator';
import SliderOptions from '../plugin/SliderOptions';

class Control {
  selectedInputFrom: HTMLInputElement | Element | null = null;

  selectedInputTo: HTMLInputElement | Element | null = null;

  selectedInputMin: HTMLInputElement | Element | null = null;

  selectedInputMax: HTMLInputElement | Element | null = null;

  selectedInputStep: HTMLInputElement | Element | null = null;

  checkBoxTip: HTMLInputElement | null = null;

  checkBoxIsVertical: HTMLInputElement | null = null;

  checkBoxIsRange: HTMLInputElement | null = null;

  value: HTMLInputElement | null | EventTarget = null;

  slider: JQuery<object>;

  controlPanel: NodeListOf<Element> | null = null;

  constructor(sliderRootContainer: JQuery<Object>, index: number) {
    this.slider = sliderRootContainer;
    this.addEventListenersToInputs(index);
    this.callBackOnChange();
    this.initSlider();
  }

  @bind
  handleSliderInputFromChange(event: Event) {
    this.value = event.target;
    if (this.value === null) return;
    if (this.value instanceof HTMLInputElement) this.slider.bimkonSlider('update', { from: Number(this.value.value) });
  }

  @bind
  handleSliderInputToChange(event: Event) {
    this.value = event.target;
    if (this.value === null) return;
    if (this.value instanceof HTMLInputElement) this.slider.bimkonSlider('update', { to: Number(this.value.value) });
  }

  @bind
  handleSliderInputMinChange(event: Event) {
    this.value = event.target;
    if (this.value === null) return;
    if (this.value instanceof HTMLInputElement) this.slider.bimkonSlider('update', { min: Number(this.value.value) });
  }

  @bind
  handleSliderInputMaxChange(event: Event) {
    this.value = event.target;
    if (this.value instanceof HTMLInputElement) this.slider.bimkonSlider('update', { max: Number(this.value.value) });
  }

  @bind
  handleSliderInputStepChange(event: Event) {
    this.value = event.target;
    if (this.value === null) return;
    if (this.value instanceof HTMLInputElement) this.slider.bimkonSlider('update', { step: Number(this.value.value) });
  }

  @bind
  handleSliderInputTipChange() {
    if (this.checkBoxTip === null) return;
    if (this.checkBoxTip.checked) {
      this.slider.bimkonSlider('update', { hasTip: true });
    } else {
      this.slider.bimkonSlider('update', { hasTip: false });
    }
  }

  @bind
  handleSliderInputVerticalChange() {
    if (this.checkBoxIsVertical === null) return;
    if (this.checkBoxIsVertical.checked) {
      this.slider.bimkonSlider('update', { isVertical: true });
    } else {
      this.slider.bimkonSlider('update', { isVertical: false });
    }
  }

  @bind
  handleSliderInputRangeChange() {
    if (this.checkBoxIsRange === null) return;
    if (this.checkBoxIsRange.checked) {
      this.slider.bimkonSlider('update', { isRange: true });
    } else {
      this.slider.bimkonSlider('update', { isRange: false });
    }
  }

  addEventListenersToInputs(index: number) {
    this.controlPanel = document.querySelectorAll('.control');
    this.selectedInputFrom = this.controlPanel[index].querySelector(
      '.control__input-from',
    );
    if (this.selectedInputFrom instanceof HTMLInputElement) {
      if (this.selectedInputFrom === null) return;
      this.selectedInputFrom.addEventListener(
        'input',
        this.handleSliderInputFromChange,
      );
    }

    this.selectedInputTo = this.controlPanel[index].querySelector(
      '.control__input-to',
    );
    if (this.selectedInputFrom instanceof HTMLInputElement) {
      if (this.selectedInputTo === null) return;
      this.selectedInputTo.addEventListener(
        'input',
        this.handleSliderInputToChange,
      );
    }

    this.selectedInputMin = this.controlPanel[index].querySelector(
      '.control__input-min',
    );
    if (this.selectedInputFrom instanceof HTMLInputElement) {
      if (this.selectedInputMin === null) return;
      this.selectedInputMin.addEventListener(
        'input',
        this.handleSliderInputMinChange,
      );
    }

    this.selectedInputMax = this.controlPanel[index].querySelector(
      '.control__input-max',
    );
    if (this.selectedInputFrom instanceof HTMLInputElement) {
      if (this.selectedInputMax === null) return;
      this.selectedInputMax.addEventListener(
        'input',
        this.handleSliderInputMaxChange,
      );
    }

    this.selectedInputStep = this.controlPanel[index].querySelector(
      '.control__input-step',
    );
    if (this.selectedInputFrom instanceof HTMLInputElement) {
      if (this.selectedInputStep === null) return;
      this.selectedInputStep.addEventListener(
        'input',
        this.handleSliderInputStepChange,
      );
    }

    const checkBoxTip = this.controlPanel[index].querySelector(
      '.control__input-tip',
    );
    if (checkBoxTip instanceof HTMLInputElement) this.checkBoxTip = checkBoxTip;
    if (this.checkBoxTip === null) return;
    this.checkBoxTip.addEventListener(
      'change',
      this.handleSliderInputTipChange,
    );
    const checkBoxIsVertical = this.controlPanel[index].querySelector(
      '.control__input-is-vertical',
    );
    if (checkBoxIsVertical instanceof HTMLInputElement) {
      this.checkBoxIsVertical = checkBoxIsVertical;
    }
    if (this.checkBoxIsVertical === null) return;
    this.checkBoxIsVertical.addEventListener(
      'change',
      this.handleSliderInputVerticalChange,
    );

    const checkBoxIsRange = this.controlPanel[index].querySelector(
      '.control__input-is-range',
    );
    if (checkBoxIsRange instanceof HTMLInputElement) this.checkBoxIsRange = checkBoxIsRange;
    if (this.checkBoxIsRange === null) return;
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
    if (from === undefined || this.selectedInputFrom === null) return;
    if (this.selectedInputFrom instanceof HTMLInputElement) {
      this.selectedInputFrom.valueAsNumber = from;
    }

    if (to === undefined || this.selectedInputTo === null) return;
    if (this.selectedInputTo instanceof HTMLInputElement) {
      this.selectedInputTo.valueAsNumber = to;
    }

    if (min === undefined || this.selectedInputMin === null) return;
    if (this.selectedInputMin instanceof HTMLInputElement) {
      this.selectedInputMin.valueAsNumber = min;
    }
    if (max === undefined || this.selectedInputMax === null) return;
    if (this.selectedInputMax instanceof HTMLInputElement) {
      this.selectedInputMax.valueAsNumber = max;
    }
    if (step === undefined || this.selectedInputStep === null) return;
    if (this.selectedInputStep instanceof HTMLInputElement) {
      this.selectedInputStep.valueAsNumber = step;
    }

    if (hasTip === undefined || this.checkBoxTip === null) return;
    this.checkBoxTip.checked = hasTip;
    if (isVertical === undefined || this.checkBoxIsVertical === null) return;
    this.checkBoxIsVertical.checked = isVertical;
    if (isRange === undefined || this.checkBoxIsRange === null) return;
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
