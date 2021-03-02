import { SliderOptions } from '../SliderOptions';
import { EventObserver } from '../EventObserver/EventObserver';

class Model {
  private options: SliderOptions;
  public observerOfValues: EventObserver = new EventObserver();

    
 
  constructor(options: SliderOptions) {
    

  }

  getSettings() {
    return { ...this.options };
  }

  calculatePercentsToValue(positionInPercents: number): number {
    const { min, max } = this.getSettings();
    return ((max - min) * positionInPercents) / 100 + min;
  }

  
  calculateValues(positionInPercents:number) {
    this.calculateValues = this.calculateValues.bind(this);
    const newValue = this.calculatePercentsToValue(positionInPercents);
    const newPointerPositionInPercents = positionInPercents;
    const {min, max} = this.getSettings();

    this.observerOfValues.broadcast({
      min: min, 
      max: max, 
      fromPointerValue: newValue,
      fromInPercents: newPointerPositionInPercents,
      });

}






}


export { Model };

