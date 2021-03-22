import { SliderOptions } from '../SliderOptions';
import { EventObserver } from '../EventObserver/EventObserver';


class Model {
  public options: SliderOptions;
  public observerOfValues: EventObserver = new EventObserver();

    
 
  constructor(options: SliderOptions) {
    this.options = options;
    this.setSettings(options)
    console.log(options)


  }

  getSettings() {
    return { ...this.options };
  }
  setSettings(options: SliderOptions = {}) {
    Object.entries(options).forEach(([key, value]) => {
      this.options[key] = options[key];

      switch (key) {
        case 'isRange':
          break
        case 'min':
          break
        case 'max':
          break
        case 'step':
          break
        case 'isVertical':
          break
        case 'from':
          if(this.options.from>=this.options.to - this.options.step) this.options.from = this.options.to - this.options.step;
        case 'to':
          if(this.options.to<=this.options.from + this.options.step) this.options.to = this.options.from + this.options.step;
        case 'hasTip':
        default: return null;

      }

    });
    this.calculateValues();

  }

  // private validateSliderOptions(
  //   key:string,
  //   value: SliderOptions[keyof SliderOptions],
  //   newSettings: SliderOptions = {}
  // ) {

  //   switch (key) {
  //     case 'hasTip':
  //       return true
  //     case 'isVertical':
  //       return false
  //     case 'isRange':
  //       return true
  //     case 'min':
  //       return 0
  //     case 'max':
  //       return 99
  //     case 'step':
  //       return 1
  //     case 'from':
  //       return this.options.from
  //     case 'to':
  //       return this.options.to
  //     default: return null;
  //   }
  // }



  
  // max-min  100+min
  // x -   positioninPercents
  calculatePercentsToValue(positionInPercents: number): number {
    const { min, max } = this.getSettings();
    return ((max - min) * positionInPercents) / 100 + min;
  }
  calculateValueWithStep(value: number) {
    const { min, step } = this.getSettings();
    return Math.round((value - min) / step) * step + min;
  }
  calculateValueToPercents(positionValue: number): number {
    const { min, max } = this.getSettings();
    return ((positionValue - min) * 100) / (max - min);
  }
  applyValue(positionInPercents: number, pointerToMove: string) {
    const newValue: number = this.calculatePercentsToValue(positionInPercents);
    switch (pointerToMove) {
      case 'fromValue':
        this.setSettings({ from: newValue });

        break;
      case 'toValue':
        this.setSettings({ to: newValue });

        break;
      default:
    }

    this.calculateValues();
  }
//берем текущее положение ползунка в процентах, переводим в число, применяем шаг, передаем обратно в презентер и выводим в tipvalue .
//переводим value с шагом обратно в проценты и отдаем в презентер и вью.
  calculateValues() {
    const {from, to} = this.getSettings();
    const fromValue = this.calculatePercentsToValue(from);
    const fromValueWithStep = this.calculateValueWithStep(fromValue);
    const newFromPointerPositionInPercentsWithStep = this.calculateValueToPercents(fromValueWithStep);
    const toValue = this.calculatePercentsToValue(to);
    const toValueWithStep = this.calculateValueWithStep(toValue);
    const newToPointerPositionInPercentsWithStep = this.calculateValueToPercents(toValueWithStep);

    this.observerOfValues.broadcast({
      fromPointerValue: fromValueWithStep,
      fromInPercents: newFromPointerPositionInPercentsWithStep,
      toPointerValue: toValueWithStep,
      toInPercents: newToPointerPositionInPercentsWithStep,
      });
}
 

  }




export { Model };

