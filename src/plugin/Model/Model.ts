/* eslint-disable consistent-return */
import SliderOptions from '../SliderOptions';
import EventObserver from '../EventObserver/EventObserver';
import defaultOptions from './defaultOptions';

interface ValueTypes {
  fromPointerValue: number;
  fromInPercents: number;
  toPointerValue: number;
  toInPercents: number;
  hasTip: boolean;
  isVertical: boolean;
  isRange: boolean;
}

class Model extends EventObserver<ValueTypes> {
  public options: Required<SliderOptions>;

  constructor(options: Required<SliderOptions>) {
    super();
    this.options = { ...options };
    this.setSettings(options);
  }

  getSettings() {
    return { ...this.options };
  }

  setSettings(newOptions: SliderOptions) {
    const { min, max, step } = this.options;
    const newFrom = newOptions.from !== undefined
      ? this.calculateValueWithStep(newOptions.from)
      : this.options.from;

    const newTo = newOptions.to !== undefined
      ? this.calculateValueWithStep(newOptions.to)
      : this.options.to;
    const newStep = newOptions.step !== undefined ? newOptions.step : this.options.step;
    const newMin = newOptions.min !== undefined ? newOptions.min : this.options.min;
    const newMax = newOptions.max !== undefined ? newOptions.max : this.options.max;
    const isRange = newOptions.isRange !== undefined
      ? newOptions.isRange
      : this.options.isRange;
    const isStepInvalid = newStep <= 0 || newStep > newMax - newMin;
    const isFromBiggerTo = newFrom >= newTo - newStep;
    const isToSmallerFrom = newTo <= newFrom + newStep;
    const isMaxSmallerMin = newMax <= newMin + newStep;
    const isMinBiggerMax = newMin >= newMax - newStep;
    const isToSmallerFromAndRange = this.options.isRange
      && (this.options.to === null || this.options.to <= this.options.from);
    Object.keys(newOptions).forEach((key) => {
      switch (key) {
        case 'hasTip':
          if (newOptions.hasTip === undefined) return;
          this.options.hasTip = newOptions.hasTip;
          break;
        case 'isVertical':
          if (newOptions.isVertical === undefined) return;
          this.options.isVertical = newOptions.isVertical;
          break;
        case 'isRange':
          if (isToSmallerFromAndRange) this.options.to = this.options.max;
          if (newOptions.isRange === undefined) return;
          this.options.isRange = newOptions.isRange;
          break;
        case 'min':
          if (isMinBiggerMax) {
            this.options.min = min;
          } else if (newFrom < newMin) {
            this.options.from = newMin;
            this.options.min = newMin;
          } else {
            this.options.min = newMin;
          }
          break;
        case 'max':
          if (isMaxSmallerMin) {
            this.options.max = max;
          } else if (newTo > newMax) {
            this.options.to = newMax;
            this.options.max = newMax;
          } else {
            this.options.max = newMax;
          }
          break;
        case 'step':
          if (isStepInvalid) {
            this.options.step = step;
          } else {
            this.options.step = newStep;
          }
          break;
        case 'from':
          if (isRange && isFromBiggerTo) {
            this.options.from = newTo - newStep > newMin ? newTo - newStep : newMin;
          } else if (newFrom > newMax) {
            this.options.from = max;
          } else if (newFrom < newMin) {
            this.options.from = min;
          } else {
            this.options.from = newFrom;
          }
          break;
        case 'to':
          if (isToSmallerFrom) {
            this.options.to = newFrom + newStep < newMax ? newFrom + newStep : newMax;
          } else if (newTo > newMax) {
            this.options.to = max;
          } else if (newTo < newMin) {
            this.options.to = min;
          } else {
            this.options.to = newTo;
          }
          break;
        default:
      }
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
    const newFromPointerPositionInPercent = this.calculateValueToPercents(
      fromValue,
    );
    const toValueInPercent = this.calculateValueToPercents(to);
    const toValue = this.calculatePercentsToValue(toValueInPercent);
    const newToPointerPositionInPercent = this.calculateValueToPercents(
      toValue,
    );
    const { hasTip, isVertical, isRange } = this.getSettings();
    this.broadcast({
      hasTip,
      isVertical,
      isRange,
      fromPointerValue: fromValue,
      fromInPercents: newFromPointerPositionInPercent,
      toPointerValue: toValue,
      toInPercents: newToPointerPositionInPercent,
    });
  }

  private validateSliderOptions(
    key: string,
    value: Required<SliderOptions>[keyof Required<SliderOptions>],
    newSettings: SliderOptions = {},
  ) {
    const from = newSettings.from !== undefined
      ? this.calculateValueWithStep(newSettings.from)
      : this.options.from;
    const to = newSettings.to !== undefined
      ? this.calculateValueWithStep(newSettings.to)
      : this.options.to;
    const step = newSettings.step !== undefined ? newSettings.step : this.options.step;
    const min = newSettings.min !== undefined ? newSettings.min : this.options.min;
    const max = newSettings.max !== undefined ? newSettings.max : this.options.max;
    const numberOfStrokes = newSettings.numberOfStrokes !== undefined
      ? newSettings.numberOfStrokes
      : this.options.numberOfStrokes;
    const isRange = newSettings.isRange !== undefined
      ? newSettings.isRange
      : this.options.isRange;
    const isStepInvalid = step <= 0 || step > max - min;
    const isFromBiggerTo = from! >= to - step;
    const isToSmallerFrom = to <= from + step;
    const isMaxSmallerMin = max <= min + step;
    const isMinBiggerMax = min >= max - step;

    switch (key) {
      case 'hasTip':
      case 'hasLine':
      case 'isVertical':
      case 'isRange':
        return value;
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
      case 'numberOfStrokes':
        return numberOfStrokes;
      case 'to':
        if (isToSmallerFrom) return from + step < max ? from + step : max;
        if (to > max) return max;
        if (to < min) return min;
        return to;
      default:
        return null;
    }
  }
}

export default Model;
