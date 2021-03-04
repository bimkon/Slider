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


  calculateValues(positionInPercents:number) {
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

