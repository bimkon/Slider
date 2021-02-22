import { SliderOptions } from '../SliderOptions';
import { EventObserver } from '../EventObserver/EventObserver';

class Model {
  private options: SliderOptions;
  public observerOfValues: EventObserver = new EventObserver();

    
 
  constructor(options: SliderOptions) {
    this.changeValue();
  }

  getSettings() {
    return { ...this.options };
  }
  calculatePercentsToValue(positionInPercents: number): number {
    const { min, max } = this.getSettings();
    return ((max - min) * positionInPercents) / 100 + min;
  }
  public changeValue() {
    document.addEventListener('mousemove', () => {
    const from = 20;

    this.observerOfValues.broadcast(from);
    })

  }
}


export { Model };

