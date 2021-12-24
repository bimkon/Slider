import { SliderOptions } from '../types';
import EventObserver from '../event-observer/EventObserver';

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
    const isToSmallerFromAndRange = isRange
      && (newTo === null || newTo <= newFrom);
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
          if (newMin >= newMax - newStep) {
            this.options.min = min;
          } else if (newFrom < newMin) {
            this.options.from = newMin;
            this.options.min = newMin;
          } else {
            this.options.min = newMin;
          }
          break;
        case 'max':
          if (newMax <= newMin + newStep) {
            this.options.max = max;
          } else if (newTo > newMax) {
            this.options.to = newMax;
            this.options.max = newMax;
          } else {
            this.options.max = newMax;
          }
          break;
        case 'step':
          if (newStep <= 0 || newStep > newMax - newMin) {
            this.options.step = step;
          } else {
            this.options.step = newStep;
          }
          break;
        case 'from':
          if (isRange && newFrom >= newTo - newStep) {
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
          if (newTo <= newFrom + newStep) {
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

  private calculatePercentsToValue(positionInPercents: number): number {
    const { min, max } = this.getSettings();
    return ((max - min) * positionInPercents) / 100 + min;
  }

  private calculateValueWithStep(value: number): number {
    const { min, step } = this.getSettings();
    return Math.round((value - min) / step) * step + min;
  }

  private calculateValueToPercents(positionValue: number): number {
    const { min, max } = this.getSettings();
    return ((positionValue - min) * 100) / (max - min);
  }

  private calculateValues() {
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
}

export default Model;
