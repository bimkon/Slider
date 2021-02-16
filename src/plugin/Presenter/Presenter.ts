import { Model } from '../Model/Model';
import { MainView } from '../View/MainView/MainView';
import { SliderOptions } from '../SliderOptions';


class Presenter {
  bindMouseMoves:any;
  view: MainView;
  model: Model;
  thumbForTracking: any;
  data: Model;
  constructor(view: MainView, model: Model, options: SliderOptions) {
    this.view = view;
    this.model = model;
    this.view.sliderPath.bindMouseMoves();
    // this.addObservers();


 }
//  private addObservers() {
//   this.model.ChangePointer.subscribe(() => {
//     this.view.sliderPath.bindMouseMoves();
//   });
}
 


export { Presenter };