import { SliderOptions } from '../SliderOptions';
import { EventObserver } from '../EventObserver/EventObserver';
import defaultOptions from './defaultOptions';
import { isBoolean, isNumber } from '../TypeGuards/TypeGuards';

interface ValueTypes{
  fromPointerValue: number;
  fromInPercents: number;
  toPointerValue: number;
  toInPercents: number;
}

interface OptionTypes{
  hasTip: boolean;
  isVertical: boolean;
  isRange: boolean;
}

class Model {
  public options: SliderOptions;

  public observerOfValues: EventObserver<ValueTypes> = new EventObserver<ValueTypes>();

  public optionsObserver: EventObserver<OptionTypes> = new EventObserver<OptionTypes>();

  constructor(options: SliderOptions) {
    this.options = { ...defaultOptions };
    this.setSettings(options);
  }

  getSettings() {
    return { ...this.options };
  }

  setSettings(options: SliderOptions = {}) {
    Object.entries(options).forEach(([key, value]) => {
      this.options[key] = this.validateSliderOptions(key, value, options);
    });
    this.calculateValues();
  }

  calculatePercentsToValue(positionInPercents: number): number {
    const { min, max } = this.getSettings();
    return ((max - min) * positionInPercents) / 100 + min;
  }

  calculateValueWithStep(value: number): number {
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

  calculateValues() {
    const { from, to } = this.getSettings();
    const fromValueInPercent = this.calculateValueToPercents(from);
    const fromValue = this.calculatePercentsToValue(fromValueInPercent);
    const fromValueWithStep = this.calculateValueWithStep(fromValue);
    const newFromPointerPositionInPercent = this.calculateValueToPercents(fromValueWithStep);
    const toValueInPercent = this.calculateValueToPercents(to);
    const toValue = this.calculatePercentsToValue(toValueInPercent);
    const toValueWithStep = this.calculateValueWithStep(toValue);
    const newToPointerPositionInPercent = this.calculateValueToPercents(toValueWithStep);
    const { hasTip, isVertical, isRange } = this.getSettings();
    this.optionsObserver.broadcast({ hasTip, isVertical, isRange });
    this.observerOfValues.broadcast({
      fromPointerValue: fromValueWithStep,
      fromInPercents: newFromPointerPositionInPercent,
      toPointerValue: toValueWithStep,
      toInPercents: newToPointerPositionInPercent,
    });
  }

  private validateSliderOptions(
    key:string,
    value: SliderOptions[keyof SliderOptions],
    newSettings: SliderOptions = {},
  ) {
    const validatedFrom = isNumber(newSettings.from);
    const validatedTo = isNumber(newSettings.to);
    const validatedStep = isNumber(newSettings.step);
    const validatedMin = isNumber(newSettings.min);
    const validatedMax = isNumber(newSettings.max);
    const validatedIsRange = isBoolean(newSettings.isRange);
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
        return isBoolean(value);
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
}

export { Model };

export default Model;
