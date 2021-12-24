import '../plugin/jsBimkonSlider';
import bind from 'bind-decorator';
import { SliderOptions } from '../plugin/types';

class Control {
  selectedInputFrom: HTMLInputElement | null = null;

  selectedInputTo: HTMLInputElement | null = null;

  selectedInputMin: HTMLInputElement | null = null;

  selectedInputMax: HTMLInputElement | null = null;

  selectedInputStep: HTMLInputElement | null = null;

  checkBoxTip: HTMLInputElement | null = null;

  checkBoxIsVertical: HTMLInputElement | null = null;

  checkBoxIsRange: HTMLInputElement | null = null;

  value: null | HTMLInputElement = null;

  slider: JQuery<HTMLElement>;

  sliderRootContainer: HTMLElement;

  controlPanel: HTMLElement | null = null;

  constructor(sliderRootContainer: HTMLElement) {
    this.sliderRootContainer = sliderRootContainer;
    this.slider = $(sliderRootContainer).find('.js-bimkon-slider');
    this.addEventListenersToInputs();
    this.callBackOnChange();
    this.initSlider();
  }

  @bind
  handleSliderInputFromChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.value = event.target;
      this.slider.bimkonSlider('update', { from: Number(this.value.value) });
    }
  }

  @bind
  handleSliderInputToChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.value = event.target;
      this.slider.bimkonSlider('update', { to: Number(this.value.value) });
    }
  }

  @bind
  handleSliderInputMinChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.value = event.target;
      this.slider.bimkonSlider('update', { min: Number(this.value.value) });
    }
  }

  @bind
  handleSliderInputMaxChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.value = event.target;
      this.slider.bimkonSlider('update', { max: Number(this.value.value) });
    }
  }

  @bind
  handleSliderInputStepChange(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      this.value = event.target;
      this.slider.bimkonSlider('update', { step: Number(this.value.value) });
    }
  }

  @bind
  handleSliderInputTipChange() {
    if (this.checkBoxTip instanceof HTMLInputElement) {
      if (this.checkBoxTip.checked) {
        this.slider.bimkonSlider('update', { hasTip: true });
      } else {
        this.slider.bimkonSlider('update', { hasTip: false });
      }
    }
  }

  @bind
  handleSliderInputVerticalChange() {
    if (this.checkBoxIsVertical instanceof HTMLInputElement) {
      if (this.checkBoxIsVertical.checked) {
        this.slider.bimkonSlider('update', { isVertical: true });
      } else {
        this.slider.bimkonSlider('update', { isVertical: false });
      }
    }
  }

  @bind
  handleSliderInputRangeChange() {
    if (this.checkBoxIsRange instanceof HTMLInputElement) {
      if (this.checkBoxIsRange.checked) {
        this.slider.bimkonSlider('update', { isRange: true });
      } else {
        this.slider.bimkonSlider('update', { isRange: false });
      }
    }
  }

  addEventListenersToInputs() {
    this.controlPanel = this.sliderRootContainer.querySelector<HTMLElement>('.control');

    if (this.controlPanel === null) return;

    this.selectedInputFrom = this.controlPanel.querySelector<HTMLInputElement>(
      '.control__input-from',
    );

    this.selectedInputFrom?.addEventListener(
      'input',
      this.handleSliderInputFromChange,
    );

    this.selectedInputTo = this.controlPanel.querySelector<HTMLInputElement>('.control__input-to');

    this.selectedInputTo?.addEventListener(
      'input',
      this.handleSliderInputToChange,
    );

    this.selectedInputMin = this.controlPanel.querySelector<HTMLInputElement>(
      '.control__input-min',
    );

    this.selectedInputMin?.addEventListener(
      'input',
      this.handleSliderInputMinChange,
    );

    this.selectedInputMax = this.controlPanel.querySelector<HTMLInputElement>(
      '.control__input-max',
    );

    this.selectedInputMax?.addEventListener(
      'input',
      this.handleSliderInputMaxChange,
    );

    this.selectedInputStep = this.controlPanel.querySelector<HTMLInputElement>(
      '.control__input-step',
    );

    this.selectedInputStep?.addEventListener(
      'input',
      this.handleSliderInputStepChange,
    );

    this.checkBoxTip = this.controlPanel.querySelector<HTMLInputElement>(
      '.control__input-tip',
    );

    this.checkBoxTip?.addEventListener(
      'change',
      this.handleSliderInputTipChange,
    );

    this.checkBoxIsVertical = this.controlPanel.querySelector<HTMLInputElement>(
      '.control__input-is-vertical',
    );

    this.checkBoxIsVertical?.addEventListener(
      'change',
      this.handleSliderInputVerticalChange,
    );

    this.checkBoxIsRange = this.controlPanel.querySelector<HTMLInputElement>(
      '.control__input-is-range',
    );

    this.checkBoxIsRange?.addEventListener(
      'change',
      this.handleSliderInputRangeChange,
    );
  }

  @bind
  handleInputsUpdateChange(options: SliderOptions) {
    const {
      from, to, min, max, step, isRange, isVertical, hasTip,
    } = options;

    if (
      from !== undefined
      && this.selectedInputFrom instanceof HTMLInputElement
    ) {
      this.selectedInputFrom.valueAsNumber = from;
    }

    if (to !== undefined && this.selectedInputTo instanceof HTMLInputElement) {
      this.selectedInputTo.valueAsNumber = to;
    }

    if (
      min !== undefined
      && this.selectedInputMin instanceof HTMLInputElement
    ) {
      this.selectedInputMin.valueAsNumber = min;
    }

    if (
      max !== undefined
      && this.selectedInputMax instanceof HTMLInputElement
    ) {
      this.selectedInputMax.valueAsNumber = max;
    }

    if (
      step !== undefined
      && this.selectedInputStep instanceof HTMLInputElement
    ) {
      this.selectedInputStep.valueAsNumber = step;
    }

    if (hasTip !== undefined && this.checkBoxTip instanceof HTMLInputElement) {
      this.checkBoxTip.checked = hasTip;
    }
    if (
      isVertical !== undefined
      && this.checkBoxIsVertical instanceof HTMLInputElement
    ) {
      this.checkBoxIsVertical.checked = isVertical;
    }

    if (
      isRange !== undefined
      && this.checkBoxIsRange instanceof HTMLInputElement
    ) {
      this.checkBoxIsRange.checked = isRange;
    }
  }

  callBackOnChange() {
    this.slider.bimkonSlider('callbackOnUpdate', this.handleInputsUpdateChange);
  }

  initSlider() {
    this.slider.bimkonSlider('update', {});
  }
}
export default Control;
