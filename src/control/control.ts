import '../plugin/jsBimkonSlider';
import bind from 'bind-decorator';
import SliderOptions from '../plugin/SliderOptions';

class Control {
  selectedInputFrom: HTMLInputElement | null = null;

  selectedInputTo: HTMLInputElement | null = null;

  selectedInputMin: HTMLInputElement | null = null;

  selectedInputMax: HTMLInputElement | null = null;

  selectedInputStep: HTMLInputElement | null = null;

  checkBoxTip: HTMLInputElement | null = null;

  checkBoxIsVertical: HTMLInputElement | null = null;

  checkBoxIsRange: HTMLInputElement | null = null;

  value: HTMLInputElement | null | EventTarget = null;

  slider: JQuery<HTMLElement> | null;

  sliderRootContainer: Element | null = document.querySelector('.js-bimkon-slider');

  controlPanel: Element | null = document.querySelector('.control');

  constructor(sliderRootContainer: Element) {
    if (sliderRootContainer instanceof Element) {
      this.sliderRootContainer = sliderRootContainer;
    }
    this.slider = $(sliderRootContainer).find('.js-bimkon-slider');
    this.addEventListenersToInputs();
    this.callBackOnChange();
    this.initSlider();
  }

  @bind
  handleSliderInputFromChange(event: Event) {
    this.value = event.target;
    if (this.value === null) return;
    if (this.value instanceof HTMLInputElement && this.slider !== null) {
      this.slider.bimkonSlider('update', { from: Number(this.value.value) });
    }
  }

  @bind
  handleSliderInputToChange(event: Event) {
    this.value = event.target;
    if (this.value === null) return;
    if (this.value instanceof HTMLInputElement && this.slider !== null) {
      this.slider.bimkonSlider('update', { to: Number(this.value.value) });
    }
  }

  @bind
  handleSliderInputMinChange(event: Event) {
    this.value = event.target;
    if (this.value === null) return;
    if (this.value instanceof HTMLInputElement && this.slider !== null) {
      this.slider.bimkonSlider('update', { min: Number(this.value.value) });
    }
  }

  @bind
  handleSliderInputMaxChange(event: Event) {
    this.value = event.target;
    if (this.value instanceof HTMLInputElement && this.slider !== null) {
      this.slider.bimkonSlider('update', { max: Number(this.value.value) });
    }
  }

  @bind
  handleSliderInputStepChange(event: Event) {
    this.value = event.target;
    if (this.value === null) return;
    if (this.value instanceof HTMLInputElement && this.slider !== null) {
      this.slider.bimkonSlider('update', { step: Number(this.value.value) });
    }
  }

  @bind
  handleSliderInputTipChange() {
    if (this.checkBoxTip === null) return;
    if (this.checkBoxTip instanceof HTMLInputElement && this.slider !== null) {
      if (this.checkBoxTip.checked) {
        this.slider.bimkonSlider('update', { hasTip: true });
      } else {
        this.slider.bimkonSlider('update', { hasTip: false });
      }
    }
  }

  @bind
  handleSliderInputVerticalChange() {
    if (this.checkBoxIsVertical === null) return;
    if (this.checkBoxIsVertical instanceof HTMLInputElement && this.slider !== null) {
      if (this.checkBoxIsVertical.checked) {
        this.slider.bimkonSlider('update', { isVertical: true });
      } else {
        this.slider.bimkonSlider('update', { isVertical: false });
      }
    }
  }

  @bind
  handleSliderInputRangeChange() {
    if (this.checkBoxIsRange === null) return;
    if (this.checkBoxIsRange instanceof HTMLInputElement && this.slider !== null) {
      if (this.checkBoxIsRange.checked) {
        this.slider.bimkonSlider('update', { isRange: true });
      } else {
        this.slider.bimkonSlider('update', { isRange: false });
      }
    }
  }

  addEventListenersToInputs() {
    if (this.sliderRootContainer !== null) {
      this.controlPanel = this.sliderRootContainer.querySelector('.control');
    }

    if (this.controlPanel === null) return;
    const inputFrom = this.controlPanel.querySelector(
      '.control__input-from',
    );
    if (inputFrom instanceof HTMLInputElement) {
      this.selectedInputFrom = inputFrom;
      this.selectedInputFrom.addEventListener(
        'input',
        this.handleSliderInputFromChange,
      );
    }

    const inputTo = this.controlPanel.querySelector(
      '.control__input-to',
    );

    if (inputTo instanceof HTMLInputElement) {
      this.selectedInputTo = inputTo;
      this.selectedInputTo.addEventListener(
        'input',
        this.handleSliderInputToChange,
      );
    }

    const inputMin = this.controlPanel.querySelector(
      '.control__input-min',
    );
    if (inputMin instanceof HTMLInputElement) {
      this.selectedInputMin = inputMin;
      this.selectedInputMin.addEventListener(
        'input',
        this.handleSliderInputMinChange,
      );
    }

    const inputMax = this.controlPanel.querySelector(
      '.control__input-max',
    );
    if (inputMax instanceof HTMLInputElement) {
      this.selectedInputMax = inputMax;
      this.selectedInputMax.addEventListener(
        'input',
        this.handleSliderInputMaxChange,
      );
    }

    const inputStep = this.controlPanel.querySelector(
      '.control__input-step',
    );
    if (inputStep instanceof HTMLInputElement) {
      this.selectedInputStep = inputStep;
      this.selectedInputStep.addEventListener(
        'input',
        this.handleSliderInputStepChange,
      );
    }

    const checkBoxTip = this.controlPanel.querySelector(
      '.control__input-tip',
    );
    if (checkBoxTip instanceof HTMLInputElement) {
      this.checkBoxTip = checkBoxTip;
      this.checkBoxTip.addEventListener(
        'change',
        this.handleSliderInputTipChange,
      );
    }

    const checkBoxIsVertical = this.controlPanel.querySelector(
      '.control__input-is-vertical',
    );
    if (checkBoxIsVertical instanceof HTMLInputElement) {
      this.checkBoxIsVertical = checkBoxIsVertical;
      this.checkBoxIsVertical.addEventListener(
        'change',
        this.handleSliderInputVerticalChange,
      );
    }

    const checkBoxIsRange = this.controlPanel.querySelector(
      '.control__input-is-range',
    );
    if (checkBoxIsRange instanceof HTMLInputElement) {
      this.checkBoxIsRange = checkBoxIsRange;
      this.checkBoxIsRange.addEventListener(
        'change',
        this.handleSliderInputRangeChange,
      );
    }
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

    if (this.checkBoxTip === null || hasTip === undefined) return;
    if (this.checkBoxTip instanceof HTMLInputElement) {
      this.checkBoxTip.checked = hasTip;
    }
    if (this.checkBoxIsVertical instanceof HTMLInputElement) {
      if (this.checkBoxIsVertical === null || isVertical === undefined) return;
      this.checkBoxIsVertical.checked = isVertical;
    }

    if (this.checkBoxIsRange === null || isRange === undefined) return;
    if (this.checkBoxIsRange instanceof HTMLInputElement) {
      this.checkBoxIsRange.checked = isRange;
    }
  }

  callBackOnChange() {
    if (this.slider === null) return;
    this.slider.bimkonSlider('callbackOnUpdate', this.handleInputsUpdateChange);
  }

  initSlider() {
    if (this.slider === null) return;
    this.slider.bimkonSlider('update', {});
  }
}
export default Control;
