import { SliderOptions } from '../../SliderOptions';
import { SliderPath } from '../SliderPath/SliderPath';

class MainView {
  public sliderElement: HTMLElement;

  public rootElement: HTMLElement;

  public sliderPath: SliderPath;

  public options: SliderOptions;

  public MinValue : HTMLElement;

  public MaxValue : HTMLElement;

  scaleValue: HTMLElement;

  sliderMainElement: HTMLElement;

  constructor(rootElement: HTMLElement, options : SliderOptions) {
    this.sliderMainElement = rootElement;
    this.createTemplate();
    const {
      isVertical, hasTip, isRange, min, max, numberOfStrokes,
    } = options;

    this.update({
      isVertical, hasTip, isRange, min, max, numberOfStrokes,
    });
  }

  createTemplate() {
    this.sliderMainElement.classList.add('js-bimkon-slider');
    this.sliderPath = new SliderPath();
    this.sliderMainElement.append(this.sliderPath.pathElement);
  }

  update(data:SliderOptions) {
    const {
      isVertical, hasTip, isRange, numberOfStrokes,
    } = data;
    if (isRange) {
      this.sliderPath.makeRange(numberOfStrokes);
    } else {
      this.sliderPath.makeSingle(numberOfStrokes);
    }
    if (isVertical) {
      this.makeOrientation(isVertical, isRange);
    }
    this.sliderPath.bindEventListeners(isVertical, isRange);
    this.setScale(data);
    if (hasTip) {
      this.sliderPath.fromValuePointer.tip.tipElement.classList.add('js-bimkon-slider__tip');
    } else {
      this.sliderPath.fromValuePointer.tip.tipElement.classList.remove('js-bimkon-slider__tip');
    }
  }

  makeOrientation(isVertical:boolean, isRange:boolean) {
    if (isVertical) {
      this.sliderPath.pathElement.classList.add('js-bimkon-slider__path-vertical');
      this.sliderPath.fromValuePointer.thumbElement.classList.add('js-bimkon-slider__thumb-vertical');
      if (isRange) this.sliderPath.toValuePointer.thumbElement.classList.add('js-bimkon-slider__thumb-vertical');
      this.sliderPath.scale.scale.classList.add('js-bimkon-slider__scale-vertical');
    } else {
      this.sliderPath.pathElement.classList.remove('js-bimkon-slider__path');
    }
  }

  updateBooleanOptions(data:SliderOptions) {
    const {
      isVertical, hasTip, isRange,
    } = data;
    if (hasTip) {
      if (isVertical) {
        this.sliderPath.fromValuePointer.tip.tipElement.classList.add('js-bimkon-slider__tip-vertical');
        if (isRange) {
          this.sliderPath.toValuePointer.tip.tipElement.classList.add('js-bimkon-slider__tip-vertical');
        }
      } else {
        this.sliderPath.fromValuePointer.tip.tipElement.classList.add('js-bimkon-slider__tip');
        if (isRange) {
          this.sliderPath.toValuePointer.tip.tipElement.classList.add('js-bimkon-slider__tip');
        }
      }
    } else {
      this.sliderPath.fromValuePointer.tip.tipElement.classList.remove('js-bimkon-slider__tip');
      this.sliderPath.fromValuePointer.tip.tipElement.textContent = '';
      if (this.sliderPath.toValuePointer) {
        this.sliderPath.toValuePointer.tip.tipElement.classList.remove('js-bimkon-slider__tip');
        this.sliderPath.toValuePointer.tip.tipElement.textContent = '';
      }
    }
    if (isVertical) {
      this.sliderPath.pathElement.classList.add('js-bimkon-slider__path-vertical');
      this.sliderPath.fromValuePointer.thumbElement.classList.add('js-bimkon-slider__thumb-vertical');
      if (isRange) {
        this.sliderPath.toValuePointer.thumbElement.classList.add('js-bimkon-slider__thumb-vertical');
        this.sliderPath.toValuePointer.thumbElement.removeAttribute('style');
      }
      this.sliderPath.scale.scale.classList.add('js-bimkon-slider__scale-vertical');
      this.sliderPath.bindEventListeners(isVertical, isRange);
      this.sliderPath.updateEventListenersToBar();
      this.sliderPath.rangePathLine.pathLine.removeAttribute('style');
      this.sliderPath.fromValuePointer.thumbElement.removeAttribute('style');
    } else {
      this.sliderPath.fromValuePointer.tip.tipElement.classList.remove('js-bimkon-slider__tip-vertical');
      this.sliderPath.fromValuePointer.tip.tipElement.textContent = '';
      if (this.sliderPath.toValuePointer) {
        this.sliderPath.toValuePointer.tip.tipElement.classList.remove('js-bimkon-slider__tip-vertical');
        this.sliderPath.toValuePointer.tip.tipElement.textContent = '';
      }
      this.sliderPath.pathElement.classList.remove('js-bimkon-slider__path-vertical');
      this.sliderPath.fromValuePointer.thumbElement.classList.remove('js-bimkon-slider__thumb-vertical');
      if (isRange) {
        this.sliderPath.toValuePointer.thumbElement.classList.remove('js-bimkon-slider__thumb-vertical');
        this.sliderPath.toValuePointer.thumbElement.removeAttribute('style');
      }
      this.sliderPath.scale.scale.classList.remove('js-bimkon-slider__scale-vertical');
      this.sliderPath.bindEventListeners(isVertical, isRange);
      this.sliderPath.updateEventListenersToBar();
      this.sliderPath.rangePathLine.pathLine.removeAttribute('style');
      this.sliderPath.fromValuePointer.thumbElement.removeAttribute('style');
    }
    if (isRange) {
      this.sliderPath.toValuePointer.thumbElement.style.display = 'block';
    } else if (this.sliderPath.toValuePointer) this.sliderPath.toValuePointer.thumbElement.style.display = 'none';
  }

  setPointerPosition(data: {
    fromPointerValue: number;
    fromInPercents: number;
    toPointerValue: number;
    toInPercents: number;
    options: SliderOptions,
  }) {
    const {
      fromPointerValue, fromInPercents, toPointerValue, toInPercents, options,
    } = data;
    this.sliderPath.setPointerPosition({
      fromInPercents,
      toInPercents,
      options,
    });
    const { hasTip } = options;
    if (hasTip) { this.updateTipValue(fromPointerValue, toPointerValue, options); }
    this.setScale(options);
  }

  updateTipValue(
    fromPointerValue: number,
    toPointerValue: number,
    options: SliderOptions,

  ) {
    const { hasTip, isRange } = options;
    if (hasTip) {
      this.sliderPath.fromValuePointer.tip.setTipValue(Math.floor(fromPointerValue));
      if (isRange) this.sliderPath.toValuePointer.tip.setTipValue(Math.floor(toPointerValue));
    } else {
      this.sliderPath.fromValuePointer.tip.tipElement.classList.remove('js-bimkon-slider__tip');
    }
  }

  setScale(data: SliderOptions) {
    const {
      min, max, isVertical, isRange,
    } = data;

    this.sliderPath.scale.initNumberOnScale(min, max, isVertical);
    this.sliderPath.updateEventListenersToScale();
  }
}

export { MainView };
export default { MainView };
