/* eslint-disable consistent-return */
import SliderOptions from '../SliderOptions';
import EventObserver from '../EventObserver/EventObserver';
import defaultOptions from './defaultOptions';
import { isBoolean, isNumber, isRightKeys } from '../typeguards/typeguards';

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
  public options: SliderOptions;

  constructor(options: SliderOptions) {
    super();
    this.options = { ...defaultOptions };
    this.setSettings(options);
  }

  getSettings() {
    return { ...this.options };
  }

  setSettings(options: SliderOptions) {
    Object.entries(options).forEach(([key, value]) => {
      if (isRightKeys(key)) {
        this.options[key] = this.validateSliderOptions(key, value, options);
      }
    });
    Object.keys(options).forEach((key) => {
      if (this.options.to === undefined || this.options.from === undefined) return;
      const isToSmallerFrom = this.options.isRange
        && (this.options.to === null || this.options.to <= this.options.from);
      switch (key) {
        case 'isRange':
          if (isToSmallerFrom) this.setSettings({ to: this.options.max });
          break;
        case 'min':
        case 'max':
        case 'step':
          this.setSettings({ from: this.options.from });
          this.setSettings({ to: this.options.to });
          this.setSettings({ numberOfStrokes: this.options.numberOfStrokes });
          break;
        case 'to':
          this.setSettings({ from: this.options.from });
          break;
        default:
      }
    });
    this.calculateValues();
  }

  calculatePercentsToValue(positionInPercents: number): number | undefined {
    const { min, max } = this.getSettings();
    if (max === undefined || min === undefined) return;
    return ((max - min) * positionInPercents) / 100 + min;
  }

  calculateValueWithStep(value: number): number | undefined {
    const { min, step } = this.getSettings();
    if (step === undefined || min === undefined) return;
    return Math.round((value - min) / step) * step + min;
  }

  calculateValueToPercents(positionValue: number): number | undefined {
    const { min, max } = this.getSettings();
    if (max === undefined || min === undefined) return;
    return ((positionValue - min) * 100) / (max - min);
  }

  applyValue(positionInPercents: number, pointerToMove: string) {
    const newValue: number | undefined = this.calculatePercentsToValue(
      positionInPercents,
    );
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
    if (from === undefined) return;
    const fromValueInPercent = this.calculateValueToPercents(from);
    if (fromValueInPercent === undefined) return;

    const fromValue = this.calculatePercentsToValue(fromValueInPercent);
    if (fromValue === undefined) return;
    const newFromPointerPositionInPercent = this.calculateValueToPercents(
      fromValue,
    );
    if (to === undefined) return;
    const toValueInPercent = this.calculateValueToPercents(to);
    if (toValueInPercent === undefined) return;
    const toValue = this.calculatePercentsToValue(toValueInPercent);
    if (toValue === undefined) return;
    const newToPointerPositionInPercent = this.calculateValueToPercents(
      toValue,
    );
    const { hasTip, isVertical, isRange } = this.getSettings();
    if (hasTip === undefined || isVertical === undefined) return;
    if (isRange === undefined) return;
    if (
      newFromPointerPositionInPercent === undefined
      || newToPointerPositionInPercent === undefined
    ) return;
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
    value: SliderOptions[keyof SliderOptions],
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
    const isRange = newSettings.isRange !== undefined ? newSettings.isRange : this.options.isRange;

    if (max === undefined || min === undefined) return;
    if (step === undefined || to === undefined) return;
    if (from === undefined) return;
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
