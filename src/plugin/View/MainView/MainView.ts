import SliderOptions from '../../SliderOptions';
import SliderPath from '../SliderPath/SliderPath';
import Scale from '../Scale/Scale';

class MainView {
  public sliderPath: SliderPath = new SliderPath();

  public options: SliderOptions;

  sliderMainElement: HTMLElement;

  constructor(rootElement: HTMLElement, options: Required<SliderOptions>) {
    this.sliderMainElement = rootElement;
    this.options = options;
    this.createTemplate();
    const {
      isVertical,
      hasTip,
      isRange,
      min,
      max,
      numberOfStrokes,
      step,
      from,
      to,
    } = options;

    this.update({
      isVertical,
      hasTip,
      isRange,
      min,
      max,
      numberOfStrokes,
      step,
      from,
      to,
    });
  }

  createTemplate() {
    this.sliderMainElement.classList.add('js-bimkon-slider');
    if (this.sliderPath.pathElement instanceof Node) {
      this.sliderMainElement.append(this.sliderPath.pathElement);
    }
  }

  setOptions(options: SliderOptions) : void {
    this.options = { ...options };
    console.log(this.options);
  }

  update(data: Required<SliderOptions>) {
    const { isVertical, hasTip, isRange } = data;
    if (isRange) {
      this.sliderPath.initRangeSlider();
    } else {
      this.sliderPath.subscribeToThumb();
    }
    this.makeOrientation(isVertical);
    this.sliderPath.updateEventListenersToThumb(isRange);
    if (hasTip) {
      if (this.sliderPath.fromValuePointer === null) return;
      this.sliderPath.fromValuePointer.tip.tipElement.classList.add(
        'js-bimkon-slider__tip',
      );
    } else {
      if (this.sliderPath.fromValuePointer === null) return;
      this.sliderPath.fromValuePointer.tip.tipElement.classList.remove(
        'js-bimkon-slider__tip',
      );
    }
    this.setScale(data);
  }

  makeOrientation(isVertical: boolean) {
    if (isVertical) {
      this.sliderMainElement.classList.remove('js-bimkon-slider_horizontal');
      this.sliderMainElement.classList.add('js-bimkon-slider_vertical');
    } else {
      this.sliderMainElement.classList.remove('js-bimkon-slider_vertical');
      this.sliderMainElement.classList.add('js-bimkon-slider_horizontal');
    }
  }

  updateBooleanOptions(data: SliderOptions) {
    const { isVertical, hasTip, isRange } = data;
    if (isRange && !this.sliderPath.toValuePointer) {
      this.sliderPath.initRangeSlider();
    } else if (this.sliderPath.toValuePointer) {
      if (this.sliderPath.toValuePointer.thumbElement !== null) {
        this.sliderPath.toValuePointer.thumbElement.style.display = 'none';
      }
    }
    if (hasTip) {
      if (this.sliderPath.fromValuePointer === null) return;
      this.sliderPath.fromValuePointer.tip.tipElement.classList.add(
        'js-bimkon-slider__tip',
      );
      if (isRange) {
        if (this.sliderPath.toValuePointer === null) return;
        this.sliderPath.toValuePointer.tip.tipElement.classList.add(
          'js-bimkon-slider__tip',
        );
      }
    } else {
      if (this.sliderPath.fromValuePointer === null) return;
      this.sliderPath.fromValuePointer.tip.tipElement.classList.remove(
        'js-bimkon-slider__tip',
      );
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
        if (this.sliderPath.toValuePointer === null) return;
        if (this.sliderPath.toValuePointer.thumbElement !== null) {
          this.sliderPath.toValuePointer.thumbElement.removeAttribute('style');
        }
      }
      if (isRange === undefined) return;
      this.updateEventListeners(isRange);
    } else {
      this.sliderMainElement.classList.remove('js-bimkon-slider_vertical');
      this.sliderMainElement.classList.add('js-bimkon-slider_horizontal');
      if (isRange) {
        if (this.sliderPath.toValuePointer === null) return;
        if (this.sliderPath.toValuePointer.thumbElement !== null) {
          this.sliderPath.toValuePointer.thumbElement.removeAttribute('style');
        }
      }
      if (isRange === undefined) return;
      this.updateEventListeners(isRange);
    }
  }

  updateEventListeners(isRange: boolean) {
    this.sliderPath.updateEventListenersToThumb(isRange);
    this.sliderPath.updateEventListenersToBar();
    this.sliderPath.rangePathLine.pathLine.removeAttribute('style');
    if (this.sliderPath.fromValuePointer === null) return;
    if (this.sliderPath.fromValuePointer.thumbElement !== null) {
      this.sliderPath.fromValuePointer.thumbElement.removeAttribute('style');
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

  updateTipValue(
    fromPointerValue: number,
    toPointerValue: number,
    options: Required<SliderOptions>,
  ) {
    const { hasTip, isRange } = options;
    if (hasTip) {
      if (this.sliderPath.fromValuePointer === null) return;
      this.sliderPath.fromValuePointer.tip.setTipValue(
        Math.floor(fromPointerValue),
      );
      if (isRange) {
        if (this.sliderPath.toValuePointer === null) return;
        this.sliderPath.toValuePointer.tip.setTipValue(
          Math.floor(toPointerValue),
        );
      }
    } else {
      if (this.sliderPath.fromValuePointer === null) return;
      this.sliderPath.fromValuePointer.tip.tipElement.classList.remove(
        'js-bimkon-slider__tip',
      );
    }
  }

  changeScaleNumbers(data: Required<SliderOptions>) {
    const {
      min, max, isVertical, step, numberOfStrokes,
    } = data;
    if (this.sliderPath.scale === null) return;
    this.sliderPath.scale.initNumberOnScale(
      min,
      max,
      isVertical,
      step,
      numberOfStrokes,
    );
  }

  setScale(data: Required<SliderOptions>) {
    const {
      min, max, isVertical, step, numberOfStrokes,
    } = data;

    this.sliderPath.scale = new Scale(numberOfStrokes);
    if (this.sliderPath.scale.scale instanceof Node) {
      this.sliderPath.pathElement.append(this.sliderPath.scale.scale);
    }
    this.sliderPath.scale.initNumberOnScale(
      min,
      max,
      isVertical,
      step,
      numberOfStrokes,
    );
    this.sliderPath.updateEventListenersToScale();
  }
}

export default MainView;
