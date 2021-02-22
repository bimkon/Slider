import { SliderOptions } from '../../SliderOptions';
import { SliderPath } from '../SliderPath/SliderPath';


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

  InitMinMaxValues() {
    this.MinValue.textContent = String(this.options.min)
    this.MaxValue.textContent = String(this.options.max)
  }

}

export { MainView };