import { SliderOptions } from '../../SliderOptions';
import { SliderPath } from '../SliderPath/SliderPath';

class MainView {
  public rootElement: HTMLElement;

  public sliderPath: SliderPath;

  public options: SliderOptions;

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
    this.makeOrientation(isVertical);
    this.sliderPath.bindEventListeners(isVertical, isRange);
    this.setScale(data);
    if (hasTip) {
      this.sliderPath.fromValuePointer.tip.tipElement.classList.add('bimkon-slider__tip');
    } else {
      this.sliderPath.fromValuePointer.tip.tipElement.classList.remove('bimkon-slider__tip');
    }
  }

  makeOrientation(isVertical:boolean) {
    if (isVertical) {
      this.sliderMainElement.classList.add('bimkon-slider_vertical');
    } else {
      this.sliderMainElement.classList.add('bimkon-slider_horizontal');
    }
  }

  updateBooleanOptions(data:SliderOptions) {
    const {
      isVertical, hasTip, isRange,
    } = data;
    if (hasTip) {
      this.sliderPath.fromValuePointer.tip.tipElement.classList.add('bimkon-slider__tip');
      if (isRange) {
        this.sliderPath.toValuePointer.tip.tipElement.classList.add('bimkon-slider__tip');
      }
    } else {
      this.sliderPath.fromValuePointer.tip.tipElement.classList.remove('bimkon-slider__tip');
      this.sliderPath.fromValuePointer.tip.tipElement.textContent = '';
      if (this.sliderPath.toValuePointer) {
        this.sliderPath.toValuePointer.tip.tipElement.classList.remove('bimkon-slider__tip');
        this.sliderPath.toValuePointer.tip.tipElement.textContent = '';
      }
    }
    if (isVertical) {
      this.sliderMainElement.classList.remove('bimkon-slider_horizontal');
      this.sliderMainElement.classList.add('bimkon-slider_vertical');
      if (isRange) {
        this.sliderPath.toValuePointer.thumbElement.removeAttribute('style');
      }
      this.sliderPath.bindEventListeners(isVertical, isRange);
      this.sliderPath.updateEventListenersToBar();
      this.sliderPath.rangePathLine.pathLine.removeAttribute('style');
      this.sliderPath.fromValuePointer.thumbElement.removeAttribute('style');
    } else {
      this.sliderMainElement.classList.add('bimkon-slider_vertical');
      this.sliderMainElement.classList.add('bimkon-slider_horizontal');
      if (isRange) {
        this.sliderPath.toValuePointer.thumbElement.removeAttribute('style');
      }
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
      this.sliderPath.fromValuePointer.tip.tipElement.classList.remove('bimkon-slider__tip');
    }
  }

  setScale(data: SliderOptions) {
    const {
      min, max, isVertical,
    } = data;

    this.sliderPath.scale.initNumberOnScale(min, max, isVertical);
    this.sliderPath.updateEventListenersToScale();
  }
}

export { MainView };
export default { MainView };
