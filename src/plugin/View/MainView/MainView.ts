import SliderOptions from '../../SliderOptions';
import SliderPath from '../SliderPath/SliderPath';
import Scale from '../Scale/Scale';

class MainView {
  public sliderPath: SliderPath;

  public options: Required<SliderOptions>;

  sliderMainElement: HTMLElement;

  constructor(rootElement: HTMLElement, options: Required<SliderOptions>) {
    this.sliderMainElement = rootElement;
    this.options = options;
    this.sliderPath = new SliderPath(options);
    this.createTemplate();
    this.setScale(options);
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
      if (this.sliderPath.fromValuePointer === null) return;
      this.sliderPath.fromValuePointer.tip.tipElement.textContent = '';
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
      if (isRange === undefined) return;
      this.updateEventListeners(isRange);
    } else {
      this.sliderMainElement.classList.remove('js-bimkon-slider_vertical');
      this.sliderMainElement.classList.add('js-bimkon-slider_horizontal');
      if (isRange) {
        this.sliderPath.toValuePointer?.thumbElement.removeAttribute('style');
      }
      if (isRange === undefined) return;
      this.updateEventListeners(isRange);
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

  private setScale(data: Required<SliderOptions>) {
    const {
      min, max, isVertical, step, numberOfStrokes,
    } = data;

    this.sliderPath.scale = new Scale(numberOfStrokes);
    this.sliderPath.pathElement.append(this.sliderPath.scale.scale);
    this.sliderPath.scale.initNumberOnScale(
      min,
      max,
      isVertical,
      step,
      numberOfStrokes,
    );
    this.sliderPath.updateEventListenersToScale();
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
    this.sliderPath.scale?.initNumberOnScale(
      min,
      max,
      isVertical,
      step,
      numberOfStrokes,
    );
  }
}

export default MainView;
