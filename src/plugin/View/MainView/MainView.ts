import { SliderOptions } from '../../SliderOptions';
import { SliderPath } from '../SliderPath/SliderPath';


class MainView {
  
  public sliderElement: HTMLElement;
  public rootElement: HTMLElement;
  public sliderPath: SliderPath;
  public options: SliderOptions;
  // $el: HTMLElement;

  constructor() {
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
    
  }

  // setOptions(options: SliderOptions) {
  //   this.options = options
  //   console.log('Options were set')
  // }

  // initProps() {
  //   this.$el = document.querySelector('.bimkon-slider')
  //   console.log('Properties init completed')
  // }

  // render(template:any) {
  //   this.$el.innerHTML = template
  //   console.log('Template uploaded');
  // }

  // initComponents() {
  //   // this.SVPoint = new SVPoint(this)
  //   // this.SVRange = new SVRange(this)
  //   // this.SVLine = new SVLine(this)

  //   // this.SVPoint.start()
  //   // this.SVRange.start()
  //   // this.SVLine.start()

  //   console.log('Components init completed')
  // }
}
// =========== EXPORT ===========
export { MainView };