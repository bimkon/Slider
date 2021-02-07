import { Model } from '../Model/Model';
import { View } from '../View/View';
import { SliderOptions } from '../SliderOptions';

class Presenter {
  view: View;
  model: Model;

  constructor(view: View, model: Model, options: SliderOptions) {
    this.view = view
    this.model = model

    let data = model.initData(options)
    view.setOptions(data)
    view.initProps()
    view.render(model.template)
    view.initComponents()
  }
}
// =========== EXPORT ===========
export { Presenter };