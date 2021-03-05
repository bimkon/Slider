import { SliderOptions } from '../SliderOptions';
import { EventObserver } from '../EventObserver/EventObserver';

class Model {
  public options: SliderOptions;
  public observerOfValues: EventObserver = new EventObserver();

    
 
  constructor(options: SliderOptions) {
    this.options = options;

  }

  getSettings() {
    return { ...this.options };
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
//берем текущее положение ползунка в процентах, переводим в число, применяем шаг, передаем обратно в презентер и выводим в tipvalue .
//переводим value с шагом обратно в проценты и отдаем в презентер и вью.
  calculateValues(positionInPercents:number) {
    const newValue = this.calculatePercentsToValue(positionInPercents);
    const valueWithStep = this.calculateValueWithStep(newValue);
    const newPointerPositionInPercentsWithStep = this.calculateValueToPercents(valueWithStep);
    const {min, max} = this.getSettings();

    this.observerOfValues.broadcast({
      min: min, 
      max: max, 
      fromPointerValue: valueWithStep,
      fromInPercents: newPointerPositionInPercentsWithStep,
      });
}
 



}


export { Model };

