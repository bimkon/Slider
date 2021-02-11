import { Model } from '../Model/Model';
import { MainView } from '../View/MainView/MainView';
import { SliderOptions } from '../SliderOptions';

class Presenter {
  view: MainView;
  model: Model;

  constructor(view: MainView, model: Model, options: SliderOptions) {
    this.view = view
    this.model = model


 }
}
export { Presenter };