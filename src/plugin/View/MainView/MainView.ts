
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


  constructor(options : SliderOptions) {
    this.options = options;
    this.createTemplate();
    
  }
  
//поиск класса инициализации, создание блока слайдера, присвоение к родителю. Импорт и присвоение к блоку слайдера модуля класса Sliderpath который создает шкалу.
  private createTemplate() {
    this.rootElement = document.querySelector('.bimkon-slider');
    this.sliderElement = document.createElement('div');
    this.sliderElement.classList.add('js-bimkon-slider');
    this.rootElement.append(this.sliderElement);
    this.sliderPath = new SliderPath();
    this.sliderElement.append(this.sliderPath.pathElement);
    this.MinValue = document.createElement('div');
    this.rootElement.append(this.MinValue);
    this.MinValue.classList.add('js-bimkon-slider__min');
    this.MaxValue = document.createElement('div');
    this.MaxValue.classList.add('js-bimkon-slider__max');
    this.rootElement.append(this.MaxValue);
  }

  @bind
  public setPointerPosition(data: {
    min: number, 
    max: number,
    fromPointerValue: number,
    fromPointerInPercents: number,
  }) {
    const { min, max, fromPointerValue, fromPointerInPercents } = data;

    this.InitMinMaxValues({min:min, max: max,});
    this.updateTipvalue({tipValue: fromPointerValue});
  }

  @bind
  InitMinMaxValues(data: {
    min: number,
    max: number,
  }) {
    const {min, max} = data;
    this.MinValue.textContent = String(min)
    this.MaxValue.textContent = String(max)
  }

  @bind
  updateTipvalue(data: {
    tipValue: number,
  }) {
    const {tipValue} = data;
    this.sliderPath.thumb.tip.setTipValue(Math.floor(tipValue));

  }
}

export { MainView };