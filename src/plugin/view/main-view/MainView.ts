import { SliderOptions } from '../../types';
import SliderPath from '../slider-path/SliderPath';

class MainView {
  sliderPath: SliderPath;

  options: Required<SliderOptions>;

  sliderMainElement: HTMLElement;

  constructor(rootElement: HTMLElement, options: Required<SliderOptions>) {
    this.sliderMainElement = rootElement;
    this.options = options;
    this.sliderPath = new SliderPath(options);
    this.createTemplate();
  }

  updateBooleanOptions(data: SliderOptions) {
    const { isVertical, hasTip, isRange } = data;
    if (isRange && !this.sliderPath.toValuePointer) {
      this.sliderPath.initRangeSlider(this.options);
    } else if (this.sliderPath.toValuePointer) {
      if (this.sliderPath.toValuePointer.thumbElement !== null) {
        this.sliderPath.toValuePointer.thumbElement.style.display = 'none';
      }
    }
    if (hasTip) {
      this.sliderPath.fromValuePointer?.tip.tipElement.classList.add(
        'js-bimkon-slider__tip',
      );
      if (isRange) {
        this.sliderPath.toValuePointer?.tip.tipElement.classList.add(
          'js-bimkon-slider__tip',
        );
      }
    } else {
      this.sliderPath.fromValuePointer?.tip.tipElement.classList.remove(
        'js-bimkon-slider__tip',
      );
      if (this.sliderPath.fromValuePointer !== null) {
        this.sliderPath.fromValuePointer.tip.tipElement.textContent = '';
      }
      if (this.sliderPath.toValuePointer) {
        this.sliderPath.toValuePointer.tip.tipElement.classList.remove(
          'js-bimkon-slider__tip',
        );
        this.sliderPath.toValuePointer.tip.tipElement.textContent = '';
      }
    }
    if (isVertical) {
      this.sliderMainElement.classList.remove('js-bimkon-slider_horizontal');
      this.sliderMainElement.classList.add('js-bimkon-slider_vertical');
      if (isRange) {
        this.sliderPath.toValuePointer?.thumbElement.removeAttribute('style');
      }
      if (isRange !== undefined) {
        this.updateEventListeners(isRange);
      }
    } else {
      this.sliderMainElement.classList.remove('js-bimkon-slider_vertical');
      this.sliderMainElement.classList.add('js-bimkon-slider_horizontal');
      if (isRange) {
        this.sliderPath.toValuePointer?.thumbElement.removeAttribute('style');
      }
      if (isRange !== undefined) {
        this.updateEventListeners(isRange);
      }
    }
  }

  setPointerPosition(data: {
    fromPointerValue: number;
    fromInPercents: number;
    toPointerValue: number;
    toInPercents: number;
    options: Required<SliderOptions>;
  }) {
    const {
      fromPointerValue,
      fromInPercents,
      toPointerValue,
      toInPercents,
      options,
    } = data;
    this.sliderPath.setPointerPosition({
      fromInPercents,
      toInPercents,
      options,
    });
    const { hasTip } = options;
    if (hasTip) {
      this.updateTipValue(fromPointerValue, toPointerValue, options);
    }
    this.changeScaleNumbers(options);
  }

  private createTemplate() {
    this.sliderMainElement.classList.add('js-bimkon-slider');
    this.sliderMainElement.append(this.sliderPath.pathElement);
  }

  private updateEventListeners(isRange: boolean) {
    this.sliderPath.updateEventListenersToThumb(isRange);
    this.sliderPath.updateEventListenersToBar();
    this.sliderPath.rangePathLine.pathLine.removeAttribute('style');
    this.sliderPath.fromValuePointer?.thumbElement.removeAttribute('style');
  }

  private updateTipValue(
    fromPointerValue: number,
    toPointerValue: number,
    options: Required<SliderOptions>,
  ) {
    const { hasTip, isRange } = options;
    if (hasTip) {
      this.sliderPath.fromValuePointer?.tip.setTipValue(
        Math.floor(fromPointerValue),
      );
      if (isRange) {
        this.sliderPath.toValuePointer?.tip.setTipValue(
          Math.floor(toPointerValue),
        );
      }
    } else {
      this.sliderPath.fromValuePointer?.tip.tipElement.classList.remove(
        'js-bimkon-slider__tip',
      );
    }
  }

  private changeScaleNumbers(data: Required<SliderOptions>) {
    const {
      min, max, isVertical, step, numberOfStrokes,
    } = data;
    this.sliderPath.scale?.updateNumberOnScale(
      min,
      max,
      isVertical,
      step,
      numberOfStrokes,
    );
  }
}

export default MainView;
