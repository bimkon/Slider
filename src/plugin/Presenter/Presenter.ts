import { Model } from '../Model/Model';
import { MainView } from '../View/MainView/MainView';
import { SliderOptions } from '../SliderOptions';
import { SliderPath } from '../View/SliderPath/SliderPath';

class Presenter {
  bindMouseMoves:any;
  view: MainView;
  model: Model;
  thumbForTracking: any;
  public refresh() {
    this.thumbForTracking = new SliderPath();
    this.thumbForTracking.thumb.thumbElement.addEventListener('mousedown', () => {
      this.thumbForTracking.observer.broadcast(this.bindMouseMoves);
    })
   }
  constructor(view: MainView, model: Model, options: SliderOptions) {
    this.view = view
    this.model = model
    
    


 }

}
export { Presenter };