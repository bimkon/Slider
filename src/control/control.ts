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
    const controlPanel = this.sliderRootContainer.querySelector('.control');
    if (controlPanel instanceof HTMLElement) {
      this.controlPanel = controlPanel;
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
    if (from === undefined) return;
    if (this.selectedInputFrom instanceof HTMLInputElement) {
      this.selectedInputFrom.valueAsNumber = from;
    }

    if (to === undefined) return;
    if (this.selectedInputTo instanceof HTMLInputElement) {
      this.selectedInputTo.valueAsNumber = to;
    }

    if (min === undefined) return;
    if (this.selectedInputMin instanceof HTMLInputElement) {
      this.selectedInputMin.valueAsNumber = min;
    }
    if (max === undefined) return;
    if (this.selectedInputMax instanceof HTMLInputElement) {
      this.selectedInputMax.valueAsNumber = max;
    }
    if (step === undefined) return;
    if (this.selectedInputStep instanceof HTMLInputElement) {
      this.selectedInputStep.valueAsNumber = step;
    }

    if (hasTip === undefined) return;
    if (this.checkBoxTip instanceof HTMLInputElement) {
      this.checkBoxTip.checked = hasTip;
    }
    if (this.checkBoxIsVertical instanceof HTMLInputElement) {
      if (isVertical === undefined) return;
      this.checkBoxIsVertical.checked = isVertical;
    }

    if (isRange === undefined) return;
    if (this.checkBoxIsRange instanceof HTMLInputElement) {
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
