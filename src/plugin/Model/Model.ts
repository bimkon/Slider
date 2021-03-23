import { SliderOptions } from '../SliderOptions';
import { EventObserver } from '../EventObserver/EventObserver';
import defaultOptions from '../Model/defaultOptions';
import bind from 'bind-decorator';


class Model {
  public options: SliderOptions;
  public observerOfValues: EventObserver = new EventObserver();

    
 
  constructor(options: SliderOptions) {
    this.options = { ...defaultOptions };
    console.log(options)
    this.setSettings(options)



  }

  getSettings() {
    return { ...this.options };
  }
  setSettings(options: SliderOptions = {}) {
    Object.entries(options).forEach(([key, value]) => {
      this.options[key] = this.validateSliderOptions(key,value, options);
    });

    this.calculateValues();
  }



  private validateSliderOptions(
    key:string,
    value: SliderOptions[keyof SliderOptions],
    newOptions: SliderOptions = {}
  ) {

    const from = newOptions.from;
    const to = newOptions.to;
    const step = newOptions.step;
    const min = newOptions.min
    const max = newOptions.max

    const isStepInvalid = step <= 0 || step > max - min;
    const isFromBiggerTo = from >= to - step;

    const isToSmallerFrom = to <= from + step;
    const isMaxSmallerMin = max <= (min + step);
    const isMinBiggerMax = min >= (max - step);

    switch (key) {
      
      case 'hasTip':
      case 'hasLine':
      case 'isVertical':
      case 'isRange':
        return typeof value === 'boolean' ? value : null;
      case 'min':
        if (isMinBiggerMax) {
          console.log('MAX', 'min');
          return this.options.min;
        }
        return min;
      case 'max':
        if (isMaxSmallerMin) {
          console.log('MIN', 'max');
          return this.options.max;
        }
        return max;
      case 'step':
        if (isStepInvalid) {
         console.log('STEP', 'step');
          return this.options.step;
        }
        return step;
      case 'from':
        console.log(newOptions.to)
        if (isFromBiggerTo) return to - step > min ? to - step : min;
        if (from > max) return max;
        if (from < min) return min;
        return from;
      case 'to':
        if (isToSmallerFrom) return from + step < max ? from + step : max;
        if (to > max) return max;
        if (to < min) return min;
        return to;
      default: return null;
    }
  }




  
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

