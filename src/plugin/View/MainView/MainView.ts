
import { SliderOptions } from '../../SliderOptions';
import { SliderPath } from '../SliderPath/SliderPath';
import bind from 'bind-decorator';


class MainView {
  
  public sliderElement: HTMLElement;
  public rootElement: HTMLElement;
  public sliderPath: SliderPath;
  public options: SliderOptions;
  public MinValue : HTMLElement;
  public MaxValue : HTMLElement;
  scaleValue: HTMLElement;


  constructor(options : SliderOptions) {
    this.createTemplate();

    const {
      isVertical, hasTip, isRange, min, max
    } = options;
    this.update({isVertical, hasTip, isRange, min, max});
  }
  
//поиск класса инициализации, создание блока слайдера, присвоение к родителю. Импорт и присвоение к блоку слайдера модуля класса Sliderpath который создает шкалу.
  private createTemplate() {
    this.rootElement = document.querySelector('.bimkon-slider');
    // this.sliderElement = document.createElement('div');
    // this.sliderElement.classList.add('js-bimkon-slider');
    // this.rootElement.append(this.sliderElement);
    this.sliderPath = new SliderPath();
    this.rootElement.append(this.sliderPath.pathElement);
  }

  private update(data:SliderOptions) {
    const {isVertical, hasTip, isRange} = data;
    if (isRange) {
      this.sliderPath.makeRange();
    }
    else {
      this.sliderPath.makeSingle()
    };
    if (isVertical) {
      this.makeOrientation(isVertical);
    };
    this.sliderPath.bindEventListeners(isVertical, isRange);
    this.sliderPath.bindEventListenersToBar(isVertical, isRange);
    this.setScale(data);
  }

  private makeOrientation(isVertical:boolean) {

    if (isVertical) {
      this.sliderPath.pathElement.classList.add('js-bimkon-slider__path-vertical');
      this.sliderPath.fromValuePointer.thumbElement.classList.add('js-bimkon-slider__thumb-vertical');
      this.sliderPath.scale.scale.classList.add('js-bimkon-slider__scale-vertical');
    }
    else {
      this.sliderPath.pathElement.classList.remove('js-bimkon-slider__path');
    }
  }

  public setPointerPosition(data: {
    fromPointerValue: number;
    fromInPercents: number;
    toPointerValue: number;
    toInPercents: number;
    options: SliderOptions,
  }) {
    const {fromPointerValue,  fromInPercents, toPointerValue, toInPercents, options } = data;
    this.sliderPath.setPointerPosition({
      fromPointerValue,
      fromInPercents,
      toPointerValue, 
      toInPercents,
      options,
    })
    this.updateTipValue(fromPointerValue,toPointerValue, options);

  }

  updateTipValue(
    fromPointerValue: number,
    toPointerValue: number,
    options: SliderOptions,

  ) {
    const {hasTip, isRange} = options;
    if (hasTip) {
    this.sliderPath.fromValuePointer.tip.setTipValue(Math.floor(fromPointerValue));
    if (isRange) this.sliderPath.toValuePointer.tip.setTipValue(Math.floor(toPointerValue));
    
    }
    else {
      this.sliderPath.fromValuePointer.tip.tipElement.classList.remove('js-bimkon-slider__tip');
    }
  }
  
  setScale(data: SliderOptions) {
    const {min, max} =data;

    this.sliderPath.scale.initNumberOnScale(min, max);
    this.sliderPath.bindEventListenersToScale(min, max);

  }


}

export { MainView };