import SliderOptions from '../../SliderOptions';
import SliderPath from '../SliderPath/SliderPath';
import Scale from '../Scale/Scale';

class MainView {
  public rootElement: HTMLElement;

  public sliderPath: SliderPath;

  public options: SliderOptions;

  sliderMainElement: HTMLElement;

  constructor(rootElement: HTMLElement, options: SliderOptions) {
    this.sliderMainElement = rootElement;
    this.createTemplate();
    const {
      isVertical, hasTip, isRange, min, max, numberOfStrokes, step,
    } = options;

    this.update({
      isVertical,
      hasTip,
      isRange,
      min,
      max,
      numberOfStrokes,
      step,
    });
  }

  createTemplate() {
    this.sliderMainElement.classList.add('js-bimkon-slider');
    this.sliderPath = new SliderPath();
    this.sliderMainElement.append(this.sliderPath.pathElement);
  }

  update(data: SliderOptions) {
    const {
      isVertical, hasTip, isRange,
    } = data;
    if (isRange) {
      this.sliderPath.initRangeSlider();
    } else {
      this.sliderPath.subscribeToThumb();
    }
    this.makeOrientation(isVertical);
    this.sliderPath.updateEventListenersToThumb(isRange);
    if (hasTip) {
      this.sliderPath.fromValuePointer.tip.tipElement.classList.add(
        'js-bimkon-slider__tip',
      );
    } else {
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
    const {
      isVertical, hasTip, isRange,
    } = data;
    if (isRange && !this.sliderPath.toValuePointer) {
      this.sliderPath.initRangeSlider();
      this.sliderPath.toValuePointer.thumbElement.style.display = 'block';
    } else if (this.sliderPath.toValuePointer) {
      this.sliderPath.toValuePointer.thumbElement.style.display = 'none';
    }
    if (hasTip) {
      this.sliderPath.fromValuePointer.tip.tipElement.classList.add(
        'js-bimkon-slider__tip',
      );
      if (isRange) {
        this.sliderPath.toValuePointer.tip.tipElement.classList.add(
          'js-bimkon-slider__tip',
        );
      }
    } else {
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
        this.sliderPath.toValuePointer.thumbElement.removeAttribute('style');
      }
      this.updateEventListeners(isRange);
    } else {
      this.sliderMainElement.classList.remove('js-bimkon-slider_vertical');
      this.sliderMainElement.classList.add('js-bimkon-slider_horizontal');
      if (isRange) {
        this.sliderPath.toValuePointer.thumbElement.removeAttribute('style');
      }
      this.updateEventListeners(isRange);
    }
  }

  updateEventListeners(isRange:boolean) {
    this.sliderPath.updateEventListenersToThumb(isRange);
    this.sliderPath.updateEventListenersToBar();
    this.sliderPath.rangePathLine.pathLine.removeAttribute('style');
    this.sliderPath.fromValuePointer.thumbElement.removeAttribute('style');
  }

  setPointerPosition(data: {
    fromPointerValue: number;
    fromInPercents: number;
    toPointerValue: number;
    toInPercents: number;
    options: SliderOptions;
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
    options: SliderOptions,
  ) {
    const { hasTip, isRange } = options;
    if (hasTip) {
      this.sliderPath.fromValuePointer.tip.setTipValue(
        Math.floor(fromPointerValue),
      );
      if (isRange) {
        this.sliderPath.toValuePointer.tip.setTipValue(
          Math.floor(toPointerValue),
        );
      }
    } else {
      this.sliderPath.fromValuePointer.tip.tipElement.classList.remove(
        'js-bimkon-slider__tip',
      );
    }
  }

  changeScaleNumbers(data: SliderOptions) {
    const {
      min, max, isVertical, step, numberOfStrokes,
    } = data;
    this.sliderPath.scale.initNumberOnScale(min, max, isVertical, step, numberOfStrokes);
  }

  setScale(data: SliderOptions) {
    const {
      min, max, isVertical, step, numberOfStrokes,
    } = data;
    this.sliderPath.scale = new Scale(numberOfStrokes);
    this.sliderPath.pathElement.append(this.sliderPath.scale.scale);
    this.sliderPath.scale.initNumberOnScale(min, max, isVertical, step, numberOfStrokes);
    this.sliderPath.updateEventListenersToScale();
  }
}

export default MainView;
