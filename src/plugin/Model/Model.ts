import { SliderOptions } from '../SliderOptions';
import { EventObserver } from '../EventObserver/EventObserver';

class Model {

  public ChangePointer: EventObserver = new EventObserver();

    
 
  constructor() {
    // this.dispatchMove();
  }

  initData(options:any): SliderOptions {
    return options
  }
// public dispatchMove() {
//   const func:any = null;
//   document.addEventListener('mousedown', () => {
//     this.ChangePointer.broadcast('data');
//   })

// }
}


export { Model };

