
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
    this.options = options;
    this.createTemplate();
    const {min, max} = options;
    this.setScale({min, max});
    const {
      isVertical, hasTip, isRange,
    } = options;
    this.sliderPath.initMouseMoves();
  }
  
//поиск класса инициализации, создание блока слайдера, присвоение к родителю. Импорт и присвоение к блоку слайдера модуля класса Sliderpath который создает шкалу.
  private createTemplate() {
    this.rootElement = document.querySelector('.bimkon-slider');
    this.sliderElement = document.createElement('div');
    this.sliderElement.classList.add('js-bimkon-slider');
    this.rootElement.append(this.sliderElement);
    this.sliderPath = new SliderPath();
    this.sliderElement.append(this.sliderPath.pathElement);
    // this.MinValue = document.createElement('div');
    // this.rootElement.append(this.MinValue);
    // this.MinValue.classList.add('js-bimkon-slider__min');
    // this.MaxValue = document.createElement('div');
    // this.MaxValue.classList.add('js-bimkon-slider__max');
    // this.rootElement.append(this.MaxValue);
  }


  public setPointerPosition(data: {
    min: number, 
    max: number,
    fromPointerValue: number,
    fromPointerInPercents: number,
    options: SliderOptions,
  }) {
    const { min, max, fromPointerValue, fromPointerInPercents, options } = data;

    // this.updateMinMaxValues({min:min, max: max,});
    this.updateTipValue(fromPointerValue, options);
    this.sliderPath.updatePointerPosition(fromPointerInPercents, options);
 
    

  }


 


  updateTipValue(
    fromPointerValue: number,
    options: SliderOptions,

  ) {
    const {hasTip} = options;
    if (hasTip) {
    this.sliderPath.thumb.tip.setTipValue(Math.floor(fromPointerValue));
    }
    else {
      this.sliderPath.thumb.tip.tipElement.classList.remove('js-bimkon-slider__tip');
    }
  }
  
  setScale(data: {
    min: number,
    max: number,
  }) {
    const {min, max} = data;

    this.sliderPath.scale.initNumberOnScale(min, max);

  }


}

export { MainView };