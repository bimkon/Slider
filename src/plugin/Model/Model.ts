import { SliderOptions } from '../SliderOptions';
import { EventObserver } from '../EventObserver/EventObserver';
import defaultOptions from '../Model/defaultOptions';
import bind from 'bind-decorator';


class Model {
  public options: SliderOptions;
  public observerOfValues: EventObserver = new EventObserver();
  public optionsObserver: EventObserver = new EventObserver();

    
 
  constructor(options: SliderOptions) {
    this.options = { ...defaultOptions };
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



  private validateNumber(value: SliderOptions[keyof SliderOptions]): number | null {
    const parsedValue = parseFloat(`${value}`);
    const isValueNaN = Number.isNaN(parsedValue);
    return !isValueNaN ? parsedValue : null;
  }

  private validateBoolean(value: SliderOptions[keyof SliderOptions]): boolean | null {
    return typeof value === 'boolean' ? value : null;
  }

  private validateSliderOptions(
    key:string,
    value: SliderOptions[keyof SliderOptions],
    newSettings: SliderOptions = {}
  ) {
    const validatedFrom = this.validateNumber(newSettings.from);
    const validatedTo = this.validateNumber(newSettings.to);
    const validatedStep = this.validateNumber(newSettings.step);
    const validatedMin = this.validateNumber(newSettings.min);
    const validatedMax = this.validateNumber(newSettings.max);
    const validatedIsRange = this.validateBoolean(newSettings.isRange);
    const from = validatedFrom !== null ? this.calculateValueWithStep(validatedFrom)
      : this.options.from;
    const to = validatedTo !== null ? this.calculateValueWithStep(validatedTo) : this.options.to;
    const step = validatedStep !== null ? validatedStep : this.options.step;
    const min = validatedMin !== null ? validatedMin : this.options.min;
    const max = validatedMax !== null ? validatedMax : this.options.max;
    const isRange = validatedIsRange !== null ? validatedIsRange : this.options.isRange;

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
        return this.validateBoolean(value);
      case 'min':
        if (isMinBiggerMax) {
          return this.options.min;
        }
        return min;
      case 'max':
        if (isMaxSmallerMin) {

          return this.options.max;
        }
        return max;
      case 'step':
        if (isStepInvalid) {

          return this.options.step;
        }
        return step;
      case 'from':

        if (isRange && isFromBiggerTo) return to - step > min ? to - step : min;
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
    this.optionsObserver.broadcast({})
    this.observerOfValues.broadcast({
      fromPointerValue: fromValueWithStep,
      fromInPercents: newFromPointerPositionInPercentsWithStep,
      toPointerValue: toValueWithStep,
      toInPercents: newToPointerPositionInPercentsWithStep,
      });
}
 

  }




export { Model };

